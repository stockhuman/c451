<script>
  import { T, useFrame, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls, useGltf } from '@threlte/extras'
  import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js'
  import blankDisc from '../../assets/blank-disc.glb'
  import envmap from '../../assets/empty_workshop_1k.hdr'
  import { generateTitle, generateTrack } from '../../functions/builder'
  import { scene as global } from '../../functions/store'

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
  const gen = Array(75)
  for (let i = 0; i < gen.length; i++) {
    let a = Array(22).fill('1')
    a.map((_, s) => (Math.random() > 0.5 ? (a[s] = '1') : (a[s] = '0')))
    gen[i] = a.join('')
  }
  const trackA = { title: 'Garbanzo bob', data: gen, type: 'original', side: 'A' }
  // @ts-ignore
  const pattern = generateTrack(trackA)
  const title = generateTitle(trackA.title)

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
  <T.Group rotation.y={rotation} position={[0, 1.5, 0]}>
    <T.Mesh >
      <T is={$blank.nodes['Scene']} />
    </T.Mesh>
    <T.Mesh geometry={pattern} material={mat2} name="groves-A"/>
    <T.Mesh geometry={title} material={mat2} name="title-A" />
  </T.Group>
{/if}
