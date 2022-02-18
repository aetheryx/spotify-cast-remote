<script lang="ts">
  import { browser } from '$app/env';
  import { playerState } from '../player-state';
  import { debounce } from 'throttle-debounce';

  let backgrounds: Array<{
    id: string;
    loaded: 'loaded' | 'preloaded' | '';
    image?: string;
    color?: string;
  }> = [];
  const clean = debounce(1000, false, () => {
    const background = backgrounds[backgrounds.length - 1];
    backgrounds = [
      {
        ...background,
        loaded: 'preloaded',
      },
    ];
  });

  if (browser) {
    playerState.subscribe((newState) => {
      if (
        !newState?.background ||
        backgrounds[backgrounds.length - 1]?.id === newState?.id
      ) {
        return;
      }

      backgrounds = [
        ...backgrounds,
        {
          id: newState.id,
          loaded: '',
          image: newState?.background?.backgroundImage as string,
          color: (newState?.background?.color as any)?.colorRaw.hex,
        },
      ];
      clean();
    });
  }
</script>

<div>
  {#each backgrounds as background}
    {#if background.image}
      <img
        on:load={() => {
          if (!background.loaded) {
            background.loaded = 'loaded';
          }
        }}
        src={background.image}
        alt={background.id}
        class={`background ${background.loaded}`}
      />
    {:else}
      <div
        class={`background ${background.loaded || 'loaded'}`}
        style="background-color: {background.color}"
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
    opacity: 0;

    &.loaded {
      animation: opacity 0.25s ease-in-out forwards;
    }

    &.preloaded {
      opacity: 1;
    }
  }

  img.background {
    filter: brightness(30%);
  }

  div.background {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)),
      linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), transparent;
  }

</style>
