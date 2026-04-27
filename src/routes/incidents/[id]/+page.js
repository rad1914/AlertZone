// @path: src/routes/incidents/[id]/+page.js
import { error } from '@sveltejs/kit';
import { API_BASE } from '$lib/data';
export async function load({ params, fetch }) {
  const res = await fetch(`${API_BASE}/incident/${params.id}`, {
    credentials: 'include'
  });
  if (res.status === 404) {
    throw error(404, 'Incidente no encontrado');
  }
  if (!res.ok) {
    throw error(res.status, 'Error al cargar incidente');
  }
  const incident = await res.json();
  return { incident };
}
