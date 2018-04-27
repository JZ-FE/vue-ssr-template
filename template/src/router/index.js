import Vue from 'vue'
import Router from 'vue-router'

{{#hackernews}}
const ListView = () => import('../views/list/index.vue')
const ItemView = () => import('../views/item/index.vue')
const UserView = () => import('../views/user/index.vue')
{{else}}
const HomeView = () => import('../views/home/index.vue')
{{/hackernews}}

Vue.use(Router)

const routes = [
  {{#hackernews}}
  { path: '/item/:id(\\d+)', component: ItemView },
  { path: '/user/:id', component: UserView },
  { path: '/:type/:page(\\d+)?', component: ListView },
  { path: '/', redirect: '/top' },
  {{else}}
  { path: '/home', component: HomeView },
  { path: '/', redirect: '/home' },
  {{/hackernews}}
]

routes.forEach((item) => {
  const { meta } = item
  let { path } = item
  let baseDir = '/{{ name }}'

  if (meta && meta.project) {
    baseDir = `/${meta.project}`
  }

  if (path === '/home') {
    path = `${baseDir}/`
  } else if (path === '/' && item.redirect) {
    {{#hackernews}}
    item.redirect = `${baseDir + item.redirect}/`
    {{else}}
    item.redirect = `${baseDir}/`
    {{/hackernews}}
  } else {
    path = `${baseDir + path}`
  }

  item.path = path
})

export default function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes,
  })
}
