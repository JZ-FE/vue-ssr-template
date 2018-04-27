import Spinner from 'components/Spinner.vue'
import Comment from 'components/Comment.vue'

// recursively fetch all descendent comments
/* eslint-disable arrow-body-style */
function fetchComments (store, item) {
  if (item && item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids,
    }).then(() => Promise.all(item.kids.map((id) => {
      return fetchComments(store, store.state.items[id])
    })))
  }
  return Promise.resolve()
}

export default {
  name: 'item-view',
  components: { Spinner, Comment },

  data: () => ({
    loading: true,
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    },
  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData ({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_ITEMS', { ids: [id] })
  },

  metaInfo () {
    return this.$seo('item', this.item.title)
  },

  // Fetch comments when mounted on the client
  beforeMount () {
    this.fetchComments()
  },

  // refetch comments if item changed
  watch: {
    item: 'fetchComments',
  },

  methods: {
    fetchComments () {
      this.loading = true
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false
      })
    },
  },
}
