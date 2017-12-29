<template>
  <v-card>

    <v-card-text class="grey lighten-3">
      <v-list two-line>

        <!-- loop through all staff records -->
        <v-list-tile avatar v-for="item in items" v-bind:key="item.id">

          <v-list-tile-avatar :title="item.role">
            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content v-show="!item.warning">
            <v-list-tile-title>{{ item.userName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.role }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-content v-show="item.warning">
            <v-list-tile-sub-title class="red--text mt-0 pt-0">Removing {{ item.role }} ({{ item.userName | firstWord }})?
              <v-btn flat small @click="removeStaff(item)" color="red">Yes<v-icon>info</v-icon></v-btn>
              <v-btn flat small @click="item.warning = false">Cancel<v-icon>highlight_off</v-icon></v-btn>
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action v-show="!item.warning" v-if="userOwnsThisPlan">
            <v-btn icon ripple title="remove this role" @click="item.warning = true">
              <v-icon color="red lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <p class="text-xs-center ma-0"> 
          <app-edit-plan-staff-dialog
            v-if="userOwnsThisPlan"
            :plan="plan" 
          ></app-edit-plan-staff-dialog>
          <span v-else-if="!items.length">no staff assigned yet</span>
        </p>

      </v-list>
    </v-card-text>

  </v-card>
</template>

<script>
import genericMixins from '../../../mixins'
import planMixins from '../mixins'

export default {
  mixins: [genericMixins, planMixins],

  props: ['plan', 'userOwnsThisPlan'],

  data () {
    return {
      items: []
    }
  },

  methods: {
    removeStaff (item) {
      this.$store.dispatch('removeStaffFromPlan', {
        planId: this.plan.id,
        staffId: item.id
      })
    },

    createStaffList () {
      this.plan.staffList = []
      this.items = []
      let staff = this.plan.staff
      if (!staff) return

      for (let key in staff) {
        let item = staff[key]
        if (!this.users || !this.users[item.userId]) continue
        this.items.push({
          id: key,
          icon: this.roles[item.role].icon,
          role: item.role,
          userName: this.users[item.userId].name,
          warning: false
        })
      }
      this.plan.staffList = this.items
    }
  },
  created () {
    this.createStaffList()
  },
  watch: {
    plan () {
      this.createStaffList()
    },
    users () {
      this.createStaffList()
    }
  }
}
</script>
