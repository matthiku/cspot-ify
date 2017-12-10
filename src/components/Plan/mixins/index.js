export default {
  methods: {
    userOwnsPlan (plan) {
      if (!plan) return false

      // get plan from store and investigate the roles
      let user = this.$store.getters.user
      let check = false
      for (let role in plan.staff) {
        if (role.id === user.id) check = true
      }
      // an admin is always owner
      return this.$store.getters.userIsAdmin || check
    }
  }
}
