<script lang="ts">
  import { T, useFrame, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls, useGltf } from '@threlte/extras'
  import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js'
  import blankDisc from '../../assets/blank-disc.glb'
  import envmap from '../../assets/empty_workshop_1k.hdr'
  import { generateTitle, generateTrack, type RecordSide } from '../../functions/builder'
  import { scene as global, disc } from '../../functions/store'
  import type { BufferGeometry } from 'three'

  // recolor the disc
  const mat = new MeshStandardMaterial({ color: 0xad0d10, roughness: 0.5 })
  const mat2 = new MeshStandardMaterial({ color: 0xf44d40, roughness: 0.3 })
  const { scene } = useThrelte()
  const blank = useGltf(blankDisc)
  $: if ($blank) {
    // @ts-ignore
    $blank.scene.traverse(o => {
      if (o.isMesh) o.material = mat
    })
    global.set(scene)
  }
  let track = null
  let trackA: RecordSide, pattern: RecordSide, title: BufferGeometry

  disc.subscribe(d => {
    track = d
    if (track) {
      // @ts-ignore
      pattern = generateTrack(track)
      title = generateTitle(track.title)
    } else {
      trackA = { title: 'No disc loaded', data: [], side: 'A' }
      // @ts-ignore
      pattern = generateTrack(trackA)
      title = generateTitle(trackA.title)
    }
  })

  let rotation = 0
  useFrame((_, delta) => {
    // rotation -= delta / 6
  })
</script>

<Environment files={envmap} format="hdr" />
<T.PerspectiveCamera
  makeDefault
  position={[10, 20, 5]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}>
  <OrbitControls enableDamping enablePan={false} />
</T.PerspectiveCamera>
{#if $blank}
  <T.Group rotation.y={rotation} position={[0, 1.5, 0]}>
    <T.Mesh>
      <T is={$blank.nodes['Scene']} />
    </T.Mesh>
    {#if pattern}<T.Mesh geometry={pattern} material={mat2} name="groves-A" />{/if}
    <T.Mesh geometry={title} material={mat2} name="title-A" />
  </T.Group>
{/if}
