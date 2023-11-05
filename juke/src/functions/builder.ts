// I love how tree-shaking is impossible in Three
import { BufferGeometry, BoxGeometry, BufferGeometryUtils } from '../three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import jetbrainsMono from '../assets/JetBrainsMono.json'

type RecordSide = {
  title: string
  side: 'A' | 'B'
} & (
  | {
      /**
       * Describes the toy's original 75-note limit across all groves, to ease in song composition
       * From innermost to outer, 1 representing a notch, 0 nothing
       * ex: "0100101010010010101011"
       */
      type: 'original'
      data: string[]
    }
  | {
      /**
       * Like packed, except data is laid out automatically.
       * All the data is sequentially placed in one string.
       * ex.: "0101010001010100100111101011011..."
       */
      type: 'raw'
      data: string
    }
)

export function generateTrack(record: RecordSide) {
  const radius = 2.85 // the radius of the innermost track
  const notches: BufferGeometry[] = []

  if (record.type === 'original') {
    for (let i = 0; i < record.data.length; i++) {
      const interval = record.data[i]
      for (let t = 0; t < interval.length; t++) {
        if (interval[t] === '0') continue
        const notch = new BoxGeometry(0.1, 0.2, 0.1)
        notch.translate(radius + t * 0.1407, 0.14, 0)
        notch.rotateY(deg2rad((360 / 75) * i))
        notches.push(notch)
      }
    }
  }

  const geometry = BufferGeometryUtils.mergeGeometries(notches)
  return geometry
}

const loader = new FontLoader()
const font = loader.parse(jetbrainsMono)

/**
 * Draws a given title
 * @TODO make long titles split into top and bottom halves? Make config option?
 */
export function generateTitle(title: string): BufferGeometry {
  const string = (title || 'untitled').normalize('NFD').toUpperCase()
  const text: BufferGeometry[] = []
  const charRads = Math.PI / 18
  const radius = 1.45

  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') continue
    const letter = new TextGeometry(string[i], {
      font: font,
      size: 0.33,
      height: 0.1,
      curveSegments: 12,
    })
    letter.rotateZ(Math.PI - (i * charRads + 0.1))
    letter.translate(radius * -Math.sin(i * charRads), radius * -Math.cos(i * charRads), 0.1)

    text.push(letter)
  }

  const geometry = BufferGeometryUtils.mergeGeometries(text)
    // flatten text against surface
    .rotateX(deg2rad(-90))
    // centers the text with the topmost peg hole, to match original
    .rotateY((charRads * string.length) / 2)
  return geometry
}

function deg2rad(degrees: number) {
  return degrees * (Math.PI / 180)
}
