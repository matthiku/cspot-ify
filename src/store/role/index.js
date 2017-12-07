export default {
  state: {
    roles: []
  },
  mutations: {
    setRoles (state, payload) {
      state.roles = payload
    }
  },
  actions: {

    // load existing roles from the DB
    loadRoles ({ commit }, payload) {
      let roles = []
      // payload is a firebase data snapshot
      payload.forEach(role => {
        let item = role.val()
        item.id = role.key
        roles.push(item)
      })
      commit('setLoading', false)
      commit('setRoles', roles)
    }

  },
  getters: {
    roles (state) {
      return state.roles
    }
  }
}
