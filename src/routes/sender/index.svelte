<script lang="ts">
  import { castState } from './cast';
</script>

<svelte:head>
  <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
  <script>
    window['__onGCastApiAvailable'] = function (available) {
      if (available) {
        window['__GCastApiIsAvailable'] = true;
      }
    };
  </script>
</svelte:head>
<main>
  cast state: {$castState}
</main>
