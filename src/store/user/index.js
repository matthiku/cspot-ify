import { firebaseApp } from '../../firebaseApp'

export default {
  state: {
    oldRoute: null,
    user: null
  },

  mutations: {
    setOldRoute (state, payload) {
      state.oldRoute = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    setUser ({commit, state}, payload) {
      const userData = { id: payload.uid }
      commit('setUser', userData)
      console.log(state.oldRoute)
      if (payload && state.oldRoute) {
        console.log('navigating to ', state.oldRoute)
        this.$route.push({name: state.oldRoute})
      }
    },
    signUserOut ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().signOut()
        .then(() => {
          // Sign-out successful.
          commit('setLoading', false)
          commit('setUser', null)
        }).catch((error) => {
          commit('setError', error)
          commit('setLoading', false)
          // An error happened.
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    setOldRoute ({commit}, payload) {
      commit('setOldRoute', payload)
    }
  },

  getters: {
    oldRoute (state) {
      return state.oldRoute
    },
    user (state) {
      return state.user
    }
  }
}
