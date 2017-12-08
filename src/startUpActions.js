import { firebaseApp, plansRef, typesRef, rolesRef, usersRef } from './firebaseApp'

export default function startUpActions (store, router) {
  // run actions at the start of the App

  // check if a user is already logged on in the browser session
  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch('setUser', user)
      store.dispatch('fetchUserData', user)
    } else {
      let from = store.getters.oldRoute
      if (from && from !== 'signin' && from !== 'home') {
        from = '?from=' + from
      } else {
        from = false
      }
      // router.replace('./signin' + from ? from : '')
      router.replace('/signin')
      console.log('No user is signed in. FROM: ', from)
    }
  })

  // sync with existing plans from firebase
  plansRef.on('value', snap => {
    store.dispatch('loadPlans', snap)
  })

  // sync with types table
  typesRef.on('value', snap => {
    if (!snap) {
      console.log('error when trying to fetch types table!')
    }
    store.dispatch('loadTypes', snap)
  })

  // sync with roles table
  rolesRef.on('value', snap => {
    store.dispatch('loadRoles', snap)
  })

  // sync with roles table
  usersRef.on('value', snap => {
    store.dispatch('loadUsers', snap)
  })
}
