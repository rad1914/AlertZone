// @path: src/routes/+page.js
import { redirect } from '@sveltejs/kit';
import { API_BASE } from '$lib/data';
export async function load({ fetch, request }) {
  try {
    const res = await fetch(`${API_BASE}/dashboard`, {
    credentials: 'include',
      headers: {
        cookie: request.headers.get('cookie') ?? ''
      }
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
// @path: src/lib/data.js
import { browser } from '$app/environment';
export const API_BASE = browser ? '/api' : 'http://localhost:3001/api';
async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    ...options
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${res.status}`);
  }
  return res.json();
}
export const login = (username, password) =>
  apiFetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
export const logout = () =>
  apiFetch('/logout', { method: 'POST' });
export const checkSession = () =>
  apiFetch('/check');
export const getDashboard = () =>
  apiFetch('/dashboard');
export const getRealtime = () =>
  apiFetch('/realtime');
export const getSensors = () =>
  apiFetch('/sensors');
export const getCurrentIncident = () =>
  apiFetch('/incident');
export const getIncidentById = (id) =>
  apiFetch(`/incident/${id}`);
export const createSubmit = (data) =>
  apiFetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
export const getSubmits = () =>
  apiFetch('/submits');
// @path: src/lib/index.js
// @path: src/lib/page.js
