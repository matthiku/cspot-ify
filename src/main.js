import Vue from 'vue'
import Vuetify from 'vuetify'

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
  render: h => h(App)
})
