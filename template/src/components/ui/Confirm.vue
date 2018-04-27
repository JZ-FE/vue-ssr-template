<template>
  <div class="ui-confirm">
    <ui-dialog v-show="isShow" @btnClose="onClose">
      <div class="weui-dialog__hd" v-show="title"><strong class="weui-dialog__title">{{ title }}</strong></div>
      <div class="weui-dialog__bd"><slot></slot></div>
      <div class="weui-dialog__ft line-top">
        <span class="weui-dialog__btn" @click="onCancel">{{ cancelText }}</span>
        <span class="weui-dialog__btn line-left" @click="onConfirm">{{ confirmText }}</span>
      </div>
    </ui-dialog>
  </div>
</template>

<script>
  import UiMask from 'components/ui/Mask.vue'
  import UiDialog from 'components/ui/Dialog.vue'

  export default {
    name: 'ui-confirm',

    props: {
      show: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
      },
      confirmText: {
        type: String,
        default: '确认',
      },
      cancelText: {
        type: String,
        default: '取消',
      },
    },

    components: {
      UiMask,
      UiDialog,
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
      isShow (val) {
        if (!val) this.$emit('confirmHide')
      },
    },

    methods: {
      onConfirm () {
        this.isShow = false
        this.$emit('btnConfirm')
      },

      onCancel () {
        this.isShow = false
        this.$emit('btnCancel')
      },

      onClose () {
        this.isShow = false
      },
    },

    beforeDestroy () {
      this.isShow = false
    },
  }
</script>

<style lang="scss">
  @import "~base";
</style>
