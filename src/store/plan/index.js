import { plansRef, firebaseApp, binRef } from '../../firebaseApp'
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
      // state.plans.push(payload) // not needed, as we get an update through firebase!
      state.newPlanId = payload.id
    },
    clearNewPlanId (state) {
      state.newPlanId = null
    }
  },

  // A C T I O N S
  actions: {

    refreshPlans ({commit, dispatch}) {
      console.log('updating local plan list with full one-off snapshot from Server')
      plansRef.once('value')
      .then((data) => {
        dispatch('loadPlans', data)
      })
      .catch((error) => dispatch('errorHandling', error))
    },
    // load existing plans from the DB
    loadPlans ({ commit }, payload) {
      // console.log('updating local plan list with updated values from Server')
      let plans = []
      // payload is a firebase data snapshot
      payload.forEach(plan => {
        let pl = plan.val()
        pl.id = plan.key
        plans.push(pl)
      })
      commit('setPlans', plans)
      commit('setLoading', false)
    },

    // create a new Plan item and possibly upload an image file
    createPlan ({commit, dispatch}, payload) {
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

        .catch(error => dispatch('errorHandling', error))
    },

    // update an existing plan
    // - - payload contains planID, field name and field value
    updatePlan ({state, commit, dispatch}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj[payload.field] = payload.value
      plansRef.child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('setMessage', 'Plan successfully updated.')
        })
        .catch((error) => dispatch('errorHandling', error))
    },
    // add a staff member to a plan
    // - - payload must contain plan id and staff object with userId and role name
    addStaffToPlan ({commit, dispatch}, payload) {
      commit('setLoading', true)
      plansRef.child(payload.planId).child('staff').push(payload.staff)
        .then(() => {
          commit('appendMessage', 'One person added to this plan')
          commit('setLoading', false)
        })
        .catch((error) => dispatch('errorHandling', error))
    },
    // remove a staff member from a plan
    // - - payload must contain plan id and staff id
    removeStaffFromPlan ({commit, dispatch}, payload) {
      commit('setLoading', true)
      plansRef.child(payload.planId).child('staff').child(payload.staffId).remove()
        .then(() => {
          commit('appendMessage', 'One person removed from this plan')
          commit('setLoading', false)
        })
        .catch((error) => dispatch('errorHandling', error))
    },

    addSongToPlan ({commit, dispatch}, payload) {
      commit('setLoading', true)
      plansRef.child(payload.planId).child('actions').push({ id: payload.id, type: 'song' })
        .then(() => {
          commit('appendMessage', 'Song added to this plan')
          commit('setLoading', false)
        })
        .catch((error) => dispatch('errorHandling', error))
    },

    // move a plan to the bin
    // - - payload must be the full plan, as we send it to the bin and then delete it
    binPlan ({state, commit, dispatch}, payload) {
      commit('setLoading', true)
      binRef.child('users').push(payload)
      .then(() => {
        plansRef.child(payload.id).remove()
        .then(() => {
          dispatch('refreshPlans')
          commit('setLoading', false)
          commit('setMessage', 'Plan removed into the bin.')
        })
        .catch((error) => dispatch('errorHandling', error))
      })
    },

    // delete a plan finally
    deletePlan ({state, commit, dispatch}, payload) {
      commit('setLoading', true)
      plansRef.child(payload.id).remove()
        .then(() => {
          dispatch('refreshPlans')
          commit('setLoading', false)
          commit('setMessage', 'Plan was erased.')
        })
        .catch((error) => dispatch('errorHandling', error))
    },
    clearNewPlanId ({commit}) {
      commit('clearNewPlanId')
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
      let nextSunday = moment().isoWeekday(7).startOf('day')
      return state.plans.find(plan => {
        // console.log(moment(plan.date).startOf('day').isSame(nextSunday, 'day'))
        return (
          moment(plan.date).startOf('day').isSame(nextSunday, 'day') &&
          (plan.typeId * 1 === 0 || plan.typeId * 1 === 1)
        )
      })
    },

    futurePlans (state, getters) {
      // return only future plans (ordered by date)
      return getters.plans.filter(plan => {
        return moment(plan.date).isSameOrAfter(moment(), 'day')
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
