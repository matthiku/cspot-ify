import { rolesRef, binRef } from '../../firebaseApp'

export default {
  state: {
    roles: []
  },

  mutations: {
    setRoles (state, payload) {
      state.roles = payload
    },
    addDummyRole (state, payload) {
      state.roles[payload.id] = payload
    }
  },

  actions: {

    // load existing roles from the DB (called from startUpActions)
    loadRoles ({commit}, payload) {
      commit('setRoles', payload.val())
      commit('setLoading', false)
    },

    updateRole ({commit, state}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      // for a name change, we also need to change the id
      // which means creating a copy and deleting the old node
      if (payload.field === 'name') {
        Object.assign(updateObj, state.roles[payload.id])
        updateObj.id = payload.value
        rolesRef.child(payload.value).set(updateObj)
        return
      }
      updateObj[payload.field] = payload.value
      rolesRef.child(payload.id).update(updateObj)
        .then(() => {
          commit('setMessage', 'Role updated!')
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },

    addDummyRole ({commit}, payload) {
      // adding a local-only dummy role before it get's its proper name
      commit('addDummyRole', payload)
    },

    removeRole ({commit}, payload) {
      commit('setLoading', true)
      // first, move the old role to the bin
      binRef.child('roles/' + payload.name).set(payload)
        .then(() => {
          commit('setMessage', 'role moved into the bin...')
          rolesRef.child(payload.id).remove()
          .then(() => {
            commit('setMessage', 'role removed and placed in the bin!')
            commit('setLoading', false)
          })
          .catch((error) => {
            console.log(error)
            commit('setError', error)
            commit('setLoading', false)
          })
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    // update the users for a list of roles
    updateRolesUserList ({commit}, payload) {
      // get
    }
  },

  getters: {
    roles (state) {
      return state.roles
    }
  }
}
