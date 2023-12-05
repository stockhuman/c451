import type { Object3D } from '../three'
import { STLExporter } from './STLExporter'

const exporter = new STLExporter()

export function getSTL(scene: Object3D) {
  const str = exporter.parse(scene, { binary: false })
  const blob = new Blob([str], { type: 'text/plain' })
  return URL.createObjectURL(blob)
}
