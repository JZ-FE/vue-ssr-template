<template>
  <div class="loading" v-show="loading"></div>
</template>

<script>
  export default {
    name: 'loading',
    computed: {
      loading () {
        return this.$store.state.loading
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .loading {
    @include absolute-center;
    @include size(64);
    @include background-cover("loading.svg");

    position: fixed;
    z-index: 999;
  }
</style>
