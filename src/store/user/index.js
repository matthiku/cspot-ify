import { firebaseApp, usersRef, rolesRef } from '../../firebaseApp'

export default {
  state: {
    oldRoute: null,
    users: null,
    user: null
  },

  mutations: {
    setOldRoute (state, payload) {
      state.oldRoute = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUserRole (state, payload) {
      state.user.roles.push(payload)
    },
    setUserRoles (state, payload) {
      state.user.roles = payload
    },
    setUsers (state, payload) {
      state.users = payload
    }
  },

  actions: {
    // called from startUpActions only!
    // Triggered by a change in the Auth state of firebase
    setUser ({commit, dispatch}, payload) {
      const userData = {
        id: payload.uid,
        email: payload.email,
        verified: payload.emailVerified,
        name: payload.displayName
      }
      commit('setUser', userData)
      dispatch('updateUser', userData)
    },

    // update our own user table with the firebase user data
    updateUser ({commit}, payload) {
      usersRef.child(payload.id).update(payload)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
        })
    },

    loadUsers ({commit}) {
      commit('setLoading', true)
      usersRef.once('value')
        .then((data) => {
          const values = data.val()
          commit('setUsers', values)
        })
        .catch((error) => {
          commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        })
    },

    fetchUserData ({commit}, payload) {
      if (!payload) { return }
      usersRef.child(payload.uid).once('value')
        .then((data) => {
          const values = data.val()
          if (values && values.roles) {
            commit('setUserRoles', values.roles)
          }
          commit('setLoading', false)
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

    signUserIn ({commit, state}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },

    signUserUp ({commit, dispatch}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = { id: user.uid }
          usersRef.once('value').then((data) => {
            if (!data.val()) {
              console.log('We have the first user and she/he will become Admin!')
              newUser.roles = ['admin']
            } else {
              newUser.roles = ['user']
              console.log('new user signed up!', newUser)
            }
            // add new user to our own users table
            usersRef.child(newUser.id).set(newUser)
              .then(() => {
                rolesRef.child(newUser.roles[0]).push(newUser.id)
                  .then(() => {
                    dispatch('loadUsers')
                    commit('setLoading', false)
                  })
                  .catch((error) => {
                    commit('setError', error)
                    console.log(error)
                    commit('setLoading', false)
                  })
              }).catch((error) => {
                commit('setError', error)
                console.log(error)
                commit('setLoading', false)
              })
          }).catch((error) => {
            commit('setError', error)
            console.log(error)
            commit('setLoading', false)
          })
        })
        .catch((error) => {
          commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        })
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
    },
    users (state) {
      return state.users
    },
    userIsAdmin (state) {
      if (!state.user || !state.users || !state.users[state.user.id] || !state.users[state.user.id].roles) { return false }
      return state.users[state.user.id].roles.indexOf('admin') > -1
    }
  }
}
