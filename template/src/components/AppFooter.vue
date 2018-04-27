<template>
  <div class="app-footer">
    <div class="foot-nav">
      <a class="item" href="">导航</a>
      <a class="item" href="">导航</a>
      <a class="item" href="">导航</a>
      <a class="item" href="">导航</a>
      <a class="item" href="">导航</a>
    </div>

    <div class="version">
      <a class="active item" href="">触屏版</a>
      <a class="item" href="">电脑版</a>
    </div>

    <p class="copyright">Powered by {{ project }} &copy; {{ year }}</p>
  </div>
</template>

<script>
  import Utils from 'utils'

  export default {
    name: 'app-footer',
    data () {
      return {
        project: Utils.getProject(),
        year: (new Date()).getFullYear(),
      }
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .app-footer {
    padding: px2rem(20 0);
    font-size: px2rem(28);
    text-align: center;
    background-color: $primary;

    .foot-nav {
      .item {
        margin: px2rem(0 30);
        color: rgba(#fff, .8);
      }
    }

    .version {
      display: inline-block;
      margin-top: px2rem(22);
      font-size: 0;

      .item {
        @include size(140, 50);

        display: inline-block;
        font-size: px2rem(28);
        line-height: px2rem(50);
        color: rgba(#fff, .5);
        background-color: #006aa7;

        &:first-child {
          border-radius: px2rem(10 0 0 10);
        }

        &:last-child {
          border-radius: px2rem(0 10 10 0);
        }

        &.active {
          color: rgba(#fff, .8);
          background-color: #004c78;
        }
      }
    }

    .copyright {
      margin-top: px2rem(20);
      font-size: px2rem(24);
      color: rgba(#fff, .6);
    }
  }
</style>
