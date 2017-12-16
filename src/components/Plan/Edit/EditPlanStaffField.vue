<template>
  <v-card>

    <v-card-text class="grey lighten-3">
      <v-list two-line>
        <v-list-tile avatar v-for="(item, index) in items" v-bind:key="item.id">

          <v-list-tile-avatar :title="item.role">
            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content v-show="!warning[index]">
            <v-list-tile-title>{{ item.userName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.role }} {{ index }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-content v-show="warning[index]">
            <v-list-tile-sub-title class="mt-0 pt-0">Are your sure?
              <v-btn flat small @click="removeStaff(item)">Yes<v-icon>info</v-icon></v-btn>
              <v-btn flat small @click="warning[index] = false">Cancel<v-icon>highlight_off</v-icon></v-btn>
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple title="remove this role" @click="setWarning(index, !warning[index])">
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
      warning: [],
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
    },
    setWarning (id, what) {
      this.warning[id] = what
      console.log(this.warning)
    }
  }
}
</script>
