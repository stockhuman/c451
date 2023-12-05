<script lang="ts">
  import { T, useFrame, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls, useGltf } from '@threlte/extras'
  import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js'
  import blankDisc from '../../assets/blank-disc.glb'
  import envmap from '../../assets/empty_workshop_1k.hdr'
  import { generateTitle, generateTrack, type RecordSide } from '../../functions/builder'
  import { scene as global, disc } from '../../functions/store'

  // @ts-ignore
  let disq = null
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
  // @ts-ignore
  $: patternA = disq.a ? (generateTrack(disq.a) as unknown as RecordSide) : null
  // @ts-ignore
  $: patternB = disq.b ? (generateTrack(disq.b) as unknown as RecordSide) : null
  // @ts-ignore
  $: titleA = disq.a ? generateTitle(disq.a.title) : generateTitle('No disc loaded')
  // @ts-ignore
  $: titleB = disq.b ? generateTitle(disq.b.title) : generateTitle('No disc loaded')

  // let patternA: RecordSide, patternB: RecordSide, titleA: BufferGeometry, titleB: BufferGeometry

  disc.subscribe(d => {
    if (!d) return
    disq = d
    global.set(scene)
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
    {#if titleA}<T.Mesh geometry={titleA} material={mat2} name="title-A" />{/if}
    {#if patternB}
      <T.Mesh
        geometry={patternB}
        material={mat2}
        name="groves-B"
        position={[0, -0.0019, 0]}
        rotation={[0, 0, Math.PI]} />
    {/if}
    {#if titleB}
      <T.Mesh
        geometry={titleB}
        material={mat2}
        name="title-B"
        position={[0, -0.0019, 0]}
        rotation={[0, 0, Math.PI]} />
    {/if}
  </T.Group>
{/if}
