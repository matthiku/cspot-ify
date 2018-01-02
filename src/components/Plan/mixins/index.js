export default {
  computed: {
    types () {
      return this.$store.getters.types
    },
    songs () {
      return this.$store.getters.songs
    }
  },

  methods: {
    userOwnsPlan (plan) {
      if (!plan) return false

      // get plan from store and investigate the roles
      let user = this.$store.getters.user
      let check = false
      for (let rl in plan.staff) {
        let role = plan.staff[rl]
        if (role.userId === user.id) check = true
      }
      // an admin is always owner
      return this.$store.getters.userIsAdmin || check
    }
  }
}
