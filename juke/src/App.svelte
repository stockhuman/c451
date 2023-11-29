<script lang="ts">
  import Canvas from './components/canvas/Canvas.svelte'
  import Download from './components/ui/Download.svelte'
  import Header from './components/ui/Header.svelte'
  import Aside from './components/ui/Aside.svelte'
  import Manual from './components/input/Manual.svelte'
</script>

<Canvas />
<Header />
<Aside open={true}>
  <Manual />
</Aside>
<Download />
