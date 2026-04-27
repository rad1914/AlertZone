import { promises as fs } from "fs";
import { resolve, relative, extname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const cwd = process.cwd();
const scriptRelPath = relative(cwd, __filename).replace(/\\/g, '/');

function toPosixPath(path) {
  return path.replace(/\\/g, '/');
}

function getFileType(ext) {
  ext = ext.toLowerCase();
  if (
    ext === '.js' ||
    ext === '.jsx' ||
    ext === '.cjs' ||
    ext === '.mjs' ||
    ext === '.kt' ||
    ext === '.kts' ||
    ext === '.gradle' ||
    ext === '.sh' ||
    ext === '.cpp' ||
    ext === '.cc' ||
    ext === '.cxx' ||
    ext === '.hpp' ||
    ext === '.hh' ||
    ext === '.hxx' ||
    ext === '.h' ||
    ext === '.py'
  ) return 'code';
  if (ext === '.xml') return 'xml';
  if (ext === '.html') return 'html';
  if (ext === '.properties') return 'properties';
  return null;
}

function extractExistingPath(content) {
  const match = content.match(/@path:\s*(.+)/);
  return match ? match[1].trim() : null;
}

function getPathComment(relPath, fileType, ext) {
  if (fileType === 'xml' || fileType === 'html') {
    return ``;
  }
  if (ext === '.sh' || ext === '.py' || fileType === 'properties') {
    return `# @path: ${relPath}`;
  }
  return `// @path: ${relPath}`;
}

function removeExistingPathComments(content) {
  let shebang = '';
  if (content.startsWith('#!')) {
    const i = content.indexOf('\n');
    if (i !== -1) {
      shebang = content.slice(0, i);
      content = content.slice(i + 1);
    } else {
      return content;
    }
  }

  content = content.replace(/^\s*(\/\/|#).*\n?/gm, '');
  content = content.replace(/\s+#.*$/gm, '');
  content = content.replace(/\n{2,}/g, '\n');

  if (shebang) {
    content = shebang + '\n' + content.replace(/^\n+/, '');
  }

  return content;
}

function insertPathComment(content, commentLine, fileType, ext) {
  if (fileType === 'xml' || fileType === 'html') {
    if (content.startsWith('<?xml')) {
      const endDecl = content.indexOf('?>');
      if (endDecl !== -1) {
        const before = content.slice(0, endDecl + 2);
        const after = content.slice(endDecl + 2).replace(/^\r?\n/, '');
        return `${before}\n${commentLine}\n${after}`;
      }
    }
    return `${commentLine}\n${content}`;
  }

  if ((ext === '.sh' || ext === '.py') && content.startsWith('#!')) {
    const firstNewline = content.indexOf('\n');
    if (firstNewline !== -1) {
      const shebang = content.slice(0, firstNewline);
      const rest = content.slice(firstNewline + 1).replace(/^\r?\n/, '');
      return `${shebang}\n${commentLine}\n${rest}`;
    }
  }

  return `${commentLine}\n${content}`;
}

async function writeAtomic(absPath, content) {
  const tmpPath = `${absPath}.tmp`;
  await fs.writeFile(tmpPath, content, 'utf8');
  await fs.rename(tmpPath, absPath);
}

async function processFile(filePath) {
  const absPath = resolve(filePath);
  const relPath = toPosixPath(relative(cwd, absPath));
  const ext = extname(filePath);
  const fileType = getFileType(ext);
  if (!fileType) return;

  try {
    let content = await fs.readFile(absPath, 'utf8');
    const commentLine = getPathComment(relPath, fileType, ext);

    const firstLines = content.split('\n').slice(0, 20).join('\n');
    const existingPath = extractExistingPath(firstLines);

    content = removeExistingPathComments(content);
    content = insertPathComment(content, commentLine, fileType, ext);
    console.log(existingPath !== relPath ? `Updated @path: ${relPath}` : `Cleaned (path unchanged): ${relPath}`);

    content = content.replace(/\n{3,}/g, '\n\n');
    if (!content.endsWith('\n')) content += '\n';

    await writeAtomic(absPath, content);
    console.log(`Written: ${relPath}`);
  } catch (err) {
    console.error(`Failed to process: ${relPath}`, err);
    return;
  }
}

async function main() {
  const exts = new Set([
    '.js','.jsx','.cjs','.mjs',
    '.kt','.kts','.gradle',
    '.xml','.html','.sh',
    '.cpp','.cc','.cxx',
    '.hpp','.hh','.hxx','.h',
    '.properties',
    '.py'
  ]);

  const entries = [];

  async function walk(dir) {
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const d of list) {
      if (d.name === 'node_modules' || d.name === '.venv' || d.name === '.git' || d.name === '.gradle' || d.name === 'gradle') continue;
      const full = resolve(dir, d.name);
      if (d.isDirectory()) {
        await walk(full);
      } else if (exts.has(extname(d.name))) {
        const rel = toPosixPath(relative(cwd, full));
        if (rel !== scriptRelPath) entries.push(rel);
      }
    }
  }

  await walk(cwd);
  
  if (!entries.length) {
    console.warn('No files found');
    return;
  }

  for (const file of entries) {
    await processFile(file);
  }
  console.log('All done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});