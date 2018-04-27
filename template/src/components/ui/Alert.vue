<template>
  <div class="ui-alert" v-show="show">
    <ui-dialog v-show="true" :close="close" @btnClose="onClose">
      <div class="weui-dialog__hd" v-show="title"><strong class="weui-dialog__title">{{ title }}</strong></div>
      <div class="weui-dialog__bd" v-if="content" v-html="content"></div>
      <div class="weui-dialog__bd" v-else><slot></slot></div>
      <div class="weui-dialog__ft line-top">
        <span class="weui-dialog__btn" v-show="cancel" @click="onClose">{{ cancelText }}</span>
        <span class="weui-dialog__btn line-left" @click="onConfirm">{{ confirmText }}</span>
      </div>
    </ui-dialog>
  </div>
</template>

<script>
  import UiDialog from 'components/ui/Dialog.vue'

  export default {
    name: 'ui-alert',

    props: {
      show: {
        type: Boolean,
        default: false,
      },
      close: {
        type: Boolean,
        default: false,
      },
      cancel: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
      },
      content: {
        type: String,
      },
      cancelText: {
        type: String,
        default: '取消',
      },
      confirmText: {
        type: String,
        default: '确定',
      },
    },

    components: {
      UiDialog,
    },

    methods: {
      onConfirm () {
        this.show = false
        if (this.btnConfirm) this.btnConfirm()
      },

      onClose () {
        this.show = false
        if (this.btnCancel) this.btnCancel()
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .ui-alert {
    .weui-dialog {
      font-size: px2rem(32);
    }
  }
</style>
