<!-- @path: src/routes/incidents/+page.svelte -->
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
