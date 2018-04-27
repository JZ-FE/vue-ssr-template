<template>
  <div class="news-view">
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="linkTo(`${type}/${page - 1}`)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="linkTo(`${type}/${page + 1}`)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
    <transition :name="transition">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
  import index from './index'

  export default index
</script>

<style lang="scss">
  @import "./index";
</style>
