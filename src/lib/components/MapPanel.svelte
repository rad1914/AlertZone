<!-- @path: src/lib/components/MapPanel.svelte -->
<script></script>
<section class="panel map-panel">
  <div class="panel-header">
    <h2>LIVE MAP</h2>
    <span class="dots">•••</span>
  </div>
  <div class="map-container">
    <div class="map-controls-top">
      <div class="zoom-controls">
        <button>+</button>
        <button>-</button>
      </div>
      <div class="map-filter">
        <span class="red-dot"></span> Fuego Activo <span class="chevron">▼</span>
      </div>
    </div>
    <div class="radar-pulse">
      <div class="ring"></div>
      <div class="ring delay-1"></div>
      <div class="ring delay-2"></div>
      <div class="core"></div>
    </div>
    <div class="map-markers">
      <div class="marker m1">🚒</div>
      <div class="marker m2">🚒</div>
      <div class="marker m3">🚒</div>
    </div>
    <div class="map-footer">
      <span class="mapbox-logo">© mapbox</span>
      <div class="map-credits">Top diaco df ECOCE Sqous | Toue ois Lécs</div>
    </div>
  </div>
</section>
