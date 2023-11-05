<script>
  import { getSTL } from '../../functions/export'
  import { scene } from '../../functions/store'
</script>

{#if $scene}
  <a class="bouton" href={getSTL($scene)} download="disc.stl">Download</a>
{/if}

<style>
  a {
    position: absolute;
    bottom: 0;
  }
</style>
