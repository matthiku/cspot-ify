import Vue from 'vue'
import AlertCmp from './components/shared/Alert.vue'
import SuccessCmp from './components/shared/Success.vue'
import EditPlanDateTimeDialog from './components/Plan/Edit/EditPlanDateTimeDialog'
import EditPlanTypeDialog from './components/Plan/Edit/EditPlanTypeDialog'
import EditPlanInfoField from './components/Plan/Edit/EditPlanInfoField'
import DeletePlanDialog from './components/Plan/Edit/DeletePlanDialog'
import ShowListOfPlans from './components/Plan/View/Plan.vue'

export default function sharedComponents () {
  Vue.component('app-alert', AlertCmp)
  Vue.component('app-success', SuccessCmp)
  Vue.component('app-edit-plan-info-field', EditPlanInfoField)
  Vue.component('app-edit-plan-type-dialog', EditPlanTypeDialog)
  Vue.component('app-edit-plan-date-time-dialog', EditPlanDateTimeDialog)
  Vue.component('app-delete-plan-dialog', DeletePlanDialog)
  Vue.component('app-show-list-of-plans', ShowListOfPlans)
}
