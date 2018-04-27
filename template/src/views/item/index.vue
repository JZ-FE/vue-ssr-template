<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <a :href="item.url" target="_blank">
          <h1>{{ item.title }}</h1>
        </a>
        <span v-if="item.url" class="host">
          ({{ item.url | host }})
        </span>
        <p class="meta">
          {{ item.score }} points
          | by <router-link :to="linkTo(`user/${item.by}`)">{{ item.by }}</router-link>
          {{ item.time | timeAgo }} ago
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ item.kids ? item.descendants + ' comments' : 'No comments yet.' }}
          <spinner :show="loading"></spinner>
        </p>
        <ul v-if="!loading" class="comment-children">
          <comment v-for="id in item.kids" :key="id" :id="id"></comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import index from './index'

  export default index
</script>

<style lang="scss">
  @import "./index";
</style>
