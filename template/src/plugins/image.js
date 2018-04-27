import UiImage from 'components/ui/Image.vue'

let $vm

export default {
  install (Vue) {
    const Images = Vue.extend(UiImage)

    if (!$vm) {
      $vm = new Images({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const image = {
      show (options) {
        if (typeof options === 'string') {
          $vm.image = options
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
        image,
      }
    } else {
      Vue.$ui.image = image
    }

    Vue.mixin({
      created () {
        this.$ui = Vue.$ui
      },
    })
  },
}
