<template>
  <v-container>
    <v-flex xs12 :key="plan.id" v-for="plan in plans">
      <v-card class="primary mb-2">
        <v-container fluid>
          <v-layout row>

            <!-- show title, date and location -->
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title class="mb-0 pb-0">
                <div>                  
                  <h5 class="white--text mb-0">{{ types.length ? types[plan.typeId].name : plan.typeId }}</h5>
                  <div>{{ plan.date | date }} in {{ plan.info }}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn 
                  @click="showSinglePlan(plan.id)"
                  :flat="!userOwnsPlan(plan.id)" 
                  :class="userOwnsPlan(plan.id) ? 'info' : ''">
                  <v-icon left>{{ userOwnsPlan(plan.id) ? 'edit' : 'arrow_forward' }}</v-icon>
                  {{ userOwnsPlan(plan.id) ? 'Edit' : 'View' }} Plan
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

export default {
  name: 'ListSinglePlan',

  mixins: [genericMixins],

  props: ['plans'],

  methods: {
    showSinglePlan (id) {
      // navigate to single plan form
      this.$router.push({name: 'plan', params: {planId: id}})
    },
    userOwnsPlan (id) {
      return true
    }
  }
}
</script>
