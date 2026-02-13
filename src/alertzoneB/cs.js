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
    ext === '.sh'
  ) return 'code';
  if (ext === '.xml') return 'xml';
  if (ext === '.html') return 'html';
  return null;
}

function buildExactPathCommentRegex(commentLine) {
  const escaped = commentLine
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/-->$/, '-->\\s*$');
  return new RegExp(`^\\s*${escaped}`, 'm');
}

async function processFile(filePath) {
  const absPath = resolve(filePath);
  const relPath = toPosixPath(relative(cwd, absPath));
  const ext = extname(filePath);
  const fileType = getFileType(ext);
  if (!fileType) return;

  let content;
  try {
    content = await fs.readFile(absPath, 'utf8');
  } catch (err) {
    console.error(`Failed to read: ${relPath}`, err);
    return;
  }

  let commentLine;
  if (fileType === 'xml' || fileType === 'html') {
    commentLine = `<!-- @path: ${relPath} -->\n`;
  } else if (ext === '.sh') {
    commentLine = `# @path: ${relPath}\n`;
  } else {
    commentLine = `// @path: ${relPath}\n`;
  }

  const pathCommentRegex = buildExactPathCommentRegex(commentLine);
  const header = content.slice(0, 500);

  if (!pathCommentRegex.test(header)) {
    if ((fileType === 'xml' || fileType === 'html') && content.startsWith('<?xml')) {
      const endDecl = content.indexOf('?>');
      if (endDecl !== -1) {
        const before = content.slice(0, endDecl + 2);
        const after = content.slice(endDecl + 2).replace(/^\r?\n/, '');
        content = `${before}\n${commentLine}${after}`;
      } else {
        content = `${commentLine}${content}`;
      }
    } else {
      content = `${commentLine}${content}`;
    }
    console.log(`Prepended @path to: ${relPath}`);
  } else {
    console.log(`Skipping (already has @path): ${relPath}`);
  }

  if (fileType === 'code') {
    content = content
      .replace(/\/\*[\s\S]*?\*\//g, m => m.includes('@path:') ? m : '')
      .replace(/^\s*\/\/.*$/gm, line => line.includes('@path:') ? line : '')
      .replace(/^\s*#.*$/gm, line => line.includes('@path:') ? line : '')
      .replace(/([^:"'\n])\/\/(?!.*@path:).*$/gm, (_, p) => p.trimEnd())
      .replace(/\[cite\s*:\s*\d+(?:\s*,\s*\d+)*\]/g, '')
      .replace(/\[cite(?:_start|_end)?\]/g, '')
      .replace(/\[span_\d+\]\((?:start|end)_span\)/g, '')
      .replace(/^\s*$/gm, '');
  } else if (fileType === 'xml' || fileType === 'html') {
    content = content
      .replace(/<!--[\s\S]*?-->/g, m => m.includes('@path:') ? m : '');
  }

  if (content.includes('[span_')) {
    console.warn(`⚠️ Unremoved spans in ${relPath}`);
  }

  content = content.replace(/\n{3,}/g, '\n\n');

  if (!content.endsWith('\n')) content += '\n';

  try {
    await fs.writeFile(absPath, content, 'utf8');
    console.log(`Cleaned: ${relPath}`);
  } catch (err) {
    console.error(`Failed to write: ${relPath}`, err);
  }
}

async function main() {
  const exts = new Set([
    '.js','.jsx','.cjs','.mjs','.kt','.kts','.gradle','.xml','.html','.sh'
  ]);

  const entries = [];

  async function walk(dir) {
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const d of list) {
      if (d.name === 'node_modules') continue;
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

  await Promise.allSettled(entries.map(processFile));

  console.log('All done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});