<!-- @path: src/lib/components/Sidebar.svelte -->
<script>
  import { goto } from '$app/navigation';

  async function logout() {
    const res = await fetch('http://192.168.100.10:3001/api/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) {
      await goto('/login');
    }
  }
</script>

<aside class="sidebar">
  <div class="logo-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="#ff4747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  </div>

  <nav class="nav-icons">
    <div class="nav-item"><span class="icon">📷</span></div>
    <div class="nav-item active"><span class="icon">🎛️</span></div>
    <div class="nav-item"><span class="icon">🌲</span></div>
    <div class="nav-item"><span class="icon">🏢</span></div>
    <div class="nav-item"><span class="icon">🛠️</span></div>
    <div class="nav-item"><span class="icon">⚙️</span></div>
  </nav>

  <div class="nav-bottom">
    <div class="nav-item" on:click={logout}>
      <span class="icon">🚪</span>
    </div>
  </div>
</aside>