import Vue from 'vue'
import AlertCmp from './components/shared/Alert.vue'
import SuccessCmp from './components/shared/Success.vue'
import EditPlanDateDialog from './components/Plan/Edit/EditPlanDateDialog'
import DeletePlanDialog from './components/Plan/Edit/DeletePlanDialog'
import ShowListOfPlans from './components/Plan/View/Plan.vue'

export default function sharedComponents () {
  Vue.component('app-alert', AlertCmp)
  Vue.component('app-success', SuccessCmp)
  Vue.component('app-edit-plan-date-dialog', EditPlanDateDialog)
  Vue.component('app-delete-plan-dialog', DeletePlanDialog)
  Vue.component('app-show-list-of-plans', ShowListOfPlans)
}
