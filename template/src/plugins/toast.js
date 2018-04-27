import UiToast from 'components/ui/Toast.vue'

let $vm
let watcher

export default {
  install (Vue) {
    const Toast = Vue.extend(UiToast)

    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const toast = {
      show (options) {
        if (typeof watcher === 'function') watcher()

        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          Object.keys(options).forEach((key) => {
            $vm[key] = options[key]
          })
        }

        if (typeof options === 'object' && (options.onShow || options.onHide)) {
          watcher = $vm.$watch('show', (val) => {
            if (val && options.onShow) options.onShow($vm)
            if (val === false && options.onHide) options.onHide($vm)
          })
        }

        $vm.show = true
      },

      hide () {
        $vm.show = false
      },
    }

    if (!Vue.$ui) {
      Vue.$ui = {
        toast,
      }
    } else {
      Vue.$ui.toast = toast
    }

    Vue.mixin({
      created () {
        this.$ui = Vue.$ui
      },
    })
  },
}
