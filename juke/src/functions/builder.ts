// I love how tree-shaking is impossible in Three
import { BufferGeometry, BoxGeometry, BufferGeometryUtils } from '../three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import jetbrainsMono from '../assets/JetBrainsMono.json'

type RecordSide = {
  title: string
  data: DataPoint[]
  /**
   * - `original` describes the toy's 75-note limit across all groves, to ease in song composition
   * - `packed` instead maximizes available note density in the outer grooves, to a maximum of 156
   */
  mode: 'original' | 'packed'
} | null

type DataPoint = {}

/**
 * Builds A record given a set of note positions
 */
export async function builder(sideA?: RecordSide, sideB?: RecordSide): Promise<BufferGeometry> {
  const titleA = generateTitle(sideA?.title.toUpperCase() || '1234567 890OD')

  const geometry = BufferGeometryUtils.mergeGeometries([titleA])
  return geometry
}

const loader = new FontLoader()
const font = loader.parse(jetbrainsMono)

/**
 * Draws a given title
 * @TODO split title into individual letters, arrange by title length
 * @TODO make long titles split into top and bottom halves? Make config option?
 */
function generateTitle(title: string): BufferGeometry {
  const text: BufferGeometry[] = []
  // const isEven = title.length % 2 === 0
  // if (!isEven) {
  //   // single middle letter

  // }
  // for (let i = 0; i < title.length; i++) {
  //   const letter = new TextGeometry(title[i], {
  //     font: font,
  //     size: 0.4,
  //     height: 0.07,
  //     curveSegments: 12,
  //   })
  //   // offset text based on text length (z-up, only x+y)
  //   letter.translate(-1.5, 1, 0.1)
  //   text.push(letter)
  // }

  const charRads = Math.PI / 20
  const radius = 1.45

  for (let i = 0; i < title.length; i++) {
    if (title[i] === ' ') continue
    const letter = new TextGeometry(title[i], {
      font: font,
      size: 0.3,
      height: 0.07,
      curveSegments: 12,
    })
    letter.rotateZ(Math.PI - (i * charRads + 0.1))
    letter.translate(radius * -Math.sin(i * charRads), radius * -Math.cos(i * charRads), 0.1)
    
    text.push(letter)
  }

  const geometry = BufferGeometryUtils.mergeGeometries(text).rotateX(deg2rad(-90))
  return geometry
}

function deg2rad(degrees: number) {
  return degrees * (Math.PI / 180)
}
