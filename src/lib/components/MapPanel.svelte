<!-- @path: src/lib/components/MapPanel.svelte -->
<script>
  import { onMount } from 'svelte';
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
  const res = await fetch('http://192.168.100.10:3001/api/realtime');
  const data = await res.json();
  markers.forEach(m => m.remove());
  markers = [];
  data.forEach(alert => {
    if (!alert.lat || !alert.lng) return;
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
    const marker = L.marker([alert.lat, alert.lng], {
      icon: pulseIcon
    })
      .addTo(map)
      .bindPopup(`
        <strong>${alert.title}</strong><br/>
        Prioridad: ${alert.priority}
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
  .map-panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .map-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    background-color: #1c2128;
  }
  .real-map {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .map-controls-top {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    display: flex;
    justify-content: space-between;
    z-index: 10;
  }
  .zoom-controls {
    display: flex;
    flex-direction: column;
    background-color: rgba(20, 22, 26, 0.9);
    border-radius: 6px;
    border: 1px solid #2a2f38;
    overflow: hidden;
  }
  .zoom-controls button {
    background: none;
    border: none;
    color: #fff;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 16px;
  }
  .zoom-controls button:first-child {
    border-bottom: 1px solid #2a2f38;
  }
  .map-filter {
    background-color: rgba(20, 22, 26, 0.9);
    border: 1px solid #2a2f38;
    padding: 6px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #fff;
    cursor: pointer;
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
