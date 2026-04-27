<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopHeader from '$lib/components/TopHeader.svelte';
  import DashboardHeader from '$lib/components/DashboardHeader.svelte';
  import IncidentPanel from '$lib/components/IncidentPanel.svelte';
  import MapPanel from '$lib/components/MapPanel.svelte';
  import RealTimeList from '$lib/components/Alerts.svelte';
  import SensorsList from '$lib/components/Sensors.svelte';
  import '$lib/styles/app.css';
  export let data;
</script>
<div class="app-container">
  <Sidebar />
  <main class="main-content">
    {#if data?.dashboard}
      <TopHeader
        operator={data.dashboard.operator}
        state={data.dashboard.state}
      />
    {:else}
      <p>Loading...</p>
    {/if}
    <DashboardHeader />
    <div class="dashboard-grid">
      <IncidentPanel />
      <MapPanel />
      <div class="right-column">
        <RealTimeList items={data.dashboard.realTime} />
        <SensorsList items={data.dashboard.sensors} />
      </div>
    </div>
  </main>
</div><!-- @path: src/routes/incidents/+page.svelte -->
<script>
  import '$lib/styles/app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopHeader from '$lib/components/TopHeader.svelte';
  import TrafficLight from './TrafficLight.svelte';
  import { getCurrentIncident } from '$lib/data';
  let incident = null;
  let loading = true;
  onMount(async () => {
    try {
      incident = await getCurrentIncident();
    } catch {
      incident = {
        id: null,
        title: "Error",
        desc: "No se pudo obtener la alerta.",
        priority: 0,
        active: false,
        recursosDesplegados: "",
        llegadaEstimada: ""
      };
    } finally {
      loading = false;
    }
  });
  function goToDetails() {
    if (!incident?.active || !incident?.id) return;
    goto(`/incidents/${incident.id}`);
  }
  $: gravedad =
    !incident
      ? ""
      : incident.priority >= 3
      ? "Alta"
      : incident.priority === 2
      ? "Media"
      : incident.priority === 1
      ? "Baja"
      : "Sin prioridad";
  $: activeLight =
    !incident?.active
      ? ""
      : gravedad === "Alta"
      ? "red"
      : gravedad === "Media"
      ? "yellow"
      : gravedad === "Baja"
      ? "green"
      : "";
  $: recursos = incident?.recursosDesplegados || "No especificado";
  $: llegada = incident?.llegadaEstimada || "No disponible";
</script>
<div class="app-container">
  <Sidebar />
  <div class="main-content">
    <TopHeader />
    <div class="dashboard-grid">
      <section class="panel incident-panel {activeLight}">
        <div class="panel-header">
          <h2>NUEVA INCIDENCIA</h2>
          <span class="dots">•••</span>
        </div>
        {#if loading}
          <p class="panel-title center">Cargando...</p>
        {:else if incident}
          <h2 class="panel-title center">ALERTA RECIBIDA</h2>
          <div class="traffic-light-container">
            <TrafficLight {activeLight} />
          </div>
          <div class="incident-details">
            <h3>{incident.title}</h3>
            <p class="subtitle">{incident.desc}</p>
            <div class="stats-list">
              <div class="stat-row">
                <span>Gravedad:</span>
                <span class="bold {activeLight === 'red' ? 'red-text' : activeLight === 'yellow' ? 'orange-text' : ''}">{gravedad}</span>
              </div>
              <div class="stat-row">
                <span>Recursos:</span>
                <span class="bold white-text">{recursos}</span>
              </div>
              <div class="stat-row">
                <span>Llegada:</span>
                <span class="bold white-text">{llegada}</span>
              </div>
            </div>
            <button
              class="btn-action"
              on:click={goToDetails}
              disabled={!incident.active || !incident.id}
            >
              Detalles
            </button>
          </div>
        {/if}
      </section>
    </div>
  </div>
</div>
<!-- @path: src/routes/incidents/TrafficLight.svelte -->
<script>
  export let activeLight = "";
</script>
<div class="traffic">
  <div class="light red" class:active={activeLight === 'red'}></div>
  <div class="light yellow" class:active={activeLight === 'yellow'}></div>
  <div class="light green" class:active={activeLight === 'green'}></div>
</div>
<style>
  .traffic {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
  }
  .light {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    opacity: 0.2;
  }
  .red { background: red; }
  .yellow { background: yellow; }
  .green { background: green; }
  .active {
    opacity: 1;
  }
</style>
<!-- @path: src/routes/incidents/[id]/+page.svelte -->
<script>
  export let data;
  const incident = data?.incident;
  $: gravedad =
    incident?.priority >= 3
      ? "Alta"
      : incident?.priority === 2
      ? "Media"
      : incident?.priority === 1
      ? "Baja"
      : "Sin prioridad";
</script>
{#if incident}
  <section class="panel">
    <h2>DETALLE DE INCIDENCIA</h2>
    <h3>{incident.title}</h3>
    <p>{incident.desc}</p>
    <p><strong>Gravedad:</strong> {gravedad}</p>
    <p><strong>Recursos:</strong> {incident.recursosDesplegados || "No especificado"}</p>
    <p><strong>Llegada:</strong> {incident.llegadaEstimada || "No disponible"}</p>
  </section>
{:else}
  <p>Incidente no encontrado.</p>
{/if}
<!-- @path: src/routes/submits/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  let submits = [];
  let error = '';
  let selected = null;
  async function load() {
    try {
      const res = await fetch('/api/submits', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed');
      submits = await res.json();
    } catch (e) {
      error = 'Error loading submits';
      console.error(e);
    }
  }
  function openCard(s) {
    selected = s;
  }
  function closeCard() {
    selected = null;
  }
  async function approve() {
    if (!selected) return;
    try {
      await fetch(`/api/submits/${selected.id}/approve`, {
        method: 'POST',
        credentials: 'include'
      });
      selected = null;
      load();
    } catch (e) {
      console.error(e);
    }
  }
  onMount(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  });
</script>
<div class="panel">
  <div class="panel-header">
    <h2>SUBMITS</h2>
  </div>
  {#if error}
    <p>{error}</p>
  {:else if submits.length === 0}
    <p>No submits</p>
  {:else}
    <div class="data-list">
      {#each submits as s}
        <div class="data-item" on:click={() => openCard(s)}>
          <div class="item-content">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
{#if selected}
  <div class="modal-backdrop" on:click={closeCard}>
    <div class="modal" on:click|stopPropagation>
      <h3>{selected.title}</h3>
      <p>{selected.desc}</p>
      <p>{new Date(selected.createdAt).toLocaleString()}</p>
      {#if selected.lat && selected.lng}
        <p>{selected.lat}, {selected.lng}</p>
      {/if}
      <div class="actions">
        <button on:click={approve}>Approve</button>
        <button on:click={closeCard}>Close</button>
      </div>
    </div>
  </div>
{/if}
<style>
  .data-item {
    cursor: pointer;
  }
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
  }
  .actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
  }
</style>
<script>
  import { goto } from '$app/navigation'
  import { login, checkSession } from '$lib/data'
  import { onMount } from 'svelte'
  let username = ''
  let password = ''
  let error = ''
  let cooldown = false
  const COOLDOWN_MS = 1500
  onMount(async () => {
    try {
      await checkSession()
      goto('/')
    } catch {}
  })
  async function handleLogin() {
    if (cooldown) return
    error = ''
    if (!username || !password) {
      error = 'Completa todos los campos para continuar'
      return
    }
    cooldown = true
    setTimeout(() => cooldown = false, COOLDOWN_MS)
    try {
      await login(username, password)
      goto('/')
    } catch (e) {
      error = e.message === 'Unauthorized'
        ? 'Credenciales inválidas. Intenta de nuevo.'
        : 'Invalid Login.'
    }
  }
</script>
<div class="app-container login-wrapper">
  <div class="panel login-card">
    <h1 class="dashboard-header brand-header">
      <span class="brand">Zone</span>
    </h1>
    <p class="subtitle">Control total en tiempo real</p>
    <input
      type="text"
      class="form-input"
      placeholder="Usuario"
      bind:value={username}
    />
    <input
      type="password"
      class="form-input"
      placeholder="Contraseña"
      bind:value={password}
    />
    {#if error}
      <div class="red-text error">{error}</div>
    {/if}
    <button
      class="btn-primary"
      on:click={handleLogin}
      disabled={cooldown}
    >
      {cooldown ? 'Cargando...' : 'Ingresar'}
    </button>
  </div>
</div>
<style>
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle at top, #14161a 0%, #0d0f12 60%);
  }
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 42px;
    gap: 10px;
    background-color: #14161a;
    border: 1px solid #1f2329;
    border-radius: 32px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
  }
  .brand-header {
    justify-content: center;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }
  .subtitle {
    text-align: center;
    font-size: 13px;
    color: #9ba3af;
    margin-bottom: 20px;
  }
  .form-input {
    background-color: #1a1c23;
    border: 1px solid #2a2f38;
    color: #fff;
    padding: 13px 16px;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s ease;
    font-family: 'Metropolis', sans-serif;
  }
  .form-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
  .error {
    font-size: 13px;
    text-align: center;
    animation: shake 0.3s ease;
  }
  .btn-primary {
    width: 100%;
    padding: 13px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    50% { transform: translateX(4px); }
    75% { transform: translateX(-4px); }
    100% { transform: translateX(0); }
  }
</style><!-- @path: src/lib/components/Alerts.svelte -->
<script>
  export let items = [];
</script>
<section class="panel list-panel realtime" style="height: 450px; max-height: 450px; overflow: hidden;">
  <div class="panel-header">
    <h2>ALERTAS</h2>
    <span class="dots">•••</span>
  </div>
  <div class="data-list" style="flex: 1; overflow-y: auto;">
    {#each items as item}
      <div class="data-item {item.active ? 'active' : ''}">
        <div class="item-icon {item.active ? 'red-text' : 'orange-text'}">{item.icon}</div>
        <div class="item-content">
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>
        <div class="item-arrow">›</div>
      </div>
    {/each}
  </div>
</section>
<!-- @path: src/lib/components/MapPanel.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getRealtime } from '$lib/data';
  import 'leaflet/dist/leaflet.css';
  let map;
  let L;
  let markers = [];
  function zoomIn() {
    map?.zoomIn();
  }
  function zoomOut() {
    map?.zoomOut();
  }
  async function loadAlerts() {
    const data = await getRealtime();
    markers.forEach(m => m.remove());
    markers = [];
    data.forEach((alert, index) => {
      if (alert.lat == null || alert.lng == null) return;
      const offset = 0.00015 * index;
      const pulseIcon = L.divIcon({
        className: '',
        html: `
          <div class="radar-pulse">
            <div class="core"></div>
            <div class="ring"></div>
            <div class="ring delay-1"></div>
            <div class="ring delay-2"></div>
          </div>
        `,
        iconSize: [200, 200],
        iconAnchor: [100, 100]
      });
      const marker = L.marker(
        [alert.lat + offset, alert.lng + offset],
        { icon: pulseIcon }
      )
        .addTo(map)
        .bindPopup(`
          <strong>${alert.title}</strong><br/>
          ${alert.desc || ''}<br/>
          Prioridad: ${alert.priority}<br/>
          ${alert.recursosDesplegados || ''}
        `);
      markers.push(marker);
    });
  }
  onMount(async () => {
    L = await import('leaflet');
    map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView([19.7047, -103.4617], 13);
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    ).addTo(map);
    await loadAlerts();
    setInterval(loadAlerts, 5000);
  });
</script>
<section class="panel map-panel">
  <div class="panel-header">
    <h2>LIVE MAP</h2>
    <span class="dots">•••</span>
  </div>
  <div class="map-container">
    <div id="map" class="real-map"></div>
    <div class="map-controls-top">
      <div class="zoom-controls">
        <button on:click={zoomIn}>+</button>
        <button on:click={zoomOut}>-</button>
      </div>
      <div class="map-filter">
        <span class="red-dot"></span>
        Fuego Activo
        <span class="chevron">▼</span>
      </div>
    </div>
    <div class="map-footer">
      <span class="mapbox-logo">© CartoDB</span>
      <div class="map-credits">OpenStreetMap contributors</div>
    </div>
  </div>
</section>
<style>
  .real-map {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .red-dot {
    width: 8px;
    height: 8px;
    background-color: #ef4444;
    border-radius: 50%;
    box-shadow: 0 0 5px #ef4444;
  }
  .map-footer {
    position: absolute;
    bottom: 10px;
    left: 15px;
    right: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #888;
    z-index: 10;
  }
</style>
<!-- @path: src/lib/components/IncidentPanel.svelte -->
<script>
import { onMount } from 'svelte'
import { getCurrentIncident } from '$lib/data'
import { goto } from '$app/navigation'
let incident = null
let loading = true
onMount(async () => {
  try {
    incident = await getCurrentIncident()
  } catch {
    incident = null
  }
  loading = false
})
$: prioridad = incident?.priority ?? 0
$: gravedad =
  prioridad >= 4 ? "Crítica" :
  prioridad === 3 ? "Alta" :
  prioridad === 2 ? "Media" :
  prioridad === 1 ? "Baja" :
  "Sin prioridad"
$: activeLight =
  incident?.active
    ? prioridad >= 3 ? "red"
    : prioridad === 2 ? "yellow"
    : prioridad === 1 ? "green"
    : ""
    : ""
$: recursos = incident?.recursosDesplegados ?? "No especificado"
$: llegada = incident?.llegadaEstimada ?? "No disponible"
</script>
<section
  class="panel incident-panel"
  class:red={activeLight === 'red'}
  class:yellow={activeLight === 'yellow'}
  class:green={activeLight === 'green'}
>
  <h2 class="panel-title center">NUEVA INCIDENCIA</h2>
  {#if loading}
    <p>Cargando incidencia...</p>
  {:else if !incident || !incident.id}
    <p>No hay incidencias activas.</p>
  {:else}
    <div class="traffic-light-container">
      <div class="traffic-light">
        <div class="light red" class:active={activeLight === 'red'}></div>
        <div class="light yellow" class:active={activeLight === 'yellow'}></div>
        <div class="light green" class:active={activeLight === 'green'}></div>
      </div>
    </div>
    <div class="incident-details">
      <h3>{incident.title}</h3>
      <p class="subtitle">{incident.desc}</p>
      <div class="stats-list">
        <div class="stat-row">
          <span class="stat-label">Gravedad:</span>
          <span class="stat-value">{gravedad}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Recursos desplegados:</span>
          <span class="stat-value">{recursos}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Llegada estimada:</span>
          <span class="stat-value">{llegada}</span>
        </div>
      </div>
      <button
        class="btn-action"
        disabled={!incident.active || !incident.id}
        on:click={() => goto(`/incidents/${incident.id}`)}
      >
        Detalles
      </button>
    </div>
  {/if}
</section>
<!-- @path: src/lib/components/Sensors.svelte -->
<script>
  export let items = [];
</script>
<section class="panel list-panel sensors" style="height: 180; max-height: 180px; overflow: hidden;">
  <div class="panel-header">
    <h2>SENSORES</h2>
  </div>
  <div class="sensor-list" style="flex: 1; overflow-y: auto;">
    {#each items as sensor}
      <div class="sensor-item">
        <div class="sensor-left">
          <span class="dot {sensor.status}"></span>
          <span class="sensor-name">{sensor.name}</span>
        </div>
        <div class="sensor-value">{sensor.value}</div>
      </div>
    {/each}
  </div>
</section>
<!-- @path: src/lib/components/Sidebar.svelte -->
<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { logout as apiLogout } from '$lib/data';
  $: current = $page.url.pathname;
  async function logout() {
    try {
      await apiLogout();
      await goto('/login');
    } catch (e) {
      console.error(e);
    }
  }
  function goHome() {
    goto('/');
  }
  function incidents() {
    goto('/incidents');
  }
  function submits() {
    goto('/submits');
  }
</script>
<aside class="sidebar">
  <div class="logo-icon" on:click={goHome}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#ff4747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  </div>
  <nav class="nav-icons">
<div class="nav-item active">
  <span class="icon" on:click={goHome}>
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  </span>
</div>
<div class="nav-item">
  <span class="icon" on:click={incidents}>
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  </span>
</div>
    <div class="nav-item">
      <span class="icon" on:click={submits}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"></path>
        </svg>
      </span>
    </div>
    <div class="nav-item">
      <span class="icon">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      </span>
    </div>
    <div class="nav-item">
      <span class="icon">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </span>
    </div>
  </nav>
  <div class="nav-bottom">
    <div class="nav-item" on:click={logout}>
      <span class="icon">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="
9" y2="12"></line>
        </svg>
      </span>
    </div>
  </div>
</aside>
<!-- @path: src/lib/components/DashboardHeader.svelte -->
<script>
  export let title = `Tablero Principal`;
  export let leftBtn = "Gopoal Maidientis";
  export let rightBtn = "ACTUALIZAR";
  function refreshPage() {
    window.location.reload();
  }
</script>
<div class="dashboard-header">
  <h1>{title}</h1>
  <div class="header-actions">
    <button class="btn-outline">{leftBtn}</button>
    <button class="btn-primary" on:click={refreshPage}>
      {rightBtn}
    </button>
  </div>
</div>
<!-- @path: src/lib/components/TopHeader.svelte -->
<script>
  import { onMount } from "svelte";
  import { getDashboard } from "$lib/data";
  let operator = "";
  let state = "";
  let realTime = [];
  let sensors = [];
  onMount(async () => {
    try {
      const data = await getDashboard();
      operator = data.operator;
      state = data.state;
      realTime = data.realTime;
      sensors = data.sensors;
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    }
  });
</script>
<header class="top-header">
  <div class="header-left">
    <span class="brand">Zone</span>
    <span class="divider"></span>
    <span class="header-label blue-text">WAR ROOM</span>
    <span class="header-label">
      OPERADOR:
      <span class="white-text">{operator}</span>
    </span>
    <span class="header-label">
      ESTADO:
      <span class="red-text bold">{state}</span>
    </span>
  </div>
  <div class="header-right">
    <button class="btn-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-settings">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>
    <button class="btn-secondary notification">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-bell">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      <span class="badge"></span>
    </button>
    <div class="avatar"></div>
  </div>
</header>
