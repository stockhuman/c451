<script lang="ts">
  import type { RecordSide } from '../../functions/builder'
  import { disc } from '../../functions/store'

  const notes = 17
  const length = 75

  export let side: 'A' | 'B' = 'A'
  let title = 'Untitled'

  let composition = Array.from({ length: notes }, (_, i) => {
    return Array.from({ length }, (_, i) => {
      return false
    })
  })

  function toggle(el: any) {
    const [n, i] = el.target.value.split('_')
    composition[n][i] = !composition[n][i]
    composition = [...composition]
    const data = pack()
    disc.update(value => ({ ...value, [side.toLowerCase()]: { side, data, title } }))
  }

  // Generate a RecordSide track from the composition array
  function pack(): RecordSide['data'] {
    // transpose the array
    let data = composition[0].map((_, colIndex) => composition.map(row => row[colIndex]))
    data = autoSpace(data)
    // convert to hex
    const packed = data.map(row => {
      return parseInt(row.map(n => (n ? '1' : '0')).join(''), 2)
        .toString(16)
        .toUpperCase()
        .padStart(6, '0')
    })
    return packed
  }

  /**
   * To improve sound quality, track groves 9-19 are actually doubles of their previous grove.
   * As in, grove 9 is the same as grove 8, grove 10 is the same as grove 9, etc.
   * Finely spaced notes should then be moved to the lower groves if appropriate.
   * This function will automatically move notes to the lower groves if they are
   * spaced closely enough to the previous grove.
   *
   * Additionally, this component's 17 note grid is filled with zeroes where applicable,
   * so that the requisite 22 groove spaces are present in the final track.
   */
  function autoSpace(data: boolean[][]): boolean[][] {
    let last: boolean[] = new Array(22).fill(false)
    let autospaced: boolean[][] = []
    for (let i = 0; i < length; i++) {
      // time sclice
      let slice: boolean[] = [] // 22 notes
      for (let n = 0; n < notes; n++) {
        // note

        if (n > 6 && n < 13) {
          // add an extra zero to the middle range
          slice.push(false)
        }
        slice.push(data[i][n])
      }
      for (let n = 0; n < 22; n++) {
        let element = slice[n]
        slice[n] = element
        if (n > 8 && n < 19) {
          // if the note is in the middle range, check if it's close enough to the previous note
          if (element && last[n]) {
            // if it is, move it to the previous note
            slice[n - 1] = true
            slice[n] = false
          }
        }
      }
      last = slice
      autospaced.push(slice)
    }
    // return autospaced
    return autospaced
  }

  function changeTitle(event: any) {
    title = event.target.value
    const data = pack()
    disc.update(value => ({ ...value, [side.toLowerCase()]: { side, data, title } }))
  }
</script>

<div>
  <input placeholder="Title" class="title" on:change={changeTitle} maxlength="30"/>
  <!-- We're building a table that looks like a treble clef music sheet -->
  <div class="notes-container">
    <table>
      {#each Array.from({ length: notes - 1 }, (_, i) => i) as n}
        <tr>
          {#each Array.from({ length }, (_, i) => i) as i}
            <td
              ><input
                type="radio"
                value={`${n}_${i}`}
                checked={composition[n][i]}
                on:click={toggle} /></td>
          {/each}
        </tr>
      {/each}
    </table>
  </div>
  <p class="description">Input notes here directly as they are placed within the disc</p>
</div>

<style>
  :root {
    --border-color: #c1c1c1;
  }
  .notes-container {
    overflow-x: scroll;
    height: 100%;
    border: 1px solid var(--border-color);
  }
  table {
    border-collapse: collapse;
    width: 400px;
    border-left: 4px solid var(--border-color);
  }
  tr {
    border: 1px solid var(--border-color);
    width: 1rem;
    height: 1rem;
  }
  td:nth-of-type(4n) {
    border-left: 1px solid var(--border-color);
  }
  .title {
    font-size: 1.5rem;
    margin: 0;
    padding: 1rem;
    background-color: var(--border-color);
    color: #fff;
    text-transform: uppercase;
    font-family: 'IBM Plex Mono', monospace;
    width: calc(100% - 2rem - 8px);
    border: 4px solid transparent;
  }
  .title:focus {
    outline: none;
    border-left: #000 4px solid;
    border-style: solid solid solid solid;
  }

  .description {
    font-size: 0.7rem;
    margin: 1rem 0;
    opacity: 0.5;
    font-family: 'IBM Plex Mono', monospace;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --border-color: #2e2e2e;
    }
    .title {
      background-color: rgb(7, 23, 47);
    }
    .title:focus {
      outline: none;
      border-left: #fff 4px solid;
    }
  }
</style>
