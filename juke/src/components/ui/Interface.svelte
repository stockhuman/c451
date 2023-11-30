<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { disc } from '../../functions/store'

  let titleA = 'No disc loaded'
  let titleB = 'No disc loaded'
  let btnA = 'Add?'
  let btnB = 'Add?'

  const dispatch = createEventDispatcher()

  function handleButtonClick(side: 'A' | 'B') {
    dispatch('sideSelect', side)
  }

  disc.subscribe(d => {
    if (d) {
      if (d.a) {
        titleA = d.a.title
        btnA = 'Edit'
      }
      if (d.b) {
        titleB = d.b.title
        btnB = 'Edit'
      }
    }
  })
</script>

<div class="ui-side left">
  <p class="side">Side A</p>
  <p class="title">{titleA}</p>
  <span on:click={() => handleButtonClick('A')} on:keydown={() => {}} role="button" tabindex="0"
    >{btnA}</span>
</div>
<div class="ui-side right">
  <p class="side">Side B</p>
  <p class="title">{titleA}</p>
  <span on:click={() => handleButtonClick('B')} on:keydown={() => {}} role="button" tabindex="0"
    >{btnB}</span>
</div>

<style>
  .ui-side {
    position: fixed;
    top: 50%;
    text-transform: uppercase;
    transform: translateY(-50%);
    font-family: 'IBM Plex Mono', monospace;
  }
  .left {
    left: 3rem;
    text-align: left;
  }
  .right {
    right: 3rem;
    text-align: right;
  }
  .side {
    font-size: 0.8rem;
    font-weight: bold;
    opacity: 0.3;
    margin: 0;
    padding: 0;
  }
  .title {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }
  span {
    display: block;
    /* padding: 1rem; */
    background-color: #fff;
    color: #000;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }
  span:hover {
    background-color: #00f;
    color: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .ui-side {
      color: #fff;
    }
  }
</style>
