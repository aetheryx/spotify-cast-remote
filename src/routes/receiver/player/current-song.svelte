<script lang="ts">
  import { playerState } from '../player-state';
</script>

<div class="current-song">
  <div class="icon">
    <img src={$playerState.iconURL} alt="e" />
  </div>
  <div class="details">
    <div class="song-name">
      {$playerState.name}
    </div>
    <div class="artists">
      {$playerState.artists.map(a => a.name).join(', ')}
    </div>
  </div>
</div>

<style lang="scss">
  .current-song {
    display: flex;
    flex-flow: row nowrap;

    .icon {
      height: 225px;
      width: 225px;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .details {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      color: white;
      font-family: spotify;
      flex: 1 0;
      padding: 0 50px;

      .song-name {
        font-weight: 700;
        font-size: 3.2em;
        line-height: 1.2em;
      }
      .artists {
        font-weight: 700;
        font-size: 1.75em;
        line-height: 1.6em;
        opacity: .7;
      }
    }
  }

</style>