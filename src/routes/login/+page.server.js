// @path: src/routes/login/+page.server.js
import { redirect } from '@sveltejs/kit'
import { API_BASE } from '$lib/data'
export async function load({ fetch, request }) {
  const check = await fetch(`${API_BASE}/check`, {
    credentials: 'include',
    headers: {
      cookie: request.headers.get('cookie') ?? ''
    }
  })
  if (check.ok) {
    throw redirect(302, '/')
  }
  return {}
}
