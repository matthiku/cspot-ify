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

  function refreshAllItems () {
    if (!store.users) store.dispatch('refreshUsers')
    if (!store.roles) store.dispatch('refreshRoles')
    if (!store.types) store.dispatch('refreshTypes')
    if (!store.plans) store.dispatch('refreshPlans')
  }
  setTimeout(() => {
    // check if the initial loading (see below) had been successful
    refreshAllItems
  }, 2000)

  // sync with existing PLANS from firebase
  plansRef.on('value', snap => {
    // console.log('plans DB was modified!')
    store.dispatch('loadPlans', snap)
  })

  // sync with TYPES table
  typesRef.on('value', snap => {
    if (!snap) {
      console.log('error when trying to fetch types table!')
    }
    store.dispatch('loadTypes', snap)
  })

  // sync with ROLES table
  rolesRef.on('value', snap => {
    store.dispatch('loadRoles', snap)
  })

  // sync with USERS table
  usersRef.on('value', snap => {
    store.dispatch('loadUsers', snap)
  })
}
