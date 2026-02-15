// @path: src/lib/data.js
const API_BASE = '/api';

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
