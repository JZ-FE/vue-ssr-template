<template>
  {{#hackernews}}
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link :to="linkTo()" exact>
          <img class="logo" src="~public/logo.png" alt="logo">
        </router-link>
        <router-link :to="linkTo('top')">Top</router-link>
        <router-link :to="linkTo('new')">New</router-link>
        <router-link :to="linkTo('show')">Show</router-link>
        <router-link :to="linkTo('ask')">Ask</router-link>
        <router-link :to="linkTo('job')">Jobs</router-link>
        <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header>

    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>

    <loading/>
  </div>
  {{else}}
  <div id="app" class="app-wrap app-head">
    <transition name="fade" mode="out-in">
      <router-view class="app-view"></router-view>
    </transition>

    <loading/>
  </div>
  {{/hackernews}}
</template>

<script>
  import Loading from 'components/ui/Loading.vue'

  export default {
    components: {
      Loading,
    },

    data () {
      return {

      }
    },

    metaInfo () {
      return this.$seo()
    },

    beforeMount () {

    },

    mounted () {

    },
  }
</script>

<style lang="scss">
  @import "sass/app";
  {{#hackernews}}

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 15px;
    background-color: #f2f3f5;
    margin: 0;
    padding-top: 55px;
    overflow-y: scroll
  }

  a,
  body {
    color: #34495e
  }

  a {
    text-decoration: none
  }

  .header {
    background-color: #f60;
    position: fixed;
    z-index: 999;
    height: 55px;
    top: 0;
    left: 0;
    right: 0
  }

  .header .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 15px 5px
  }

  .header a {
    color: hsla(0, 0%, 100%, .8);
    line-height: 24px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: .075em;
    margin-right: 1.8em
  }

  .header a:hover {
    color: #fff
  }

  .header a.router-link-active {
    color: #fff;
    font-weight: 400
  }

  .header a:nth-child(6) {
    margin-right: 0
  }

  .header .github {
    color: #fff;
    font-size: .9em;
    margin: 0;
    float: right
  }

  .logo {
    width: 24px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle
  }

  .view {
    max-width: 800px;
    margin: 0 auto;
    position: relative
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  @media (max-width: 860px) {
    .header .inner {
      padding: 15px 30px
    }

  }

  @media (max-width: 600px) {
    .header .inner {
      padding: 15px
    }

    .header a {
      margin-right: 1em
    }

    .header .github {
      display: none
    }

  }
  {{/hackernews}}
</style>
