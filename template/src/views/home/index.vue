<template>
  <div class="home-view flex-box flex-column">
    <app-header title="首页" :logo="true" :back="false"></app-header>

    <div class="container flex-item flex-box flex-column">
      <div class="flex-item flex-box flex-middle">
        这里是内容^_^
      </div>

      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
  import index from './index'

  export default index
</script>

<style lang="scss">
  @import "./index";
</style>
