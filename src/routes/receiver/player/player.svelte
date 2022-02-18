<script>
  import { playerState } from '../player-state';
  import Background from './background.svelte';
  import CurrentSong from './current-song.svelte';
  import Progress from './progress.svelte';
  import Suggested from './suggested.svelte';
</script>

<div id="player">
  <Background />
  {#if $playerState}
    <div class="container">
      <CurrentSong />
      <Progress />
      <Suggested />
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: column nowrap;
    padding: 50px;
    height: calc(100vh - 100px);
    width: calc(100vw - 100px);
    justify-content: space-between;

    :global(div) {
      z-index: 2;
    }
  }
</style>