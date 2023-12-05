<script lang="ts">
  import { onMount } from 'svelte'
  import { disc, type Disc } from '../../functions/store'
  export let hidden = true

  $: lib = [] as Disc[]

  onMount(() => {
    fetch('https://juke.michaelhemingway.com/discs')
      .then(res => res.json())
      .then(data => {
        lib = data.map((d: { data: any }) => d.data)
      })
  })
</script>

<article class={hidden ? '' : 'downshift'}>
  <span>Library</span>
  <div class="container">
    {#if lib.length > 0}
      {#each lib as d}
        <div
          class="item"
          role="button"
          tabindex="0"
          on:click={() => disc.set(d)}
          on:keydown={e => {
            if (e.key === 'Enter') disc.set(d)
          }}>
          <svg
            width="150"
            height="150"
            viewBox="0 0 522 522"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="logo-svg">
            <style>
              circle {
                stroke: black;
              }
              @media (prefers-color-scheme: dark) {
                circle {
                  stroke: white;
                }
              }
            </style>
            <g transform="rotate(-15 239.63 239.63)">
              <circle cx="260.843" cy="260.843" r="118" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="128" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="138" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="148" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="158" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="168" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="178" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="188" stroke="black" stroke-width="4" />
              <circle cx="260.843" cy="260.843" r="198" stroke="black" stroke-width="4" />
            </g>
          </svg>
          <p>{d.meta.title}</p>
          <p>By {d.meta.author}</p>
        </div>
      {/each}
    {/if}
  </div>
</article>

<style>
  article {
    position: fixed;
    background-color: #010191;
    width: 100%;
    height: 300px;
    transform: translateY(-300px);
    transition: ease-in-out 0.4s transform;
    box-sizing: border-box;
  }

  .downshift {
    transform: translateY(0px);
  }

  .container {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    overflow-x: scroll;
  }

  .item {
    height: 200px;
    width: 200px;
    border: 1px solid white;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
  }

  p {
    background-color: bisque;
  }

  span {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: white;
    font-weight: bold;
    /* font-family: 'IBM Plex Mono', monospace; */
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  @media (prefers-color-scheme: dark) {
    article {
      background-color: #0000aa;
    }
    p {
      background-color: #000;
    }
  }
</style>
