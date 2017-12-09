import firebase from 'firebase'
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
    // contains data from the Firebase Auth DB, not our own!
    setUser ({ commit, dispatch }, payload) {
      const userData = {
        id: payload.uid,
        email: payload.email,
        verified: payload.emailVerified,
        name: payload.displayName,
        providerData: payload.providerData
      }
      commit('setUser', userData)
      dispatch('updateUser', userData)
    },

    // update our own user table with the firebase user data
    updateUser ({ commit }, payload) {
      usersRef
        .child(payload.id)
        .update(payload)
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },

    updateUserProfile ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      firebaseApp
        .auth()
        .currentUser.updateProfile({
          displayName: payload.name
        })
        .then(
          () => {
            dispatch('updateUser', payload)
            commit('setMessage', 'User data updated')
            commit('setLoading', false)
          },
          error => {
            console.log(error)
          }
        )
    },

    loadUsers ({ commit }) {
      commit('setLoading', true)
      usersRef
        .once('value')
        .then(data => {
          const values = data.val()
          commit('setUsers', values)
        })
        .catch(error => {
          commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        })
    },

    fetchUserData ({ commit }, payload) {
      if (!payload) {
        return
      }
      usersRef
        .child(payload.uid)
        .once('value')
        .then(data => {
          const values = data.val()
          if (values && values.roles) {
            commit('setUserRoles', values.roles)
          }
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },

    signUserOut ({ commit }) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          commit('setLoading', false)
          commit('setUser', null)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
          // An error happened.
          console.log(error)
        })
    },

    signUserIn ({ commit, state }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },

    sendEmailVerification ({ commit }) {
      let user = firebaseApp.auth().currentUser
      if (!user) return
      user
        .sendEmailVerification()
        .then(() => {
          commit('setMessage', 'Email verification email has been sent.')
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },

    singinViaProvider ({ commit }, provider) {
      if (provider === 'google') {
        provider = new firebase.auth.GoogleAuthProvider()
        firebaseApp
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken
            // The signed-in user info.
            var user = result.user
            console.log(user)
            // ...
          })
          .catch((error) => {
            console.log(error)
            // Handle Errors here.
            // var errorCode = error.code
            var errorMessage = error.message
            commit('setError', errorMessage)
            // The email of the user's account used.
            // var email = error.email
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential
            // ...
          })
      }
    },

    signUserUp ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = { id: user.uid }
          usersRef
            .once('value')
            .then(data => {
              if (!data.val()) {
                console.log(
                  'We have the first user and she/he will become Admin!'
                )
                newUser.roles = ['admin']
              } else {
                newUser.roles = ['user']
                console.log('new user signed up!', newUser)
              }
              // add new user to our own users table
              usersRef
                .child(newUser.id)
                .set(newUser)
                .then(() => {
                  rolesRef
                    .child(newUser.roles[0])
                    .push(newUser.id)
                    .then(() => {
                      dispatch('loadUsers')
                      commit('setLoading', false)
                    })
                    .catch(error => {
                      commit('setError', error)
                      console.log(error)
                      commit('setLoading', false)
                    })
                })
                .catch(error => {
                  commit('setError', error)
                  console.log(error)
                  commit('setLoading', false)
                })
            })
            .catch(error => {
              commit('setError', error)
              console.log(error)
              commit('setLoading', false)
            })
        })
        .catch(error => {
          commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        })
    },

    setOldRoute ({ commit }, payload) {
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
      if (
        !state.user ||
        !state.users ||
        !state.users[state.user.id] ||
        !state.users[state.user.id].roles
      ) {
        return false
      }
      return state.users[state.user.id].roles.indexOf('admin') > -1
    }
  }
}
