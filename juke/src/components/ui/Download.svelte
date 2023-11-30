<script>
  import { getSTL } from '../../functions/export'
  import { scene, disc } from '../../functions/store'
  let title = 'Untitled'

  /**
   * @type {import("three").Object3D<import("three").Object3DEventMap> | null}
   */
  let model = null
  disc.subscribe((d) => {
    if (!d) return
    title = d.meta.title
  })
  scene.subscribe((s) => {
    if (!s) return
    model = s
  })
</script>

{#if model}
  <a href={getSTL(model)} download={`JUKE-${title}.stl`}>Save STL</a>
{/if}

<style>
  a {
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
  }
  a:hover {
    background-color: #00f;
  }
</style>
