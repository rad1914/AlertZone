<!-- @path: src/lib/components/RealTimeList.svelte -->
<script>
  export let items = [];
</script>
<section class="panel list-panel realtime">
  <div class="panel-header">
    <h2>REAL TIME DATA</h2>
    <span class="dots">•••</span>
  </div>
  <div class="data-list">
    {#each items as item}
      <div class="data-item {item.active ? 'active' : ''}">
        <div class="item-icon {item.active ? 'red-text' : 'orange-text'}">{item.icon}</div>
        <div class="item-content">
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>
        <div class="item-arrow">›</div>
      </div>
    {/each}
  </div>
</section>
