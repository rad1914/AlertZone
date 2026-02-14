<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopHeader from '$lib/components/TopHeader.svelte';
  import DashboardHeader from '$lib/components/DashboardHeader.svelte';
  import IncidentPanel from '$lib/components/IncidentPanel.svelte';
  import MapPanel from '$lib/components/MapPanel.svelte';
  import RealTimeList from '$lib/components/RealTimeList.svelte';
  import SensorsList from '$lib/components/SensorsList.svelte';
  import { realTimeData, sensors } from '$lib/data.js';
  import '$lib/styles/app.css';

  let realTime = realTimeData;
  let sensorsList = sensors;
</script>

<div class="app-container">
  <Sidebar />

  <main class="main-content">
    <TopHeader operator="J. PÉREZ" state="ALERTA MÁXIMA" />
    <DashboardHeader />

    <div class="dashboard-grid">
      <IncidentPanel />
      <MapPanel />
      <div class="right-column">
        <RealTimeList items={realTime} />
        <SensorsList items={sensorsList} />
      </div>
    </div>
  </main>
</div>