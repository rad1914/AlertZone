export async function GET({ params }) {
  const res = await fetch(
    `http://192.168.100.10:3001/api/incident/${params.id}`
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });
}