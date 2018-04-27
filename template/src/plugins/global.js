import Utils from 'utils'

export default {
  install (Vue) {
    Vue.prototype.linkTo = (url = '', prefix) => {
      const proj = Utils.getProject()
      const path = prefix || (proj ? `/${proj}/` : '/')

      return `${path}${url}`
    }
  },
}
