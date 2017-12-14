export default {

  state: {
    appName: 'c-SPOT-ify',
    loading: false,
    message: null,
    error: null,
    dialogShow: false,
    dialog: {field: '', item: null, updated: false},
    admin: {
      selectedTab: 'tab-0'
    }
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
    setDialog (state, payload) {
      state.dialog = payload
    },
    hideDialog (state) {
      state.dialogShow = false
    },
    showDialog (state) {
      state.dialogShow = true
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
    },
    setDialog ({commit}, payload) {
      commit('setDialog', payload)
    },
    hideDialog ({commit}) {
      commit('hideDialog')
    },
    showDialog ({commit}) {
      commit('showDialog')
    },
    errorHandling ({commit}, payload) {
      commit('setError', payload)
      console.log(payload)
      commit('setLoading', false)
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
    },
    appName (state) {
      return state.appName
    },
    dialog (state) {
      return state.dialog
    },
    dialogShow (state) {
      return state.dialogShow
    },
    admin (state) {
      return state.admin
    }
  }
}
