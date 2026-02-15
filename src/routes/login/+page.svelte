<script>
  import { goto } from '$app/navigation'
  import { login, checkSession } from '$lib/data'
  import { onMount } from 'svelte'

  let username = ''
  let password = ''
  let error = ''

  onMount(async () => {
    try {
      await checkSession()
      goto('/')
    } catch {}
  })

  async function handleLogin() {
    error = ''
    if (!username || !password) {
      error = 'Completa todos los campos para continuar'
      return
    }
    try {
      await login(username, password)
      goto('/')
    } catch (e) {
      error = e.message === 'Unauthorized'
        ? 'Credenciales inválidas. Intenta de nuevo.'
        : 'Error de conexión con el servidor.'
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
    <button class="btn-primary" on:click={handleLogin}>
      Entrar al Centro de Control
    </button>
  </div>
</div>
<style>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle at top, #111827 0%, #0d0f12 60%);
}
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 42px;
    gap: 20px;
    backdrop-filter: blur(6px);
    background-color: rgba(20, 22, 28, 0.9);
    border: 1px solid rgba(59, 130, 246, 0.2);
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.08);
  }
  .brand-header {
    justify-content: center;
    letter-spacing: 1px;
  }
  .subtitle {
    text-align: center;
    font-size: 13px;
    opacity: 0.7;
    margin-bottom: 10px;
  }
  .form-input {
    background-color: #1a1c23;
    border: 1px solid #2a2f38;
    color: #fff;
    padding: 13px 16px;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s ease;
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
    border-radius: 10px;
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
