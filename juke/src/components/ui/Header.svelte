<script>
  import Logo from './Logo.svelte'
</script>

<header>
  <a href="/" class="logo">
    <Logo />
  </a>

  <h1>JUKE</h1>
</header>

<style>
  .logo {
    height: 70px;
    width: 70px;
    text-align: center;
  }
  header {
    width: 70px;
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    align-items: center;
  }
  h1 {
    text-align: center;
    font-size: 1.6rem;
    margin: 0;
    color: #286bb5;
  }
</style>
