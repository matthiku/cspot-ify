<template>
  <v-container fluid grid-list-xl>

    <!-- Show upcoming plans -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title class="white--text">Current Plan</v-toolbar-title>
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

                <v-flex xs12>
                  <v-card class="mb-2">
                    <v-container fluid>
                      <v-layout row>

                        <v-flex v-if="!plan" xs12>
                          No plan found
                        </v-flex>

                        <!-- show title, date and location -->
                        <v-flex v-else xs12>
                          <v-card-text class="mb-0 pt-0 pb-0">
                            <div>                  
                              <h5 class="mb-0">{{ plan.title }}</h5>
                              <div>{{ plan.date | date }}</div>
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showPlanStaff">
                                  <div slot="header">Staff <span v-if="!showPlanStaff" class="caption">(Leader: Andy, Teacher: Bob)</span></div>
                                  <v-card>
                                    <v-card-text class="grey lighten-3">
                                      {{ plan.staff }}
                                    </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                              <v-divider></v-divider>
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showPlanDetails">
                                  <div slot="header">Details <span v-if="!showPlanDetails" class="caption">({{ plan.info.substr(0,55) }}...)</span></div>
                                  <v-card>
                                    <v-card-text 
                                      @click="checkEditing('info')" 
                                      v-if="editing!=='info'"
                                      class="grey lighten-3">{{ plan.info }}</v-card-text>
                                    <v-text-field
                                      v-if="editing==='info'"
                                      v-model="plan.info"
                                      @blur="onFieldEdited('info')"
                                      class="mt-0"
                                      multi-line rows="2"
                                      autofocus full-width
                                      ref="input-info"
                                      label="Enter/Edit plan details"
                                    ></v-text-field>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                              <v-divider></v-divider>
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showPlanItems">
                                  <div slot="header">Items <v-chip outline color="primary">3</v-chip></div>
                                  <v-card>
                                    <v-card-text class="grey lighten-3">item 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, veritatis?</v-card-text>
                                    <v-card-text class="grey lighten-3">item 2 Lorem ipsum dolor sit amet. </v-card-text>
                                    <v-card-text class="grey lighten-3">item 3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae explicabo repellendus repellat maiores similique quis quo sed? Rem doloremque blanditiis voluptatem molestiae! </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </div>
                            </div>
                          </v-card-text>

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
  name: 'showSinglePlan',

  props: ['id'],

  data () {
    return {
      showPlanStaff: false,
      showPlanDetails: false,
      showPlanItems: false,
      editing: ''
    }
  },
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
    plan () {
      if (this.$route.name === 'nextsunday') {
        return this.$store.getters.nextSunday
      }
      return this.$store.getters.plan(this.$route.params.planId)
    }
  },

  methods: {
    onDismissed () {
      this.error = ''
    },
    showSinglePlan () {
      return
    },
    userOwnsPlan (id) {
      return true
    },
    checkEditing (what) {
      if (!this.userOwnsPlan) return
      this.editing = what
    },
    onFieldEdited (that) {
      this.editing = ''
      // asdf
      // update plan set info = this.plan[that]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
