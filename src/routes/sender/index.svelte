<script lang="ts">
  import { castState } from './cast';
  import { spotifyState, init } from './spotify';
  let cookie = '';
</script>

<svelte:head>
  <script
    src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
  <script>
    window['__onGCastApiAvailable'] = function (available) {
      if (available) {
        window['__GCastApiIsAvailable'] = true;
      }
    };
  </script>
</svelte:head>
<main>
  cast state: {$castState}<br />
  spotify state: {$spotifyState}<br />
  <input bind:value={cookie} />
  <button on:click={() => init(cookie)}>Start</button>
</main>
