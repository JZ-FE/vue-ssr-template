import Utils from 'utils'

export default {
  install (Vue) {
    Vue.prototype.linkTo = function linkTo (url = '', prefix = `/${Utils.getProject()}/`) {
      return `${prefix}${url}`
    }
  },
}
