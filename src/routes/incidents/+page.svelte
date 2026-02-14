<script>
  import '$lib/styles/app.css';

  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopHeader from '$lib/components/TopHeader.svelte';
  import IncidentPanel from './IncidentPanel.svelte';
</script>

<div class="layout">
  <Sidebar />

  <div class="main">
    <TopHeader />

    <div class="content">
      <IncidentPanel />
    </div>
  </div>
</div>

<style>
  .layout {
    display: flex;
    min-height: 100vh;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding: 1.5rem;
    flex: 1;
  }
</style>
