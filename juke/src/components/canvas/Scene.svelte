<script>
  import { T, useFrame } from '@threlte/core'
  import { Environment, OrbitControls, interactivity, useGltf } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js'
  import { builder } from '../../functions/builder'
  import blankDisc from '../../assets/blank-disc.glb'
  import envmap from '../../assets/empty_workshop_1k.hdr'

  // recolor the disc
  const mat = new MeshStandardMaterial({ color: 0xad0d10, roughness: 0.5 })
  const mat2 = new MeshStandardMaterial({ color: 0xf44d40, roughness: 0.3 })
  const blank = useGltf(blankDisc)
  $: if ($blank) {
    // @ts-ignore
    $blank.scene.traverse(o => {
      if (o.isMesh) o.material = mat
    })
  }
  const pattern = builder()

  interactivity()
  const scale = spring(1)
  let rotation = 0
  // useFrame((_, delta) => {
  //   rotation += delta / 2
  // })
</script>

<Environment files={envmap} format="hdr" />
<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>
{#if $blank}
  <T.Group
    rotation.y={rotation}
    position={[0, 1.5, 0]}
    scale={$scale}
    on:pointerenter={() => scale.set(1.5)}
    on:pointerleave={() => scale.set(1)}>
    <T.Mesh>
      <T is={$blank.nodes['Scene']} scale={100} />
    </T.Mesh>
    {#await pattern then pat}
      <T.Mesh geometry={pat} material={mat2} />
    {/await}
  </T.Group>
{/if}
