import Vue from 'vue'
import Vuetify from 'vuetify'

// external packages
import { firebaseApp, plansRef, typesRef, rolesRef } from './firebaseApp'

// use customized styling
import './stylus/main.styl'

// Main application objects
import App from './App'
import router from './router'
import { store } from './store'

import DateFilter from './filters/date'

import AlertCmp from './components/shared/Alert.vue'
import SuccessCmp from './components/shared/Success.vue'
import EditPlanDateDialog from './components/Plan/Edit/EditPlanDateDialog'
import DeletePlanDialog from './components/Plan/Edit/DeletePlanDialog'
Vue.component('app-alert', AlertCmp)
Vue.component('app-success', SuccessCmp)
Vue.component('app-edit-plan-date-dialog', EditPlanDateDialog)
Vue.component('app-delete-plan-dialog', DeletePlanDialog)

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    // check if a user is already logged on in the browser session
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('setUser', user)
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
      store.dispatch('loadTypes', snap)
    })

    // sync with roles table
    rolesRef.on('value', snap => {
      store.dispatch('loadRoles', snap)
    })
  }
})
