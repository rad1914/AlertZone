<!-- @path: src/lib/components/TopHeader.svelte -->
<script>
  export let operator = "J. PÉREZ";
  export let state = "ALERTA MÁXIMA";
</script>
<header class="top-header">
  <div class="header-left">
    <span class="brand">AlertZone</span>
    <span class="divider"></span>
    <span class="header-label blue-text">WAR ROOM</span>
    <span class="header-label">OPERADOR: <span class="white-text">{operator}</span></span>
    <span class="header-label">ESTADO: <span class="red-text bold">{state}</span></span>
  </div>
  <div class="header-right">
    <button class="btn-secondary">⚙️</button>
    <button class="btn-secondary notification">🔔<span class="badge"></span></button>
    <div class="avatar"></div>
  </div>
</header>
