import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'
import AppBanner from 'components/AppBanner.vue'

export default {
  name: 'home-view',

  components: {
    AppHeader,
    AppFooter,
    AppBanner,
  },

  data () {
    return {

    }
  },

  computed: {

  },

  // asyncData ({ store }) {
  // return Promise.all([store.dispatch('FETCH_HOME'), store.dispatch('FETCH_STOCK')])
  // },

  metaInfo () {
    return this.$seo('home')
  },

  beforeMount () {

  },

  methods: {

  },
}
