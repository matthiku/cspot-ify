export default {
  computed: {
    userOwnsPlan (id) {
      return this.$store.getters.userIsAdmin
    }
  }
}
