import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import type { RecordSide } from './builder'

export const scene = writable<Object3D>()
export const disc = writable<RecordSide>()