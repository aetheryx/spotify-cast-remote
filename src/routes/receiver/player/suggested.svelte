<script lang="ts">
  const items: Array<{ imageURL: string }> = [
    {
      imageURL: 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/62jut_pc1Y1cL40_cnlT2cIkNhzw5YsyELkfO4vduQVPl2PRmzELqwb4IPyxhB7YParfqrRnG9QJHie82MjEo6-fo-U-c9aEdBr4PhFr5vY=/MjU6MjQ6NzBUMjAtMzAtMg=='
    },
    {
      imageURL: 'https://daily-mix.scdn.co/covers/backtracks/PZN_Repeat_Rewind2_DEFAULT-en.jpg'
    },
    {
      imageURL: 'https://thisis-images.scdn.co/37i9dQZF1DZ06evO2nTSE0-default.jpg'
    },
    {
      imageURL: 'https://lineup-images.scdn.co/wrapped-2021-top100_DEFAULT-en.jpg'
    },
    {
      imageURL: 'https://seeded-session-images.scdn.co/v1/img/artist/0u18Cq5stIQLUoIaULzDmA/en'
    },
    {
      imageURL: 'https://i.scdn.co/image/ab67616d0000b2735f1f1c836f2519b6579ae4df'
    }
  ]
</script>

<div class="suggested">
  {#each items as item}
    <div class="item">
      <img src={item.imageURL} alt="e" />
    </div>
  {/each}
  <div class="item">
    <div style="width: 30px" />
  </div>
</div>

<style lang="scss">
  .suggested {
    display: flex;
    flex-flow: row nowrap;
    width: calc(100vw - 50px);
    overflow: scroll;

    .item {
      display: flex;
      flex-flow: column nowrap;
      margin: 0 12px;

      &:first-child {
        margin-left: 0;
      }

      img {
        height: 160px;
      }

      div {
        color: white;
        font-family: spotify;
        font-weight: 700;
        font-size: 1em;
      }
    }
  }
</style>