// @path: src/routes/+page.js
import { redirect } from '@sveltejs/kit';
import { API_BASE } from '$lib/data';

export async function load({ fetch, request }) {
  try {
    const res = await fetch(`${API_BASE}/dashboard`, {
      headers: {
        cookie: request.headers.get('cookie') || ''
      },
      credentials: 'include'
    });

    if (!res.ok) {
      throw redirect(302, '/login');
    }

    const dashboard = await res.json();

    return { dashboard };

  } catch {
    throw redirect(302, '/login');
  }
}
