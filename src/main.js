import Vue from 'vue'
import Vuetify from 'vuetify'

// use customized styling
import './stylus/main.styl'

// Main application objects
import App from './App'
import router from './router'
import { store } from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false

import * as dateFilters from './filters/date'
Vue.filter('date', dateFilters.date)
Vue.filter('dateShort', dateFilters.dateShort)

// register the generic components
import sharedComponents from './sharedComponents'
sharedComponents()

import startUpActions from './startUpActions'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    startUpActions(store, router)
  }
})
