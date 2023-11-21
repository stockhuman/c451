<!-- <script lang="ts">
  import MIDIEncoder from "../../functions/encoders/midi"

  function handleFileSelect(evt: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
    const files = evt?.currentTarget?.files
    const reader = new FileReader()
    reader.onload = e => {
      const midi = MIDIEncoder(e?.target?.result as ArrayBuffer)
      // console.log('data', midi)
    }
    if (!files?.length) return
    reader.readAsArrayBuffer(files[0])
  }
</script>

<input type="file" id="midi" accept="audio/midi, audio/x-midi" on:input={handleFileSelect} />

<style>
  input {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style> -->
