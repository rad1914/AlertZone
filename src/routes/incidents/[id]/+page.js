import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const res = await fetch(`/api/incident/${params.id}`);

  if (!res.ok) {
    throw error(404, 'Incident not found');
  }

  const incident = await res.json();

  return { incident };
}