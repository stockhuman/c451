<script lang="ts">
  import { disc } from '../../functions/store'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let ds: any = null
  disc.subscribe(s => {
    if (!s) return
    ds = s.a || s.b
  })

  function showModal() {
    dispatch('modal')
  }
</script>

{#if ds}
  <span on:click={showModal} on:keydown={showModal} role="button" tabindex="0">Upload Disc</span>
{/if}

<style>
  span {
    background-color: #000;
    color: #fff;
    padding: 2rem;
    font-size: large;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.1rem;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
  span:hover {
    background-color: #00f;
  }
</style>
