import Vue from 'vue'
import Vuetify from 'vuetify'

// external packages
import * as firebase from 'firebase'

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
    firebase.initializeApp({
      apiKey: 'AIzaSyDkBwk4y_0owfwnO5ojDvIYved6gOLzppc',
      authDomain: 'cspot-ify.firebaseapp.com',
      databaseURL: 'https://cspot-ify.firebaseio.com',
      projectId: 'cspot-ify',
      storageBucket: 'cspot-ify.appspot.com',
      messagingSenderId: '154842492597'
    })

    // check if a user is already logged on in the session
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('setUser', user)
      } else {
        router.replace('./signin')
        console.log('No user is signed in.')
      }
    })

    // load existing meetups from firebase
    store.dispatch('loadPlans')
  }
})
