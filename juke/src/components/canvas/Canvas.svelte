<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  export let shift = false
</script>

<main aria-details="A spinning disc representation of what will be downloaded as a 3d file">
  <div class={shift ? 'shifted' : ''}>
    <Canvas>
      <Scene />
    </Canvas>
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  div {
    width: 100%;
    height: 100%;
    transition: ease-in-out 0.5s transform;
  }
  .shifted {
    transform: translateY(300px);
  }
  @media (prefers-color-scheme: dark) {
    main {
      background-color: #000;
    }
  }
</style>
