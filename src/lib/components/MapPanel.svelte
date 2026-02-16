<!-- @path: src/lib/components/MapPanel.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getRealtime } from '$lib/data';
  import 'leaflet/dist/leaflet.css';
  let map;
  let L;
  let markers = [];
  function zoomIn() {
    map?.zoomIn();
  }
  function zoomOut() {
    map?.zoomOut();
  }
  async function loadAlerts() {
    const data = await getRealtime();
    markers.forEach(m => m.remove());
    markers = [];
    data.forEach((alert, index) => {
      if (alert.lat == null || alert.lng == null) return;
      const offset = 0.00015 * index;
      const pulseIcon = L.divIcon({
        className: '',
        html: `
          <div class="radar-pulse">
            <div class="core"></div>
            <div class="ring"></div>
            <div class="ring delay-1"></div>
            <div class="ring delay-2"></div>
          </div>
        `,
        iconSize: [200, 200],
        iconAnchor: [100, 100]
      });
      const marker = L.marker(
        [alert.lat + offset, alert.lng + offset],
        { icon: pulseIcon }
      )
        .addTo(map)
        .bindPopup(`
          <strong>${alert.title}</strong><br/>
          ${alert.desc || ''}<br/>
          Prioridad: ${alert.priority}<br/>
          ${alert.recursosDesplegados || ''}
        `);
      markers.push(marker);
    });
  }
  onMount(async () => {
    L = await import('leaflet');
    map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView([19.7047, -103.4617], 13);
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    ).addTo(map);
    await loadAlerts();
    setInterval(loadAlerts, 5000);
  });
</script>
<section class="panel map-panel">
  <div class="panel-header">
    <h2>LIVE MAP</h2>
    <span class="dots">•••</span>
  </div>
  <div class="map-container">
    <div id="map" class="real-map"></div>
    <div class="map-controls-top">
      <div class="zoom-controls">
        <button on:click={zoomIn}>+</button>
        <button on:click={zoomOut}>-</button>
      </div>
      <div class="map-filter">
        <span class="red-dot"></span>
        Fuego Activo
        <span class="chevron">▼</span>
      </div>
    </div>
    <div class="map-footer">
      <span class="mapbox-logo">© CartoDB</span>
      <div class="map-credits">OpenStreetMap contributors</div>
    </div>
  </div>
</section>
<style>
  .real-map {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .red-dot {
    width: 8px;
    height: 8px;
    background-color: #ef4444;
    border-radius: 50%;
    box-shadow: 0 0 5px #ef4444;
  }
  .map-footer {
    position: absolute;
    bottom: 10px;
    left: 15px;
    right: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #888;
    z-index: 10;
  }
</style>
