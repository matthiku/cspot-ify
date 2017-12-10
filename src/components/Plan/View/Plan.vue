<template>
  <v-container fluid>
    <v-flex xs12 :key="plan.id" v-for="plan in plans">
      <v-card class="primary mb-2">
        <v-container fluid class="pa-0">
          <v-layout row>

            <!-- show title, date and location -->
            <v-flex>
              <v-card-title primary-title class="my-0 py-0">
                <div>                  
                  <h5 class="white--text mb-0">
                    {{ plan.date | dateShort }} - 
                    <span style="font-style: italic;">{{ types.length ? types[plan.typeId].name : plan.typeId }}</span>
                  </h5>
                  <div><strong>Note: </strong>{{ plan.info }}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn 
                  @click="showSinglePlan(plan.id)"
                  :flat="!userOwnsPlan(plan)" 
                  :class="userOwnsPlan(plan) ? 'info' : ''">
                  <v-icon left>{{ userOwnsPlan(plan) ? 'edit' : 'arrow_forward' }}</v-icon>
                  {{ userOwnsPlan(plan) ? 'Edit' : 'View' }} Plan
                </v-btn>
              </v-card-actions>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import genericMixins from '../../../mixins/'
import planMixins from '../mixins'

export default {
  name: 'ListSinglePlan',

  mixins: [genericMixins, planMixins],

  props: ['plans'],

  methods: {
    showSinglePlan (id) {
      // navigate to single plan form
      this.$router.push({name: 'plan', params: {planId: id}})
    }
  }
}
</script>
