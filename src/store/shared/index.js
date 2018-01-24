export default {
  state: {
    appName: 'c-SPOT-ify',
    loading: false,
    message: '',
    error: '',
    search: { filter: '' },
    dialogShow: false,
    dialog: { field: '', item: null, updated: false },
    admin: { selectedTab: '' },
    // object to save the status of pages (open or closed drawers for instance)
    pageStatus: {}
  },

  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setMessage (state, payload) {
      setTimeout(() => {
        state.message = ''
      }, 9000)
      state.message = payload
    },
    appendMessage (state, payload) {
      setTimeout(() => {
        state.message = ''
      }, 9000)
      state.message = (state.message ? state.message + ' - ' : '') + payload
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
      state.error = ''
    },
    clearMessage (state) {
      state.message = ''
    }
  },

  actions: {
    loadAllItems ({rootState, dispatch}) {
      if (!rootState.user.user) {
        console.log('user not signed in')
        return
      }
      console.log('dispatching all get actions', rootState)
      if (!rootState.user.users) {
        console.log('getting users') // object
        dispatch('refreshUsers')
      }
      if (!rootState.role.roles || rootState.role.roles.length === 0) {
        console.log('getting roles') // object
        dispatch('refreshRoles')
      }
      if (!rootState.type.types || rootState.type.types.length === 0) {
        console.log('getting types') // array
        dispatch('refreshTypes')
      }
      if (!rootState.song.songs) {
        console.log('getting songs') // array
        dispatch('refreshSongs')
      }
      if (!rootState.plan.plans) {
        console.log('getting plans') // array
        dispatch('refreshPlans')
      }
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    clearMessage ({ commit }) {
      commit('clearMessage')
    },
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    appendMessage ({ commit }, payload) {
      commit('appendMessage', payload)
    },
    setDialog ({ commit }, payload) {
      commit('setDialog', payload)
    },
    hideDialog ({ commit }) {
      commit('hideDialog')
    },
    showDialog ({ commit }) {
      commit('showDialog')
    },
    errorHandling ({ commit }, payload) {
      let text = payload
      // show typical attributes of error messages if available
      if (text.message) text = text.message
      if (text.code) text = text.code
      commit('setError', text)
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
    search (state) {
      return state.search
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
    },
    pageStatus (state) {
      return state.pageStatus
    }
  }
}
