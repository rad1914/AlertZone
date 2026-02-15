<script>
import { onMount } from 'svelte'
import { getCurrentIncident } from '$lib/data'

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