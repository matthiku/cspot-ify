<template>
  <v-card>

    <!-- non-editable -->
    <v-card-text
        @click="checkEditing()"
        class="grey lighten-3">

      <v-list two-line>
        <v-list-tile avatar v-for="item in items" v-bind:key="item.title">
          <v-list-tile-avatar title="">
            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.userName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.role }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
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
    removeStaff () {},

    createStaffList () {
      this.items = []
      let staff = this.plan.staff
      if (!staff) return

      for (let u in staff) {
        let item = staff[u]
        if (!this.users[item.id]) continue
        this.items.push({
          icon: this.roles[item.role].icon,
          role: item.role,
          userName: this.users[item.id].name
        })
      }
    }
  }
}
</script>
