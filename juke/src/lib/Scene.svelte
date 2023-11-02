<script>
  import { T, useFrame } from '@threlte/core'
  import { OrbitControls, interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  import { builder } from './builder'

  const geo = builder()

  interactivity()
  const scale = spring(1)
  let rotation = 0
  useFrame((state, delta) => {
    rotation += delta
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh
  rotation.y={rotation}
  position={[0, 1.5, 0]}
  scale={$scale}
  on:pointerenter={() => scale.set(1.5)}
  on:pointerleave={() => scale.set(1)}
  castShadow
  geometry={geo}>
  <T.MeshStandardMaterial color="blue" />
</T.Mesh>

<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
  <T.CircleGeometry args={[6, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>
