import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import * as filters from 'helpers/filters'
import 'helpers/directives'
import Utils from 'utils'

import Meta from 'vue-meta'
import Cookie from 'vue-cookie'
import Global from 'plugins/global'
import Seo from 'plugins/seo'

import Toast from 'plugins/toast'
import Alert from 'plugins/alert'
import Share from 'plugins/share'
import Image from 'plugins/image'

import App from './App.vue'
import createStore from './store'
import createRouter from './router'

Vue.use(Meta)
Vue.use(Cookie)
Vue.use(Global)
Vue.use(Seo)

if (Utils.isWin()) {
  Vue.use(Toast)
  Vue.use(Alert)
  Vue.use(Share)
  Vue.use(Image)
}

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export default function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  // Utils initialize
  Utils.init(app, store)

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
