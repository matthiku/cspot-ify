import { plansRef } from '../../firebaseApp'
import * as moment from 'moment'

export default {
  state: {
    plans: [],
    newPlanId: null
  },

  // M U T A T I O N S
  mutations: {

    setPlans (state, payload) {
      state.plans = payload
    },

    createPlan (state, payload) {
      state.plans.push(payload)
      state.newPlanId = payload.id
    }
  },

  // A C T I O N S
  actions: {

    // load existing plans from the DB
    loadPlans ({ commit }, payload) {
      let plans = []
      // payload is a firebase data snapshot
      payload.forEach(plan => {
        let pl = plan.val()
        pl.id = plan.key
        plans.push(pl)
      })
      commit('setLoading', false)
      commit('setPlans', plans)
    },

    createPlan ({ commit }, payload) {
      // TODO: reach out to our DB and store it
      plansRef.push(payload)
        .then(data => {
          // the database call will get us an id, which we need to add a new plan to the store
          commit('createPlan', Object.assign(payload, {id: data.key}))
          // commit('createPlan', { ...payload, id: data.key })
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        })
    }
  },

  // G E T T E R S
  getters: {

    newPlanId (state) {
      return state.newPlanId
    },

    plans (state) {
      // return all plans ordered by date
      return state.plans.sort((planA, planB) => {
        return planA.date > planB.date
      })
    },

    nextSunday (state) {
      return state.plans.find(plan => {
        return (
          moment(plan.date).isSame(moment().isoWeekday(7), 'day') &&
          plan.typeId === 0
        )
      })
    },

    futurePlans (state, getters) {
      // return only future plans (ordered by date)
      return getters.plans.filter(plan => {
        return moment(plan.date).isSameOrAfter(moment())
      })
    },

    plan (state) {
      return planId => {
        return state.plans.find(plan => {
          return plan.id === planId
        })
      }
    }
  }
}
