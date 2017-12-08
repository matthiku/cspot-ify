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
      commit('setRoles', payload.val())
      commit('setLoading', false)
    }

  },
  getters: {
    roles (state) {
      return state.roles
    }
  }
}
