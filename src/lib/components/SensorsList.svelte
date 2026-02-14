<!-- @path: src/lib/components/SensorsList.svelte -->
<script>
  export let items = [];
</script>
<section class="panel list-panel sensors">
  <div class="panel-header">
    <h2>Sensors</h2>
  </div>
  <div class="sensor-list">
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
