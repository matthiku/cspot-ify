<template>
  <v-container fluid>

        <v-layout row>
          <v-flex sm12 md6 offset-sm2>
            <img src="/static/cspoticon.png" alt="c-SPOT icon" class="mb-5">
          </v-flex>
        </v-layout>

        <!-- Show upcoming plans -->
        <v-layout row wrap>
          <v-flex md12 lg8 xl6 offset-md2 offset-xl3>
            <v-card>
              <v-card-text>

                <!-- Alert Panel -->
                <v-container v-if="error">
                  <v-layout row>
                    <v-flex sm12 md6 offset-sm2>
                      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                    </v-flex>
                  </v-layout>
                </v-container>

                <v-toolbar color="blue">
                  <v-toolbar-side-icon></v-toolbar-side-icon>
                  <v-toolbar-title class="white--text">Upcoming Plans</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-container>
                  <v-layout row wrap>

                    <v-flex xs12 mb-3 v-if="!plans.length">
                      There are currently no upcoming Plans.<br>
                      <v-btn :to="{name: 'createplan'}">Create one!</v-btn>
                    </v-flex>

                    <!-- iterate through each registered plan -->
                    <v-flex xs12 mb-3 key="plan.id" v-for="plan in plans">
                      <v-card class="primary mb-3">
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

        <v-layout row>
          <v-flex sm12 md6 offset-sm2>
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

      </v-layout>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: [
        { id: 1, name: 'Antone Malone' }
      ],
      plans: [
        { id: 0, date: new Date(), title: 'Sunday Service', info: 'info' },
        { id: 1, date: new Date(), title: 'Midweek Service', info: 'info' }
      ],
      error: { message: 'this is a long winded error message saying nothing at all but tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com tsforum Reflection@attachmate.com filling up some space to test thigns out ' }
    }
  },
  methods: {
    onDismissed () {
      this.error = false
    },
    showSinglePlan () {
      return
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
