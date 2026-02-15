<script>
  import { onMount } from 'svelte';

  let submits = [];
  let error = '';
  let selected = null;

  async function load() {
    try {
      const res = await fetch('/api/submits', {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Failed');

      submits = await res.json();
    } catch (e) {
      error = 'Error loading submits';
      console.error(e);
    }
  }

  function openCard(s) {
    selected = s;
  }

  function closeCard() {
    selected = null;
  }

  async function approve() {
    if (!selected) return;

    try {
      await fetch(`/api/submits/${selected.id}/approve`, {
        method: 'POST',
        credentials: 'include'
      });

      selected = null;
      load();
    } catch (e) {
      console.error(e);
    }
  }

  onMount(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  });
</script>

<div class="panel">
  <div class="panel-header">
    <h2>SUBMITS</h2>
  </div>

  {#if error}
    <p>{error}</p>
  {:else if submits.length === 0}
    <p>No submits</p>
  {:else}
    <div class="data-list">
      {#each submits as s}
        <div class="data-item" on:click={() => openCard(s)}>
          <div class="item-content">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

{#if selected}
  <div class="modal-backdrop" on:click={closeCard}>
    <div class="modal" on:click|stopPropagation>
      <h3>{selected.title}</h3>
      <p>{selected.desc}</p>
      <p>{new Date(selected.createdAt).toLocaleString()}</p>

      {#if selected.lat && selected.lng}
        <p>{selected.lat}, {selected.lng}</p>
      {/if}

      <div class="actions">
        <button on:click={approve}>Approve</button>
        <button on:click={closeCard}>Close</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .data-item {
    cursor: pointer;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
  }

  .actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
  }
</style>