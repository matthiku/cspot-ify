import Vue from 'vue'
import AlertCmp from './components/shared/Alert.vue'
import SuccessCmp from './components/shared/Success.vue'

import EditPlanDateTimeDialog from './components/Plan/Edit/EditPlanDateTimeDialog'
import EditPlanTypeDialog from './components/Plan/Edit/EditPlanTypeDialog'
import EditPlanStaffDialog from './components/Plan/Edit/EditPlanStaffDialog'
import EditPlanInfoField from './components/Plan/Edit/EditPlanInfoField'
import EditPlanStaffField from './components/Plan/Edit/EditPlanStaffField'
import EditPlanItemsList from './components/Plan/Edit/EditPlanItemsList'
import DeletePlanDialog from './components/Plan/Edit/DeletePlanDialog'
import ShowListOfPlans from './components/Plan/View/Plan.vue'

import EditSongField from './components/Song/Edit/EditSongField'
import EditSongTextAreaField from './components/Song/Edit/EditSongTextAreaField'

import AdminUserList from './components/Admin/Users'
import AdminRoleList from './components/Admin/Roles'
import AdminTypeList from './components/Admin/Types'
import AdminEditFieldDialog from './components/Admin/Edit/EditFieldDialog'

export default function sharedComponents () {
  Vue.component('app-alert', AlertCmp)
  Vue.component('app-success', SuccessCmp)

  Vue.component('app-edit-plan-items-list', EditPlanItemsList)
  Vue.component('app-edit-plan-staff-field', EditPlanStaffField)
  Vue.component('app-edit-plan-info-field', EditPlanInfoField)
  Vue.component('app-edit-plan-staff-dialog', EditPlanStaffDialog)
  Vue.component('app-edit-plan-type-dialog', EditPlanTypeDialog)
  Vue.component('app-edit-plan-date-time-dialog', EditPlanDateTimeDialog)
  Vue.component('app-delete-plan-dialog', DeletePlanDialog)
  Vue.component('app-show-list-of-plans', ShowListOfPlans)

  Vue.component('app-edit-song-textarea-field', EditSongTextAreaField)
  Vue.component('app-edit-song-field', EditSongField)

  Vue.component('app-admin-user-list', AdminUserList)
  Vue.component('app-admin-type-list', AdminTypeList)
  Vue.component('app-admin-role-list', AdminRoleList)
  Vue.component('app-admin-edit-field-dialog', AdminEditFieldDialog)
}
