// @path: src/routes/login/+page.server.js
import { redirect } from '@sveltejs/kit'
import { API_BASE } from '$lib/data'

export async function load({ fetch, request }) {
  const check = await fetch(`${API_BASE}/check`, {
    headers: {
      cookie: request.headers.get('cookie') || ''
    },
    credentials: 'include'
  })

  if (check.ok) {
    throw redirect(302, '/')
  }

  return {}
}
