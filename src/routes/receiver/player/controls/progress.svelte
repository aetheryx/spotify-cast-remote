<script>
  import { onMount } from 'svelte';
  import { playerState } from '../../player-state';

  function getProgress() {
    const syncedProgress = $playerState.progress.ms + (Date.now() - $playerState.progress.syncedAt);
    const progress = syncedProgress / $playerState.durationMs;
    return (progress * 100).toFixed(2);
  }

  let progress = getProgress();

  onMount(() => {
    const interval = setInterval(() => {
      if (!$playerState.paused) {
        progress = getProgress();
      }
    }, 50);

    return () => clearInterval(interval);
  });
</script>

<div class="progress">
  <div class="bar top" style="--progress: {progress}%;" />
  <div class="bar below" />
  <div class="pointer" style="--progress: {progress}%;" />
</div>

<style lang="scss">
  .progress {
    width: 100%;
    position: relative;
    height: 40px;

    .bar {
      top: calc(50% - 5px);
      position: absolute;
      height: 5px;
      border-radius: 5px;

      &.below {
        width: 100%;
        z-index: 3;
        background-color: #535353;
      }

      &.top {
        z-index: 4;
        background-color: #b3b3b3;
        width: var(--progress);
      }
    }

    .pointer {
      height: 40px;
      width: 5px;
      border-radius: 5px;
      background-color: #fff;
      position: absolute;
      left: var(--progress);
      z-index: 5;
    }
  }
</style>