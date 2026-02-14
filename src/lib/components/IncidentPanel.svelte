<script>
  export let incidentTitle = "Fuego Activo";
  export let subtitle = "Volcán de Colima";
  export let gravedad = "Alta";
  export let recursos = "3 Unidades";
  export let eta = "5 min";
</script>

<section class="panel incident-panel">
  <h2 class="panel-title center">NUEVA INCIDENCIA</h2>

  <div class="traffic-light-container">
    <div class="traffic-light">
      <div class="light red active"></div>
      <div class="light yellow"></div>
      <div class="light green"></div>
    </div>
  </div>

  <div class="incident-details">
    <h3>{incidentTitle}</h3>
    <p class="subtitle">{subtitle}</p>

    <div class="stats-list">
      <div class="stat-row">
        <span class="stat-label">Gravedad:</span>
        <span class="stat-value red-text">{gravedad}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Recursos Desplegados:</span>
        <span class="stat-value white-text">{recursos}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Tiempo Estimado de Llegada:</span>
        <span class="stat-value white-text">{eta}</span>
      </div>
    </div>

    <button class="btn-action-red">Noeve incidenois</button>
  </div>
</section>