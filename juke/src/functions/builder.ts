// I love how tree-shaking is impossible in Three
import { BufferGeometry, BoxGeometry, BufferGeometryUtils } from '../three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import typeface from '../assets/IBMPlexMonoSemiBold.json'

export type RecordSide = {
  title: string
  side: 'A' | 'B'
  /**
   * Describes the toy's original 75-note limit across all groves, to ease in song composition
   * From innermost to outer, 1 representing a notch, 0 nothing
   * ex: "0100101010010010101011"
   *
   * Note that it is stored as a hex string, so it must be decompressed before use
   */
  data: string[]
}

export function generateTrack(record: RecordSide) {
  const radius = 2.84 // the radius of the innermost track
  const notches: BufferGeometry[] = []

  for (let i = 0; i < record.data.length; i++) {
    const interval = decompress(record.data[i])
    // Hex string encodings allow for 24 bits of data, but the original toy only had 22 notches
    for (let t = 0; t < 22; t++) {
      if (interval[t] === '0') continue
      const notch = new BoxGeometry(0.08, 0.2, 0.08)
      notch.translate(radius + t * 0.1407 + (t % 2 === 0 ? 0 : 0.02), 0.14, 0)
      notch.rotateY(deg2rad((360 / 75) * i))
      notches.push(notch)
    }
  }

  if (record.side === 'B') {}
  if (notches.length === 0) return null
  
  const geometry = BufferGeometryUtils.mergeGeometries(notches)
  return geometry
}

const loader = new FontLoader()
const font = loader.parse(typeface)

/**
 * Draws a given title
 * @TODO make long titles split into top and bottom halves? Make config option?
 */
export function generateTitle(title: string): BufferGeometry {
  const string = (title || 'untitled').normalize('NFD').toUpperCase()
  const text: BufferGeometry[] = []
  const charRads = Math.PI / 15
  const radius = 1.45
  const height = 0.1

  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') continue
    const letter = new TextGeometry(string[i], {
      font: font,
      size: 0.32,
      height: 0.1,
      curveSegments: 12,
    })
    letter.rotateZ(Math.PI - (i * charRads + 0.1))
    letter.translate(radius * -Math.sin(i * charRads), radius * -Math.cos(i * charRads), height - 0.03)

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

/**
 * Decompresses a hex string into a binary string
 * @param data a hex string
 */
function decompress(data: string) {
  const binaryString = Number('0x' + data)
    .toString(2)
    .padStart(22, '0')
  return binaryString
}
