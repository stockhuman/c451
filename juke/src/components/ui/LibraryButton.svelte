<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  function openLibrary() {
    dispatch('openLibrary')
  }
</script>

<button id="library-button" class="library-button" on:click={openLibrary} />

<style>
  .library-button {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #286bb5;
    border: none;
    color: white;
    cursor: pointer;
  }
  .library-button:hover {
    background-color: #1f5a9b;
  }
</style>
