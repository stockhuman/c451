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
  const mat = new MeshStandardMaterial({ color: 0x286bb5, roughness: 0.5 })
  const mat2 = new MeshStandardMaterial({ color: 0x164477, roughness: 0.3 })
  const { scene } = useThrelte()
  const blank = useGltf(blankDisc)
  $: if ($blank) {
    // @ts-ignore
    $blank.scene.traverse(o => {
      if (o.isMesh) o.material = mat
    })
    global.set(scene)
  }
  let patternA: RecordSide, patternB: RecordSide, titleA: BufferGeometry, titleB: BufferGeometry

  disc.subscribe(d => {
    console.log(d)
    if (d?.a) {
      patternA = generateTrack(d.a) as unknown as RecordSide
      titleA = generateTitle(d.a.title)
    } else {
      titleA = generateTitle('No disc loaded')
    }
    if (d?.b) {
      patternB = generateTrack(d.b) as unknown as RecordSide
      titleB = generateTitle(d.b.title)
    } else {
      titleB = generateTitle('No disc loaded')
    }
  })

  let rotation = 0
  useFrame((_, delta) => {
    rotation -= delta / 6
  })
</script>

<Environment files={envmap} format="hdr" />
<T.PerspectiveCamera
  makeDefault
  position={[4, 20, 5]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>
{#if $blank}
  <T.Group rotation.y={rotation} position={[0, 1.5, 0]}>
    <T.Mesh>
      <T is={$blank.nodes['Scene']} />
    </T.Mesh>
    {#if patternA}<T.Mesh geometry={patternA} material={mat2} name="groves-A" />{/if}
    <T.Mesh geometry={titleA} material={mat2} name="title-A" />
    {#if patternB}<T.Mesh
        geometry={patternB}
        material={mat2}
        name="groves-B"
        position={[0, -0.0019, 0]}
        rotation={[0, 0, Math.PI]} />{/if}
    <T.Mesh
      geometry={titleB}
      material={mat2}
      name="title-B"
      position={[0, -0.0019, 0]}
      rotation={[0, 0, Math.PI]} />
  </T.Group>
{/if}
