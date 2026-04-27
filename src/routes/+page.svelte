<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopHeader from '$lib/components/TopHeader.svelte';
  import DashboardHeader from '$lib/components/DashboardHeader.svelte';
  import IncidentPanel from '$lib/components/IncidentPanel.svelte';
  import MapPanel from '$lib/components/MapPanel.svelte';
  import RealTimeList from '$lib/components/Alerts.svelte';
  import SensorsList from '$lib/components/Sensors.svelte';
  import '$lib/styles/app.css';
  export let data;
</script>
<div class="app-container">
  <Sidebar />
  <main class="main-content">
    {#if data?.dashboard}
      <TopHeader
        operator={data.dashboard.operator}
        state={data.dashboard.state}
      />
    {:else}
      <p>Loading...</p>
    {/if}
    <DashboardHeader />
    <div class="dashboard-grid">
      <IncidentPanel />
      <MapPanel />
      <div class="right-column">
        <RealTimeList items={data.dashboard.realTime} />
        <SensorsList items={data.dashboard.sensors} />
      </div>
    </div>
  </main>
</div>