<template>
  <v-card>
    <!-- non-editable -->
    <v-card-text v-if="!editing"
      @click="checkEditing()"
      title="click to edit"
      class="grey lighten-3">
      <pre>{{ plan.info }}</pre>
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
      <v-text-field v-model="plan.info"
        class="mt-0 mb-0 mr-4 pb-0 grey textbox-recessed lighten-3 elevation-8"
        multi-line rows="2"
        @blur="saveInfo"
        @keyup.ctrl.enter="saveInfo"
        autofocus full-width
        ref="input-info"
        label="Enter/Edit plan details:">
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
      editing: false
    }
  },

  methods: {
    checkEditing () {
      if (!this.userOwnsThisPlan) return
      this.editing = 'info'
    },
    saveInfo () {
      this.editing = false
      this.plan.info = this.info
      this.$store.dispatch('updatePlan', {
        id: this.plan.id,
        field: 'info',
        value: this.info
      })
    }
  }
}
</script>
