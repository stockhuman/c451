<script lang="ts">
  import Canvas from './components/canvas/Canvas.svelte'
  import Download from './components/ui/Download.svelte'
  import Header from './components/ui/Header.svelte'
  import Aside from './components/ui/Aside.svelte'
  import Manual from './components/input/Manual.svelte'
  import Interface from './components/ui/Interface.svelte'

  let side: 'A' | 'B' = 'A'
  let open = false

  function handleSideSelect(event: CustomEvent<'A' | 'B'>) {
    // Handle the sideSelect event here
    side = event.detail
    open = true
  }
</script>

<Canvas />
<Header />
<Interface on:sideSelect={handleSideSelect} />
<Aside open={open && side === 'A'} {side} on:close={() => (open = false)}>
  <Manual side="A" />
</Aside>
<Aside open={open && side === 'B'} {side} on:close={() => (open = false)}>
  <Manual side="B" />
</Aside>
<Download />
