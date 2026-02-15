<!-- @path: src/routes/incidents/IncidentPanel.svelte -->
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import TrafficLight from './TrafficLight.svelte';
  let incident = {
    id: null,
    title: "",
    desc: "",
    priority: 0,
    active: false,
    recursosDesplegados: "",
    llegadaEstimada: ""
  };
  let loading = true;
  onMount(async () => {
    try {
      const res = await fetch('http://192.168.100.10:3001/api/incident', {
        credentials: 'include'
      });
      if (res.ok) {
        incident = await res.json();
      }
    } finally {
      loading = false;
    }
  });
  function goToDetails() {
    if (!incident.active || !incident.id) return;
    goto(`/incidents/${incident.id}`);
  }
  $: gravedad =
    incident.priority >= 3
      ? "Alta"
      : incident.priority === 2
      ? "Media"
      : incident.priority === 1
      ? "Baja"
      : "Sin prioridad";
  $: activeLight =
    !incident.active
      ? ""
      : gravedad === "Alta"
      ? "red"
      : gravedad === "Media"
      ? "yellow"
      : gravedad === "Baja"
      ? "green"
      : "";
  $: recursos = incident.recursosDesplegados || "No especificado";
  $: llegada = incident.llegadaEstimada || "No disponible";
</script>
<section class="panel">
  <h2>NUEVA INCIDENCIA</h2>
  {#if loading}
    <p>Cargando...</p>
  {:else}
    <TrafficLight {activeLight} />
    <h3>{incident.title}</h3>
    <p>{incident.desc}</p>
    <p><strong>Gravedad:</strong> {gravedad}</p>
    <p><strong>Recursos:</strong> {recursos}</p>
    <p><strong>Llegada:</strong> {llegada}</p>
    <button
      on:click={goToDetails}
      disabled={!incident.active || !incident.id}
    >
      Detalles
    </button>
  {/if}
</section>
<style>
  .panel {
    padding: 1.5rem;
    border: 1px solid #333;
    border-radius: 12px;
  }
</style>
