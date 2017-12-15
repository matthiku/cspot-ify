<template>
  <v-card>

    <v-card-text class="grey lighten-3">
      <v-list two-line>
        <v-list-tile avatar v-for="item in items" v-bind:key="item.title">

          <v-list-tile-avatar :title="item.role">
            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.userName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.role }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple title="remove this role" @click="removeStaff(item)">
              <v-icon color="red lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <p class="text-xs-center ma-0"> 
          <app-edit-plan-staff-dialog :plan="plan"></app-edit-plan-staff-dialog>
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

  created () {
    this.createStaffList()
  },

  watch: {
    plan () {
      this.createStaffList()
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
        if (!this.users[item.userId]) continue
        this.items.push({
          id: key,
          icon: this.roles[item.role].icon,
          role: item.role,
          userName: this.users[item.userId].name
        })
      }
      this.plan.staffList = this.items
    }
  }
}
</script>
