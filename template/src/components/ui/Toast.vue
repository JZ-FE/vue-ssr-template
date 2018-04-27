<template>
  <div class="ui-toast" v-show="show">
    <ui-mask :transparent="true"></ui-mask>
    <div class="weui-toast" :style="{width: width}" :class="`weui-toast_${type}`">
      <i class="weui-icon_toast" :class="`weui-icon-success-no-circle`" v-show="type !== 'text'"></i>
      <p class="weui-toast__content" v-if="text" v-html="text"></p>
      <p class="weui-toast__content" v-else><slot></slot></p>
    </div>
  </div>
</template>

<script>
  import UiMask from 'components/ui/Mask.vue'

  export default {
    name: 'ui-toast',

    props: {
      show: {
        type: Boolean,
        default: false,
      },
      time: {
        type: Number,
        default: 2000,
      },
      type: {
        type: String,
        default: 'text',
      },
      width: {
        type: String,
        default: 'inherit',
      },
      text: String,
    },

    components: {
      UiMask,
    },

    watch: {
      show (val) {
        if (!val) return

        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('on-hide')
        }, this.time)
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .weui-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5000;
    padding: px2rem(16 18);
    font-size: px2rem(36);
    text-align: center;
    color: #fefefe;
    border-radius: px2rem(10);
    background-color: #000;
  }

  .weui-icon_toast {
    display: block;
    margin: 22px 0 0;
  }
</style>
