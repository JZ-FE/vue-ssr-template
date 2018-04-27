import Item from 'components/Item.vue'

export default {
  name: 'list-view',

  components: {
    Item,
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems,
    }
  },

  computed: {
    type () {
      return this.$route.params.type
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    },
  },

  asyncData ({ store, route: { params: { type } } }) {
    return store.dispatch('FETCH_LIST_DATA', { type })
  },

  metaInfo () {
    return this.$seo('list', this.type)
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },

  beforeDestroy () {

  },

  watch: {
    type () {
      this.displayedItems = this.$store.getters.activeItems
    },
    page (to, from) {
      this.loadItems(to, from)
    },
  },

  methods: {
    loadItems (to, from) {
      this.$bar.start()
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type,
      }).then(() => {
        this.loadAfter(to, from)
        this.$bar.finish()
      })
    },

    loadAfter (to = this.page, from = -1) {
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`${this.linkTo(this.type)}/1`)
        return
      }
      /* eslint-disable no-nested-ternary */
      this.transition = from === -1
        ? null
        : to > from ? 'slide-left' : 'slide-right'
      this.displayedPage = to
      this.displayedItems = this.$store.getters.activeItems
    },
  },
}
