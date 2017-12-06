export default {

  state: {
    loading: false,
    message: null,
    error: null
  },

  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearError (state) {
      state.error = null
    },
    clearMessage (state) {
      state.message = null
    }
  },

  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    clearMessage ({commit}) {
      commit('clearMessage')
    },
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setMessage ({commit}, payload) {
      commit('setMessage', payload)
    }
  },

  getters: {
    error (state) {
      return state.error
    },
    message (state) {
      return state.message
    },
    loading (state) {
      return state.loading
    }
  }
}
