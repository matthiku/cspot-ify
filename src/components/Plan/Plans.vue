<template>
  <v-container fluid grid-list-xl>

    <!-- Show upcoming plans -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title class="white--text">All Plans</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Alert Panel -->
            <v-container v-if="error">
              <v-layout row>
                <v-flex xs12>
                  <app-alert @dismissed="onDismissed" :text="error"></app-alert>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container>
              <v-layout row wrap>

                <v-flex xs12 mb-2 v-if="!plans.length && !loading">
                  There are currently no upcoming Plans.<br>
                  <v-btn :to="{name: 'createplan'}">Create one!</v-btn>
                </v-flex>

                <v-flex xs12 mb-2 v-if="loading">
                  <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
                </v-flex>

                <!-- iterate through each registered plan -->
                <v-flex xs12 :key="plan.id" v-for="plan in plans">
                  <v-card class="primary mb-2">
                    <v-container fluid>
                      <v-layout row>

                        <!-- show title, date and location -->
                        <v-flex xs7 sm8 md9>
                          <v-card-title primary-title class="mb-0 pb-0">
                            <div>                  
                              <h5 class="white--text mb-0">{{ plan.title }}</h5>
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
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'AllPlansList',
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    plans () {
      return this.$store.getters.plans
    }
  },

  methods: {
    onDismissed () {
      this.error = false
    },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
