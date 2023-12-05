<script lang="ts">
  import type { Object3D, Object3DEventMap, Scene } from 'three'
  import { getSTL } from '../../functions/export'
  import { scene, disc } from '../../functions/store'

  let title = 'Untitled'
  let model: Scene | null = null

  disc.subscribe(d => {
    if (!d) return
    title = d.meta.title
  })
  scene.subscribe(s => {
    if (!s) return
    model = s as Scene
  })

  function download() {
    const a = document.createElement('a')
    model?.updateMatrixWorld()
    a.href = getSTL(model as Object3D<Object3DEventMap>)
    a.download = `JUKE-${title}.stl`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
</script>

{#if model}
  <button on:click={download}>Save STL</button>
{/if}

<style>
  button {
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
    left: 0;
    border-radius: 0;
    border: none;
  }
  button:hover {
    background-color: #00f;
  }
</style>
