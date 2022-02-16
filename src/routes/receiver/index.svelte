<script lang="ts">
  import { browser } from '$app/env';
  import { playerState } from './player-state';

  if (browser) {
    (document.body.style as any).zoom = '150%';
  }
</script>

<svelte:head>
  <script
    type="text/javascript"
    src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
</svelte:head>

<div>
  <cast-media-player />
  <code style="white-space: pre-wrap;">
    {JSON.stringify($playerState, null, 2)}
  </code>
</div>

<style>
  cast-media-player {
    display: none;
  }
</style>
