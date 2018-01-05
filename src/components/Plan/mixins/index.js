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
    },

    findRoleInStaff (requestedRole, staff) {
      // loop through the staff list (an object) and find the requested role
      let user = { name: 'pending', id: null }
      Object.entries(staff).forEach(
        ([key, role]) => {
          if (role.role === requestedRole) user.id = role.userId
        }
      )
      return (this.users && user.id && this.users[user.id]) ? this.users[user.id] : user
    }
  }
}
