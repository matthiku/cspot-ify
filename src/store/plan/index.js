import { plansRef, firebaseApp } from '../../firebaseApp'
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

    // create a new Plan item and possibly upload an image file
    createPlan ({ commit }, payload) {
      // reach out to our DB and store it
      let imageUrl
      let key
      let planData = Object.assign({}, payload.planData)
      plansRef.push(planData)
        .then(data => {
          // the database call will get us an id, which we need to add a new plan to the store
          key = data.key
          return key
        })
        // now check if there is a file to be uploaded
        .then((key) => {
          if (payload.image) {
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebaseApp.storage().ref('plans/' + key + ext).put(payload.image)
          }
        })
        // if applicable, write the newly uploaded image ULR to the plan data
        .then((fileData) => {
          if (fileData) {
            imageUrl = fileData.metadata.downloadURLs[0]
            return plansRef.child(key).update({imageUrl: imageUrl})
          }
        })
        // now write the complete plan data to the local plan list
        .then(() => {
          Object.assign(
            planData, {
              id: key,
              imageUrl: imageUrl
            })
          commit('createPlan', planData)
          commit('setLoading', false)
        })

        .catch(error => {
          commit('setError', error.toString())
          console.log(error)
          commit('setLoading', false)
        })
    },

    // update an existing plan
    // payload contains planID and field name
    updatePlan ({ commit, state }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj[payload.field] = payload.value
      plansRef.child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
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
