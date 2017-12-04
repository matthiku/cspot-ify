import Vue from 'vue'
import Vuex from 'vuex'
import * as moment from 'moment'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    plans: [
      { id: 0, date: moment().isoWeekday(-2), typeId: 1, title: 'Midweek Service', staff: [{ id: 1, role: 'leader' }], info: 'info' },
      { id: 1, date: moment().isoWeekday(-7), typeId: 0, title: 'Sunday Service', staff: [{ id: 1, role: 'leader' }, { id: 0, role: 'teacher' }], info: 'info' },
      { id: 2, date: moment().isoWeekday(2), typeId: 1, title: 'Midweek Service', staff: [{ id: 1, role: 'leader' }], info: 'info' },
      { id: 3, date: moment().isoWeekday(7), typeId: 0, title: 'Sunday Service', staff: [{ id: 1, role: 'leader' }, { id: 0, role: 'teacher' }], info: 'info' }
    ],
    user: {
      id: 1234,
      registeredPlans: {}
    }
  },

  // Need to use mutations to change items within the state
  mutations: {
    createPlan (state, payload) {
      state.plans.push(payload)
    }
  },

  // Actions are being used to perform async tasks and then call the mutations accordingly
  actions: {
    createPlan ({commit}, payload) {
      console.log(payload)
      // TODO: reach out to our DB and store it
      // the database call will get us an id, which we need to add a new plan to the store
      let plan = Object.assign(payload, {id: 9})
      commit('createPlan', plan)
    }
  },

  // getters give us access to the data within the state (or the items/objects etc)
  getters: {
    plans (state) {
      // return all plans ordered by date
      return state.plans.sort((planA, planB) => {
        return planA.date > planB.date
      })
    },
    nextSunday (state) {
      return state.plans.find((plan) => {
        return moment(plan.date).isSame(moment().isoWeekday(7), 'day') && plan.typeId === 0
      })
    },
    futurePlans (state, getters) {
      // return only future plans (ordered by date)
      return getters.plans.filter((plan) => {
        return plan.date >= Date.now()
      })
    },
    plan (state) {
      return (planId) => {
        return state.plans.find((plan) => {
          return plan.id === planId
        })
      }
    }
  }
})
