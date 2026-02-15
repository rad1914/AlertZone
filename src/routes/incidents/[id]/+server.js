// @path: src/routes/incidents/[id]/+server.js
import { API_BASE } from '$lib/data';

export async function GET({ params }) {
  const res = await fetch(
    `${API_BASE}/incident/${params.id}`
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
