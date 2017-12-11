export default {

  computed: {
    user () {
      return this.$store.getters.user
    },
    users () {
      return this.$store.getters.users
    },
    error () {
      return this.$store.getters.error
    },
    message () {
      return this.$store.getters.message
    },
    loading () {
      return this.$store.getters.loading
    },
    roles () {
      return this.$store.getters.roles
    },
    userIsAdmin () {
      return this.$store.getters.userIsAdmin
    }
  },

  methods: {
    onDismissed (what) {
      this.$store.dispatch(what)
    }
  }
}
