import axios from 'axios'
import Utils from 'utils'

export default function createAPI (config = {}) {
  let options = config

  if (Utils._.isString(options)) options = { url: options }

  const defaults = {
    method: 'get',
    {{#hackernews}}
    baseURL: 'https://hacker-news.firebaseio.com/v0/',
    {{else}}
    baseURL: '',
    {{/hackernews}}
    headers: {

    },
    params: {

    },
    timeout: 10000,
    loading: true,
    retData: false,
    showAlert: true,
    validateStatus: null,
  }

  options = Utils._.assign(defaults, options)

  const { store } = Utils.init()
  const state = store ? store.state : {}

  if (options.loading) {
    state.loading = true
  }

  const isPost = options.method === 'post'
  if (isPost) state.submitting = true

  const start = Date.now()

  return axios(options).then((res) => {
    const { status, data } = res

    state.loading = false
    state.submitting = false

    if (status === 500) {
      Utils.uiAlert('网络错误')
      return []
    }
    if (!data) {
      Utils.uiAlert('数据异常')
      return []
    }

    console.log(`[API]"${options.url}": ${Date.now() - start}ms`) // eslint-disable-line

    const { code, msg, response } = data

    if (options.retData) return data

    if (isPost) Utils.uiToast(msg)

    if (code === 1) {
      return response
    } else if (options.showAlert) {
      Utils.uiAlert(msg)
    }

    return []
  }).catch((error) => {
    state.loading = false
    state.submitting = false

    const err = String(error)
    if (err.indexOf('timeout') > 0) {
      Utils.uiAlert('请求超时')
    }

    console.log(error) // eslint-disable-line
    return []
  })
}
