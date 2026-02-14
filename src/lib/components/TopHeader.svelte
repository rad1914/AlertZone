<!-- @path: src/lib/components/TopHeader.svelte -->
<script>
  import { onMount } from "svelte";

  let operator = "";
  let state = "";

  onMount(async () => {
    try {
      const res = await fetch("http://192.168.100.10:3001/api/dashboard", {
        credentials: "include"
      });

      if (!res.ok) {
        console.error("Unauthorized or server error");
        return;
      }

      const data = await res.json();
      operator = data.operator;
      state = data.state;
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    }
  });
</script>

<header class="top-header">
  <div class="header-left">
    <span class="brand">Zone</span>
    <span class="divider"></span>
    <span class="header-label blue-text">WAR ROOM</span>
    <span class="header-label">
      OPERADOR:
      <span class="white-text">{operator}</span>
    </span>
    <span class="header-label">
      ESTADO:
      <span class="red-text bold">{state}</span>
    </span>
  </div>

  <div class="header-right">
    <button class="btn-secondary">⚙️</button>
    <button class="btn-secondary notification">
      🔔<span class="badge"></span>
    </button>
    <div class="avatar"></div>
  </div>
</header>