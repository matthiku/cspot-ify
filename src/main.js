import Vue from 'vue'
import Vuetify from 'vuetify'

// external packages
import { firebaseApp, plansRef } from './firebaseApp'

// use customized styling
import './stylus/main.styl'

// Main application objects
import App from './App'
import router from './router'
import { store } from './store'

import DateFilter from './filters/date'

import AlertCmp from './components/shared/Alert.vue'
Vue.component('app-alert', AlertCmp)

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
    // check if a user is already logged on in the session
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('setUser', user)
      } else {
        router.replace('./signin')
        console.log('No user is signed in.')
      }
    })

    // sync with  existing plans from firebase
    plansRef.on('value', snap => {
      store.dispatch('loadPlans', snap)
    })
  }
})
