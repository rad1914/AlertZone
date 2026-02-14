// @path: src/routes/+page.js
export async function load({ fetch }) {
  const [rtRes, sRes] = await Promise.all([
    fetch('http://192.168.100.10:3001/api/realtime'),
    fetch('http://192.168.100.10:3001/api/sensors')
  ]);
  if (!rtRes.ok || !sRes.ok) {
    return { realTime: [], sensors: [] };
  }
  return {
    realTime: await rtRes.json(),
    sensors: await sRes.json()
  };
}