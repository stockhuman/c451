<script>
  import { T, useFrame } from '@threlte/core'
  import { Environment, OrbitControls, interactivity, useGltf } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js'
  import blankDisc from '../../assets/blank-disc.glb'
  import envmap from '../../assets/empty_workshop_1k.hdr'
  import { generateTitle, generateTrack } from '../../functions/builder'

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
  const gen = Array(75)
  for (let i = 0; i < gen.length; i++) {
    let a = Array(22).fill('1')
    a.map((_, s) => Math.random() > 0.5 ? a[s] = '1' : a[s] = '0')
    gen[i] = a.join('')
  }
  const trackA = { title: 'Garbanzo bob', data: gen, type: 'original', side: 'A' }
  // @ts-ignore
  const pattern = generateTrack(trackA)
  const title = generateTitle(trackA.title)

  interactivity()
  const scale = spring(1)
  let rotation = 0
  useFrame((_, delta) => {
    rotation -= delta / 2
  })
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
    <T.Mesh geometry={pattern} material={mat2} />
    <T.Mesh geometry={title} material={mat2} />
  </T.Group>
{/if}
