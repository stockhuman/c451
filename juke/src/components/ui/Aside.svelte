<script lang="ts">
  export let open: boolean
  export let side: 'A' | 'B' = 'A'

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<aside class={open ? 'open' : ''}>
  <div class="container">
    <span
      class="xmark"
      role="button"
      tabindex="0"
      on:click={() => {
        dispatch('close')
      }}
      on:keydown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          dispatch('close')
        }
      }}></span>
    <h2>side {side}</h2>
    <div>
      <slot />
    </div>
  </div>
  <div class="blur"></div>
</aside>

<style>
  aside {
    height: 100vh;
    width: 50vw;
    transform: translateX(-100%);
    transition: transform 0.5s ease-in-out;
    display: flex;
    position: fixed;
    top: 0;
  }
  .open {
    transform: translateX(0);
  }
  .container {
    height: 100vh;
    width: calc(100% - 4rem);
    background-color: #d9d9d9;
  }
  .blur {
    width: 4rem;
    backdrop-filter: blur(40px);
    background-color: #d9d9d91f;
  }
  h2 {
    font-size: 2rem;
    margin: 0;
    padding: 1rem;
    background-color: #9b9b9b;
    color: #fff;
    text-align: right;
    text-transform: uppercase;
    font-family: 'IBM Plex Mono', monospace;
  }
  .container > div {
    padding: 1rem;
    margin-top: 3rem;
  }
  .xmark {
    position: absolute;
    top: 1.3rem;
    left: 1rem;
    width: 2rem;
    height: 2rem;
    border: 4px solid var(--border-color);
    border-radius: 50%;
    cursor: pointer;
  }
  .xmark::before,
  .xmark::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 4px;
    background-color: var(--border-color);
    transform: translate(-50%, -50%) rotate(45deg);
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #000000;
    }
    h2 {
      background-color: rgb(7, 23, 47);
    }
  }
</style>
