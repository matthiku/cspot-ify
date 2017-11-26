import Vue from 'vue'
import Vuex from 'vuex'

import * as moment from 'moment'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    upcomingPlans: [
      {
        id: 0,
        date: moment(),
        title: 'Sunday Service',
        info: 'info'
      }, {
        id: 1,
        date: moment(),
        title: 'Midweek Service',
        info: 'info'
      }
    ],
    user: {
      id: 123,
      name: 'Anton Berta',
      email: 'x@yps.com'
    }
  },

  mutations: {},

  actions: {},

  getters: {
    upcomingPlans (state) {
      return state.upcomingPlans
    },
    singlePlan (state) {
      return (planId) => {
        state.upcomingPlans.find((plan) => {
          return plan.id === planId
        })
      }
    }
  }
})
