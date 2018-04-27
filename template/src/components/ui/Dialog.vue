<template>
  <div class="ui-dialog" v-show="isShow">
    <ui-mask></ui-mask>

    <div class="weui-dialog" :class="{ 'round-sm': type === 'modal' }">
      <span class="weui-dialog__close" v-show="close" @click="onClose">×</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import UiMask from 'components/ui/Mask.vue'

  export default {
    name: 'ui-dialog',

    props: {
      show: {
        type: Boolean,
        default: false,
      },

      type: {
        type: String,
        default: '',
      },

      close: {
        type: Boolean,
        default: false,
      },
    },

    components: {
      UiMask,
    },

    data () {
      return {
        isShow: false,
      }
    },

    created () {
      this.isShow = this.show
    },

    watch: {
      show (val) {
        this.isShow = val
      },
    },

    methods: {
      onClose () {
        this.isShow = false
        this.$emit('btnClose')
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .weui-dialog {
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5000;
    width: px2rem(540);
    font-size: px2rem(36);
    text-align: center;
    border-radius: px2rem(26);
    background-color: #fff;

    &.round-sm {
      border-radius: px2rem(10);
    }

  }

  .weui-dialog__hd {
    margin-bottom: px2rem(-70);
    padding: px2rem(30 38);
  }

  .weui-dialog__bd {
    padding: px2rem(50 38);
    line-height: 1.5;
    word-break: break-all;
    word-wrap: break-word;
  }

  .weui-dialog__ft {
    display: flex;
    font-size: px2rem(34);
    line-height: px2rem(88);
  }

  .weui-dialog__btn {
    display: block;
    flex: 1;
    text-decoration: none;
    color: #007aff;
  }

  .weui-dialog__btn_default {
    color: #353535;
  }

  .weui-dialog__btn_primary {
    color: $primary;
  }

  .weui-dialog__close {
    position: absolute;
    top: px2rem(15);
    right: px2rem(15);
    line-height: 1;
    color: #999;
  }
</style>
