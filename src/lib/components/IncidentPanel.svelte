<script>
  import { onMount } from 'svelte';

  let incidentTitle = "";
  let subtitle = "";
  let gravedad = "";
  let recursos = "";
  let llegada = "";

  onMount(async () => {
    const res = await fetch('http://192.168.100.10:3001/api/incident', {
      credentials: 'include'
    });
    if (!res.ok) return;

    const data = await res.json();

    incidentTitle = data.title;
    subtitle = data.desc;
    recursos = data.recursosDesplegados || "";
    llegada = data.llegadaEstimada || "";

    if (data.priority >= 3) gravedad = "Alta";
    else if (data.priority === 2) gravedad = "Media";
    else gravedad = "Baja";
  });

  $: normalizedGravedad = gravedad
    ? gravedad.charAt(0).toUpperCase() + gravedad.slice(1).toLowerCase()
    : "";

  $: activeLight =
    normalizedGravedad === "Alta"
      ? "red"
      : normalizedGravedad === "Media"
      ? "yellow"
      : normalizedGravedad === "Baja"
      ? "green"
      : "";
</script>

<section
  class="panel incident-panel"
  class:red={activeLight === 'red'}
  class:yellow={activeLight === 'yellow'}
  class:green={activeLight === 'green'}
>
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
        <span class="stat-value">{normalizedGravedad}</span>
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

   <button class="btn-action">Detalles</button>
  </div>
</section>