<template>
  <div class="ui-image" v-show="show">
    <ui-dialog v-show="true">
      <img :src="image" @click="onClose">
    </ui-dialog>
  </div>
</template>

<script>
  import UiDialog from 'components/ui/Dialog.vue'

  export default {
    name: 'ui-image',

    props: {
      show: {
        type: Boolean,
        default: false,
      },

      image: {
        type: String,
        default: '',
      },
    },

    components: {
      UiDialog,
    },

    methods: {
      onClose () {
        this.show = false
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .ui-image {
    .weui-dialog {
      overflow: auto;
      width: 95%;
      max-height: 95%;
      border-radius: 0;
      background: none;
    }

    img {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
