<template>
  <v-container fluid grid-list-xl>

    <!-- Show upcoming plans -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-menu open-on-hover bottom right offset-y>
                <v-btn icon slot="activator" dark>
                  <v-toolbar-side-icon></v-toolbar-side-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="item in planMenuItems" :key="item.title" @click="planAction(item.action)">
                    <v-icon>{{ item.icon }}</v-icon>&nbsp;
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

              <v-toolbar-title class="white--text">All Plans</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Alert Panel -->
            <v-container v-if="error || message">
              <v-layout row>
                <v-flex xs12>
                  <app-alert v-if="error" @dismissed="onDismissed('clearError')" :text="error"></app-alert>
                  <app-success v-if="message" @dismissed="onDismissed('clearMessage')" :text="message"></app-success>
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
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import genericMixins from '../../mixins/'

export default {
  name: 'AllPlansList',

  mixins: [genericMixins],

  data () {
    return {
      planMenuItems: [
        { icon: 'replay', action: 'refresh', title: 'Refresh Plan List' }
      ]
    }
  },

  computed: {
    plans () {
      return this.$store.getters.plans
    }
  },

  methods: {
    showSinglePlan (id) {
      // navigate to single plan form
      this.$router.push({name: 'plan', params: {planId: id}})
    },
    userOwnsPlan (id) {
      return true
    },
    planAction (what) {
      if (what === 'refresh') {
        this.$store.dispatch('refreshPlans')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
