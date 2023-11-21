// import { parseMidiFile } from '@sightread/jasmid.ts'
// import type { RecordSide } from '../builder'

// /**
//  * Converts a midi file into a RecordSide data array
//  */
// export default function MIDIEncoder(midi: ArrayBufferLike): RecordSide['data'] {
//   const { header, tracks } = parseMidiFile(midi)
//   const ticksPerBeat = header.ticksPerBeat
//   // for simplicity's sake, we'll only use the first track
//   if (header.trackCount < 1) throw new Error('No tracks found')
//   if (header.formatType !== 0) throw new Error('Only format 0 is supported')
//   if (tracks.length > 1) alert('Only the first track will be used')

//   // let tempo = // @ts-ignore
//   //   tracks[0].find(t => t.type === 'meta' && t.subType === 'setTempo')?.microsecondsPerBeat || 500000
//   // let notelength = tempo / ticksPerBeat
//   // we have effectively ~60 seconds of audio to play with, at one track segment per second
//   let notes: { note: number; time: number }[] = []
//   tracks[0].forEach((event, i) => {
//     if (event.subType === 'noteOn') {
//       if (event.channel === 9) notes.push({ note: event.note, time: event.deltaTime })
//     }
//   })

//   console.log(notes)

//   const side: string[] = []
//   return side
// }
