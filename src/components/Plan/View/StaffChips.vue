<template>
  <span>

      <v-chip
          v-for="(staff, index) in staffList"
          :key="index"
          :title="staff.role | ucFirst"
          outline 
          color="primary"
          class="plan-actions-title my-0 caption"
        >
        <v-icon color="primary">{{ staff.icon }}</v-icon>
        &nbsp;
        <span>
          {{ staff.userName | firstWord }}
        </span>
      </v-chip>

      <span 
          v-if="!staffList || !staffList.length"
          class="caption"           
        >(no staff assigned yet)
      </span>

  </span>
</template>

<script>
import genericMixins from '../../../mixins'
import planMixins from '../mixins'

export default {
  mixins: [genericMixins, planMixins],

  props: ['plan', 'showDetails'],

  computed: {
    staffList () {
      if (!this.plan.staffList) this.createStaffList(this.plan)
      return this.plan.staffList
    }
  }
}
</script>
