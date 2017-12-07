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

    // load existing plans from the DB
    loadTypes ({ commit }, payload) {
      let types = []
      // payload is a firebase data snapshot
      payload.forEach(plan => {
        let pl = plan.val()
        pl.id = plan.key
        types.push(pl)
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
