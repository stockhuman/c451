<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<main aria-details="A spinning disc representation of what will be downloaded as a 3d file">
  <Canvas>
    <Scene />
  </Canvas>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
  }
  @media (prefers-color-scheme: dark) {
    main {
      background-color: #000;
    }
  }
</style>
