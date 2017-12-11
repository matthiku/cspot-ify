<template>
  <v-card>

    <!-- non-editable -->
    <v-card-text v-if="!editing"
      @click="checkEditing()"
      title="click to edit"
      class="grey lighten-3">
      <v-list two-line>
        <v-list-tile avatar v-for="item in items" v-bind:key="item.title">
          <v-list-tile-avatar>
            <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.role }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.userName }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card-text>

    <!-- editable -->
    <v-card-text v-if="editing"
      class="pt-0 mr-2 mb-0">
      <v-btn                                       
          class="mr-5 mb-4"
          color="green"
          bottom right
          small absolute fab
        ><v-icon>check_circle</v-icon>
      </v-btn>
      <v-text-field v-model="plan.staff"
        class="mt-0 mb-0 mr-4 pb-0 grey textbox-recessed lighten-3 elevation-8"
        multi-line rows="2"
        @blur="saveStaff"
        @keyup.ctrl.enter="saveStaff"
        autofocus full-width
        ref="input-staff"
        label="Enter/Edit Staff for this Event:">
      </v-text-field>
    </v-card-text>

  </v-card>
</template>

<script>
import genericMixins from '../../../mixins'
import planMixins from '../mixins'

export default {
  props: ['plan', 'userOwnsThisPlan'],
  mixins: [genericMixins, planMixins],

  data () {
    return {
      items: [
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', userName: 'Leader', role: 'Mossey' },
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', userName: 'Teacher', role: 'Shaney' },
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', userName: 'Lead Musician', role: 'Juli' }
      ],
      editing: false
    }
  },

  methods: {
    checkEditing () {
      if (!this.userOwnsThisPlan) return
      this.editing = 'staff'
    },
    saveStaff () {
      this.editing = false
      this.$store.dispatch('updatePlan', {
        id: this.plan.id,
        field: 'staff',
        value: this.plan.staff
      })
    }
  }
}
</script>
