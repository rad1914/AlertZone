// @path: src/routes/login/+page.server.js
import { redirect } from '@sveltejs/kit'

export async function load({ fetch }) {
  const check = await fetch('http://192.168.100.10:3001/api/check', {
    credentials: 'include'
  })

  if (check.ok) {
    throw redirect(302, '/dashboard')
  }

  return {}
}
