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
