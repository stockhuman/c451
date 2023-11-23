<script>
  import Logo from './Logo.svelte'
</script>

<header>
  <Logo />
  <h1>JUKE</h1>
</header>

<style>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    position: absolute;
    top: 0;
  }
  h1 {
    font-size: 3rem;
    margin-left: 1rem;
  }
</style>
