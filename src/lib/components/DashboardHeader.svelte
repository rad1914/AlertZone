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
