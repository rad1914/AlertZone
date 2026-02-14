<!-- @path: src/lib/components/IncidentPanel.svelte -->
<script>
  import { onMount } from 'svelte';

  let incidentTitle = "";
  let subtitle = "";
  let gravedad = "";
  let recursos = "";
  let eta = "";

  onMount(async () => {
    const res = await fetch('http://192.168.100.10:3001/api/incident');
    if (!res.ok) return;

    const data = await res.json();

    incidentTitle = data.incidentTitle;
    subtitle = data.subtitle;
    gravedad = data.gravedad;
    recursos = data.recursos;
    eta = data.eta;
  });

  $: activeLight =
    gravedad === "Alta"
      ? "red"
      : gravedad === "Media"
      ? "yellow"
      : gravedad
      ? "green"
      : "";
</script>

<section class="panel incident-panel">
  <h2 class="panel-title center">NUEVA INCIDENCIA</h2>

  <div class="traffic-light-container">
    <div class="traffic-light">
      <div class="light red" class:active={activeLight === 'red'}></div>
      <div class="light yellow" class:active={activeLight === 'yellow'}></div>
      <div class="light green" class:active={activeLight === 'green'}></div>
    </div>
  </div>

  <div class="incident-details">
    <h3>{incidentTitle}</h3>
    <p class="subtitle">{subtitle}</p>

    <div class="stats-list">
      <div class="stat-row">
        <span class="stat-label">Gravedad:</span>
        <span class="stat-value red-text">{gravedad}</span>
      </div>

      <div class="stat-row">
        <span class="stat-label">Recursos Desplegados:</span>
        <span class="stat-value white-text">{recursos}</span>
      </div>

      <div class="stat-row">
        <span class="stat-label">Tiempo Estimado de Llegada:</span>
        <span class="stat-value white-text">{eta}</span>
      </div>
    </div>

    <button class="btn-action-red">Noeve incidenois</button>
  </div>
</section>