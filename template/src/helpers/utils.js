import _ from 'lodash'

let app
let store

export default {
  _,

  // Initialize
  init (a, s) {
    if (a) app = a
    if (s) store = s

    return { app, store }
  },

  // Window userAgent
  UA () {
    return this.isWin() && window.navigator.userAgent
  },

  // Checks if in Client
  isWin () {
    return typeof window !== 'undefined'
  },

  // Checks if in the APP
  isAPP () {
    return this.isWin() && /n8Web/i.test(this.UA())
  },

  // Checks if in the IOS
  isIOS () {
    return this.isWin() && /iphone|ipad|ipod/i.test(this.UA())
  },

  // Checks if in the Android
  isAndroid () {
    return this.isWin() && /android/i.test(this.UA())
  },

  // Checks if in the Weixin
  isWeixin () {
    return this.isWin() && /MicroMessenger/i.test(this.UA())
  },

  // Checks if in the Mobile
  isMobile () {
    return this.isWin() && /iPhone|iPad|iPod|Android|Windows Phone/.test(this.UA())
  },

  // Checks if in the PC
  isPC () {
    return this.isWin() && !this.isMobile()
  },

  // Checks if in the H5
  isH5 () {
    return this.isWin() && !this.isAPP()
  },

  // Alert in Client or Console in Server
  alert (msg) {
    if (!msg) return

    if (this.isWin()) {
      alert(msg) // eslint-disable-line
    } else {
      console.log(msg) // eslint-disable-line
    }
  },

  // UI Alert
  uiAlert (msg) {
    if (!msg) return

    if (this.isWin()) {
      app.$ui.alert.show(msg)
    } else {
      console.log(msg) // eslint-disable-line
    }
  },

  // UI Toast
  uiToast (msg) {
    if (!msg) return

    if (this.isWin()) {
      app.$ui.toast.show(msg)
    } else {
      console.log(msg) // eslint-disable-line
    }
  },

  // UI Image
  uiImage (event) {
    const { target } = event
    const tagName = target.tagName.toLowerCase()
    const imageSrc = target.src

    if (tagName === 'img' && imageSrc) {
      const [imageUrl] = imageSrc.split('?')
      app.$ui.image.show(imageUrl)
    }
  },

  // Get URL param
  getUrlParam (name) {
    const regex = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const match = window.location.search.substr(1).match(regex)

    if (match != null) return unescape(decodeURI(match[2]))
    return null
  },

  // Get Project
  getProject (type) {
    const { state } = store
    const route = _.isObject(type) ? type : app.$route
    const meta = route.meta || {}
    const proj = meta.project || '{{ name }}'
    const data = {}

    if (type === 'name') {
      return data[proj]
    }

    if (type) {
      state.project = proj
    }

    return state.project || proj
  },
}
