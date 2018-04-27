export default {
  name: 'user-view',

  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    },
  },

  asyncData ({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_USER', { id })
  },

  metaInfo () {
    return this.$seo('user', this.user ? this.user.id : 'User not found')
  },
}
