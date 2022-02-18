<script lang="ts">
  import { onMount } from 'svelte';
  import { playerState } from '../player-state';

  function parseTimestamp(ms: number): string {
    const fullSeconds = ms / 1000;
    const min = Math.floor(fullSeconds / 60);
    const sec = Math.floor(fullSeconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  const getProgress = () =>
    $playerState.progress.ms + (Date.now() - $playerState.progress.syncedAt);

  let progress = getProgress();
  $: progressPercentage = ((progress / $playerState.durationMs) * 100).toFixed(2);

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
  <div class="bar-container">
    <div class="bar top" style="--progress: {progressPercentage}%;" />
    <div class="bar below" />
    <div class="pointer" style="--progress: {progressPercentage}%;" />
  </div>
  <div class="timestamps">
    <span class="timestamp left">{parseTimestamp(progress)}</span>
    <span class="timestamp right">{parseTimestamp($playerState.durationMs)}</span>
  </div>
</div>

<style lang="scss">
  .progress {
    display: flex;
    flex-flow: column nowrap;
    height: 50px;
    margin-top: 10px;

    .timestamps {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      height: 20px;

      .timestamp {
        font-family: spotify-circular;
        color: #a7a7a7;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.5em;
      }
    }

    .bar-container {
      height: 30px;
      flex: 1 0;
      position: relative;

      .bar {
        top: calc(50% - 2.5px);
        position: absolute;
        height: 5px;
        border-radius: 5px;

        &.below {
          width: 100%;
          z-index: 3;
          background-color: #535353;
        }

        &.top {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          z-index: 4;
          background-color: #b3b3b3;
          width: var(--progress);
        }
      }

      .pointer {
        position: absolute;
        height: 100%;
        width: 7px;
        border-radius: 7px;
        background-color: #fff;
        left: var(--progress);
        z-index: 5;
      }
    }
  }
</style>
