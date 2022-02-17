<script lang="ts">
  import Player from './player/player.svelte';
</script>

<svelte:head>
  <script
    type="text/javascript"
    src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
</svelte:head>

<div>
  <cast-media-player />
  <Player />
</div>

<style>
  cast-media-player {
    display: none;
  }
</style>
