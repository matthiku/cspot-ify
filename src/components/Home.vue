<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-center>
      <v-flex xs4 sm3 md2 lg1 class="pa-0">
        <img src="/static/cspoticon.png" alt="c-SPOT icon">
      </v-flex>
    </v-layout>

    <!-- Show upcoming plans -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title class="white--text">Upcoming Plans</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Alert Panel -->
            <v-container v-if="error">
              <v-layout row>
                <v-flex xs12>
                  <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container>
              <v-layout row wrap>

                <v-flex xs12 mb-2 v-if="!upcomingPlans">
                  There are currently no upcoming Plans.<br>
                  <v-btn :to="{name: 'createplan'}">Create one!</v-btn>
                </v-flex>

                <!-- iterate through each registered plan -->
                <v-flex xs12 :key="plan.id" v-for="plan in upcomingPlans">
                  <v-card class="primary mb-2">
                    <v-container fluid>
                      <v-layout row>

                        <!-- show title, date and location -->
                        <v-flex xs7 sm8 md9>
                          <v-card-title primary-title class="mb-0 pb-0">
                            <div>                  
                              <h5 class="white--text mb-0">{{ plan.title }}</h5>
                              <div>{{ plan.date }} in {{ plan.info }}</div>
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


    <v-layout row justify-center>
      <v-flex xs12 md6>
        <blockquote>
          &#8220;Leave the presence of a fool, for there you do not meet words of knowledge.&#8221;
          <footer>
            <small>
              <em>&mdash;King Solomon</em>
            </small>
          </footer>
        </blockquote>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      error: { message: 'this is a long winded error message saying nothing at all but Reflection@attachmate.com tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com filling up some space to test thigns out ' }
    }
  },
  computed: {
    upcomingPlans () {
      return this.$store.getters.upcomingPlans
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    onDismissed () {
      this.error = false
    },
    showSinglePlan (planId) {
      console.log('trying to open plan id: ' + planId)
      this.$router.push({ name: 'plan', params: {id: planId} })
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
