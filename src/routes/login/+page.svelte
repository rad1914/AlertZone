<script>
  import { goto } from '$app/navigation'
  import { login, checkSession } from '$lib/data'
  import { onMount } from 'svelte'

  let username = ''
  let password = ''
  let error = ''

  let cooldown = false
  const COOLDOWN_MS = 1500

  onMount(async () => {
    try {
      await checkSession()
      goto('/')
    } catch {}
  })

  async function handleLogin() {
    if (cooldown) return

    error = ''

    if (!username || !password) {
      error = 'Completa todos los campos para continuar'
      return
    }

    cooldown = true
    setTimeout(() => cooldown = false, COOLDOWN_MS)

    try {
      await login(username, password)
      goto('/')
    } catch (e) {
      error = e.message === 'Unauthorized'
        ? 'Credenciales inválidas. Intenta de nuevo.'
        : 'Invalid Login.'
    }
  }
</script>

<div class="app-container login-wrapper">
  <div class="panel login-card">
    <h1 class="dashboard-header brand-header">
      <span class="brand">Zone</span>
    </h1>

    <p class="subtitle">Control total en tiempo real</p>

    <input
      type="text"
      class="form-input"
      placeholder="Usuario"
      bind:value={username}
    />

    <input
      type="password"
      class="form-input"
      placeholder="Contraseña"
      bind:value={password}
    />

    {#if error}
      <div class="red-text error">{error}</div>
    {/if}

    <button
      class="btn-primary"
      on:click={handleLogin}
      disabled={cooldown}
    >
      {cooldown ? 'Cargando...' : 'Ingresar'}
    </button>
  </div>
</div>


<style>
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle at top, #14161a 0%, #0d0f12 60%);
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 42px;
    gap: 10px;
    background-color: #14161a;
    border: 1px solid #1f2329;
    border-radius: 32px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
  }

  .brand-header {
    justify-content: center;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }

  .subtitle {
    text-align: center;
    font-size: 13px;
    color: #9ba3af;
    margin-bottom: 20px;
  }

  .form-input {
    background-color: #1a1c23;
    border: 1px solid #2a2f38;
    color: #fff;
    padding: 13px 16px;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s ease;
    font-family: 'Metropolis', sans-serif;
  }

  .form-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  .error {
    font-size: 13px;
    text-align: center;
    animation: shake 0.3s ease;
  }

  .btn-primary {
    width: 100%;
    padding: 13px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    50% { transform: translateX(4px); }
    75% { transform: translateX(-4px); }
    100% { transform: translateX(0); }
  }
</style>