import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import type { RecordSide } from './builder'

export type Disc = {
  a: RecordSide | null
  b: RecordSide | null
  meta: {
    author: string
    created: number
    title: string
  }
}

export const scene = writable<Object3D>()
export const disc = writable<Disc>({
  a: null,
  b: null,
  meta: {
    author: 'unknown',
    created: Date.now(),
    title: 'untitled'
  }
})