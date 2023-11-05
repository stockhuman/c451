import { writable } from 'svelte/store'
import type { Object3D } from 'three'

export const scene = writable<Object3D>()