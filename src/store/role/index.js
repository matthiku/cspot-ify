import { rolesRef } from '../../firebaseApp'

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
    },
    updateRole ({ commit, state }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj[payload.field] = payload.value
      rolesRef.child(payload.id).update(updateObj)
    }

  },
  getters: {
    roles (state) {
      return state.roles
    }
  }
}
