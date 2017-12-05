import * as firebase from 'firebase'
import * as moment from 'moment'

export default {
  state: {
    plans: [
      // create 4 dummy events, 2 past ones and 2 future ones
      {
        id: 0,
        date: moment().isoWeekday(-2).endOf('day'),
        typeId: 1,
        title: 'Midweek Service',
        staff: [{ id: 1, role: 'leader' }],
        info: 'info'
      },
      {
        id: 1,
        date: moment().isoWeekday(-7).endOf('day'),
        typeId: 0,
        title: 'Sunday Service',
        staff: [{ id: 1, role: 'leader' }, { id: 0, role: 'teacher' }],
        info: 'info'
      },
      {
        id: 2,
        date: moment().isoWeekday(2).endOf('day'),
        typeId: 1,
        title: 'Midweek Service',
        staff: [{ id: 1, role: 'leader' }],
        info: 'info'
      },
      {
        id: 3,
        date: moment().isoWeekday(7).endOf('day'),
        typeId: 0,
        title: 'Sunday Service',
        staff: [{ id: 1, role: 'leader' }, { id: 0, role: 'teacher' }],
        info: 'info'
      }
    ],
    newPlanId: null
  },

  mutations: {
    setPlans (state, payload) {
      state.plans = payload
    },
    createPlan (state, payload) {
      state.plans.push(payload)
      state.newPlanId = payload.id
    }
  },

  actions: {
    loadPlans ({ commit, state }) {
      firebase
        .database()
        .ref('plans')
        .once('value')
        .then(data => {
          const plans = []
          const obj = data.val()
          if (!obj.length) {
            firebase.database().ref('plans').push(state.plans)
          }
          for (let key in obj) {
            plans.push({
              ...obj[key],
              id: key
            })
          }
          commit('setLoading', false)
          commit('setPlans', plans)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    createPlan ({ commit }, payload) {
      // TODO: reach out to our DB and store it
      firebase
        .database()
        .ref('plans')
        .push(payload)
        .then(data => {
          // the database call will get us an id, which we need to add a new plan to the store
          // let plan = Object.assign(payload, {id: data.key})
          commit('createPlan', {
            ...payload,
            id: data.key
          })
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    }
  },

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
