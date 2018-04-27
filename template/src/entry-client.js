import Vue from 'vue'
import 'es6-promise/auto'
import createApp from './app'
import Utils from 'utils'
import ProgressBar from 'components/ProgressBar.vue'

// global progress bar
const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next)
    } else {
      next()
    }
  },
})

const { app, router, store } = createApp()
const { location } = window

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      diffed = diffed || prevMatched[i] !== c
      return diffed
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    const prevProject = Utils.getProject()

    Utils.getProject(to)

    if (!asyncDataHooks.length) {
      if (prevProject !== Utils.getProject()) location.reload()

      return next()
    }
    bar.start()
    return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/{{ name }}/service-worker.js')
}
