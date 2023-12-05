<script lang="ts">
  import Canvas from './components/canvas/Canvas.svelte'
  import Download from './components/ui/Download.svelte'
  import Header from './components/ui/Header.svelte'
  import Aside from './components/ui/Aside.svelte'
  import Manual from './components/input/Manual.svelte'
  import Interface from './components/ui/Interface.svelte'
  import UploadButton from './components/ui/UploadButton.svelte'
  import Modal from './components/ui/Modal.svelte'

  let side: 'A' | 'B' = 'A'
  let inputOpen = false
  let uploadModalOpen = false

  function handleSideSelect(event: CustomEvent<'A' | 'B'>) {
    // Handle the sideSelect event here
    side = event.detail
    inputOpen = true
  }

  function handleUploadModal() {
    // Handle the uploadModal event here
    uploadModalOpen = true
  }
</script>

<Canvas />
<Header />
<Interface on:sideSelect={handleSideSelect} />
<Download />
<Aside open={inputOpen && side === 'A'} {side} on:close={() => (inputOpen = false)}>
  <Manual side="A" />
</Aside>
<Aside open={inputOpen && side === 'B'} {side} on:close={() => (inputOpen = false)}>
  <Manual side="B" />
</Aside>
<UploadButton on:modal={handleUploadModal}/>
<Modal open={uploadModalOpen} on:close={() => (uploadModalOpen = false)} />

