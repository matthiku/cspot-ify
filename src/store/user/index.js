import { firebaseApp, usersRef } from '../../firebaseApp'

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
      const userData = {
        id: payload.uid,
        email: payload.email,
        verified: payload.emailVerified,
        name: payload.displayName
      }
      commit('setUser', userData)
    },

    fetchUserData ({commit}, payload) {
      usersRef.child(payload.uid).once('value')
        .then((data) => {
          const values = data.val()
          console.log(values)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
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
