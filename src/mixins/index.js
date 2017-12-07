export default {

  computed: {
    user () {
      return this.$store.getters.user
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
    types () {
      return this.$store.getters.types
    }
  },

  methods: {
    onDismissed (what) {
      this.$store.dispatch(what)
    }
  }
}
