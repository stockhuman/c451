<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Disc } from '../../functions/store'
  import {disc} from '../../functions/store'
  const dispatch = createEventDispatcher()
  export let open = false

  let data: Disc = {
    a: null,
    b: null,
    meta: {
      title: '',
      author: '',
      created: Date.now(),
    },
  }

  disc.subscribe(s => {
    if (!s) return
    if (s.a) {
      data.a = s.a
    }
    if (s.b) {
      data.b = s.b
    }
  })


  function upload() {
    fetch('https://juke.michaelhemingway.com/discs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then(res => console.log(res))
      .catch(console.log)
    dispatch('close')
  }
</script>

<aside class={open ? 'open' : ''}>
  <div class="blur"></div>
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
    <h2>Upload Disc</h2>
    <div class="form">
      <p class="description">You may upload your disc for others to view.</p>
      <input type="text" bind:value={data.meta.title} placeholder="Title" />
      <input type="text" bind:value={data.meta.author} placeholder="Author" />
      <button disabled={data.meta.title === '' || data.meta.author === ''} on:click={upload}>
        Upload
      </button>
    </div>
  </div>
</aside>

<style>
  aside {
    height: 100vh;
    width: 50vw;
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out;
    display: flex;
    right: 0;
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
    text-align: left;
    text-transform: uppercase;
    font-family: 'IBM Plex Mono', monospace;
  }
  .xmark {
    position: absolute;
    top: 1.3rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    border: 4px solid #fff;
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
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* height: calc(100% - 4rem); */
  }

  input {
    padding: 0.5rem;
    border: none;
    border-radius: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem;
    border: none;
    border-radius: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    background-color: #181818;
    color: #ffffff;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
  }

  button:disabled {
    background-color: #9b9b9b;
    color: #ffffff;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    background-color: #ffffff;
    color: #000000;
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #000000;
    }
    h2 {
      background-color: rgb(19, 82, 177);
    }
  }
</style>
