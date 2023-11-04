<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div aria-details="A spinning disc representation of what will be downloaded as a 3d file">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100vh;
    width: 100vw;
  }
</style>
