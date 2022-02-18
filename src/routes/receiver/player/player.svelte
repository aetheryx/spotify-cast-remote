<script>
  import { playerState } from '../player-state';
  import Background from './background.svelte';
  import Controls from './controls.svelte';
  import CurrentSong from './current-song.svelte';
</script>

<div id="player">
  <Background />
  {#if $playerState}
    <div class="container">
      <CurrentSong />
      <Controls />
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: column nowrap;
    padding: 50px;

    :global(div) {
      z-index: 2;
    }
  }
</style>