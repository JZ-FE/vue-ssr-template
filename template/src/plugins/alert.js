import UiAlert from 'components/ui/Alert.vue'

let $vm

export default {
  install (Vue) {
    const Alert = Vue.extend(UiAlert)

    if (!$vm) {
      $vm = new Alert({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const alert = {
      show (options) {
        if (typeof options === 'string') {
          $vm.content = options
        } else if (typeof options === 'object') {
          Object.keys(options).forEach((key) => {
            $vm[key] = options[key]
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
        alert,
      }
    } else {
      Vue.$ui.alert = alert
    }

    Vue.mixin({
      created () {
        this.$ui = Vue.$ui
      },
    })
  },
}
