// import { typesRef } from '../../firebaseApp'

export default {
  state: {
    types: []
  },
  mutations: {
    setTypes (state, payload) {
      state.types = payload
    }
  },
  actions: {

    // load existing types from the DB
    loadTypes ({ commit }, payload) {
      let types = []
      // payload is a firebase data snapshot
      payload.forEach(type => {
        let item = type.val()
        item.id = type.key
        types.push(item)
      })
      commit('setLoading', false)
      commit('setTypes', types)
    }

  },
  getters: {
    types (state) {
      return state.types
    }
  }
}
