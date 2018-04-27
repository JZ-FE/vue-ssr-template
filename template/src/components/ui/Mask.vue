<template>
  <div class="ui-mask" :class="{ 'ui-mask_transparent': transparent }" @click="onMask"></div>
</template>

<script>
  export default {
    name: 'ui-mask',
    props: {
      transparent: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      onMask () {
        this.$emit('onMask')
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .ui-mask {
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 1000;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
  }

  .ui-mask_transparent {
    background: none;
  }
</style>
