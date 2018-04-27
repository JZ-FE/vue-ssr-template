import Vue from 'vue'

export const scrollBottom = Vue.directive('scroll-bottom', {
  update: (el) => {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight
    }, 1)
  },
})

export const wechatTitile = Vue.directive('wechat-title', {
  bind: () => {
    const ua = navigator.userAgent.toLowerCase()

    if ((/MicroMessenger/i).test(ua) && /iphone|ipad|ipod/.test(ua)) {
      const iframe = document.createElement('iframe')

      iframe.style.display = 'none'
      iframe.setAttribute('src', '/favicon.ico')

      const callback = setTimeout(() => {
        iframe.removeEventListener('load', callback)
        document.body.removeChild(iframe)
      }, 0)

      setTimeout(() => {
        iframe.addEventListener('load', callback)
        document.body.appendChild(iframe)
      }, 0)
    }
  },
})
