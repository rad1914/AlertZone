<script>
  import { onMount } from 'svelte';

  let incident = {
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

      if (!res.ok) {
        loading = false;
        return;
      }

      incident = await res.json();
    } finally {
      loading = false;
    }
  });

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

<section
  class="panel incident-panel"
  class:red={activeLight === 'red'}
  class:yellow={activeLight === 'yellow'}
  class:green={activeLight === 'green'}
>
  <h2 class="panel-title center">NUEVA INCIDENCIA</h2>

  {#if loading}
    <p>Cargando incidencia...</p>
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

      <button class="btn-action" disabled={!incident.active}>
        Detalles
      </button>
    </div>
  {/if}
</section>