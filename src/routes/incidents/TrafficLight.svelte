<script>
  export let activeLight = "";
</script>

<div class="traffic">
  <div class="light red" class:active={activeLight === 'red'}></div>
  <div class="light yellow" class:active={activeLight === 'yellow'}></div>
  <div class="light green" class:active={activeLight === 'green'}></div>
</div>

<style>
  .traffic {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
  }

  .light {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    opacity: 0.2;
  }

  .red { background: red; }
  .yellow { background: yellow; }
  .green { background: green; }

  .active {
    opacity: 1;
  }
</style>