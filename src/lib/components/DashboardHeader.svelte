<!-- @path: src/lib/components/DashboardHeader.svelte -->
<script>
  export let title = `"War Room" Dashboard`;
  export let leftBtn = "Gopoal Maidientis";
  export let rightBtn = "Mes bnub to rmidados";
</script>
<div class="dashboard-header">
  <h1>{title}</h1>
  <div class="header-actions">
    <button class="btn-outline">{leftBtn}</button>
    <button class="btn-primary">{rightBtn}</button>
  </div>
</div>
