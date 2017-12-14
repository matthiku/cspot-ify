import { typesRef } from '../../firebaseApp'

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
    refreshTypes ({ commit, dispatch }) {
      console.log(
        'updating local list of TYPES with full one-off snapshot from Server'
      )
      typesRef
        .once('value')
        .then(data => {
          commit('setTypes', data)
        })
        .catch(error => dispatch('errorHandling', error))
    },

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
