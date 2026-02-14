// @path: src/routes/+page.js
export async function load({ fetch }) {
  const res = await fetch('http://192.168.100.10:3001/api/dashboard');

  if (!res.ok) {
    return { dashboard: null };
  }

  return { dashboard: await res.json() };
}