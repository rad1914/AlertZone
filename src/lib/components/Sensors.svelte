<!-- @path: src/lib/components/SensorsList.svelte -->
<script>
  export let items = [];
</script>

<section class="panel list-panel sensors" style="height: 180; max-height: 180px; overflow: hidden;">
  <div class="panel-header">
    <h2>SENSORES</h2>
  </div>

  <div class="sensor-list" style="flex: 1; overflow-y: auto;">
    {#each items as sensor}
      <div class="sensor-item">
        <div class="sensor-left">
          <span class="dot {sensor.status}"></span>
          <span class="sensor-name">{sensor.name}</span>
        </div>
        <div class="sensor-value">{sensor.value}</div>
      </div>
    {/each}
  </div>
</section>
