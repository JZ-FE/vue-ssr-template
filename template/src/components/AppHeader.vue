<template>
  <div v-show="title" class="app-header">
    <div class="inner">
      <img v-if="logo" class="logo" src="https://cn.vuejs.org/images/logo.png" alt="">
      <span v-show="back" class="back" @click="goBack"></span>
      <span class="text">{{ title }}</span>
      <router-link v-show="menu" class="menu" to=""></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-header',
    props: {
      title: {
        default: '',
      },
      logo: {
        default: false,
      },
      back: {
        default: true,
      },
      menu: {
        default: true,
      },
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  $imgPath: $imgPath2;

  .app-header {
    @include line-height(90);

    overflow: hidden;
    width: 100%;
    font-size: px2rem(34);
    text-align: center;
    color: #fff;
    background-color: $primary;

    .inner {
      position: relative;
      margin: px2rem(0 34);
    }

    .logo {
      @include size(60);

      position: absolute;
      top: px2rem(15);
      left: 0;
    }

    .back {
      @include size(23, 42);
      @include background-cover("back-btn.png");

      position: absolute;
      top: px2rem(24);
      left: 0;
    }

    .menu {
      @include size(40, 36);
      @include background-cover("icon-menu.png");

      position: absolute;
      top: px2rem(27);
      right: 0;
    }
  }
</style>
