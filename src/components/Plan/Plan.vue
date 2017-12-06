<template>
  <v-container fluid grid-list-xl>

    <!-- Show upcoming plans -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title class="white--text">
                {{ pageTitle }}: 
                <v-chip outline color="black">{{ plan.title }}</v-chip>
              </v-toolbar-title>
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
                        <v-flex v-else xs12 class=" grey lighten-2">
                          <v-card-text class="mb-0 pt-1 pb-2">
                            <div>                  
                              <h6 class="mb-0">{{ plan.date | date }}
                                <template v-if="true">
                                  <app-edit-plan-date-dialog :plan="plan"></app-edit-plan-date-dialog>
                                </template>
                              </h6>

                              <!-- show and edit plan INFO -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.info">
                                  <div slot="header">
                                    <span class="body-2">Subtitle</span> 
                                    <span v-if="!showDetails.info" class="caption">({{ plan.info.substr(0,55) }}...)</span>
                                  </div>
                                  <v-card>
                                    <!-- non-editable -->
                                    <v-card-text v-if="editing !== 'info'"
                                      @click="checkEditing('info')" 
                                      class="grey lighten-3">
                                      <pre>{{ plan.info }}</pre>
                                    </v-card-text>
                                    <!-- editable -->
                                    <v-card-text v-if="editing === 'info'"
                                      class="pt-0 mr-2 mb-0">
                                      <v-btn                                       
                                        class="mr-5 mb-4"
                                        color="green"
                                        bottom right
                                        small absolute fab
                                      ><v-icon>check_circle</v-icon>
                                      </v-btn>
                                      <v-text-field v-model="plan.info"
                                        class="mt-0 mb-0 mr-4 pb-0 grey lighten-3"
                                        @blur="onFieldEdited('info')"                                        
                                        multi-line rows="2"
                                        autofocus full-width
                                        ref="input-info"
                                        label="Enter/Edit plan details.">
                                      </v-text-field>
                                    </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-divider></v-divider>

                              <!-- show and edit plan STAFF -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.staff">
                                  <div slot="header">
                                    <span class="body-2">Staff</span>                                     
                                    <span v-if="!showDetails.staff" class="caption">(Leader: Andy, Teacher: Bob, Lead Musician: Tom)</span>
                                    </div>
                                  <v-card>
                                    <v-card-text class="grey lighten-3">
                                      {{ plan.staff }}
                                    </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-divider></v-divider>

                              <!-- show and edit plan RESOURCES -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.resources">
                                  <div slot="header"> 
                                    <span class="body-2">Resources</span>
                                    <span v-if="!showDetails.resources" class="caption">(Room: 1, Projector)</span></div>
                                  <v-card>
                                    <v-card-text class="grey lighten-3">
                                      resources, resources, resources
                                    </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-divider></v-divider>

                              <!-- show and edit plan NOTES -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.notes">
                                  <div slot="header">
                                    <span class="body-2">Notes</span>
                                    <span v-if="!showDetails.notes" class="caption">(none)</span>
                                  </div>
                                  <v-card>
                                    <v-card-text class="grey lighten-3">
                                      ...
                                    </v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-divider></v-divider>

                              <!-- show and edit plan ITEMS -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.items">
                                  <div slot="header">
                                    <span class="body-2">Items</span>
                                    <v-chip outline color="primary">3</v-chip>
                                  </div>
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
      pageTitle: 'Current Plan',
      showDetails: {
        staff: false,
        resources: false,
        notes: false,
        info: false,
        items: false
      },
      dateEditingDlg: false,
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
        this.pageTitle = 'This Sunday\'s Plan'
        return this.$store.getters.nextSunday
      }
      return this.$store.getters.plan(this.$route.params.planId)
    }
  },

  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
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
      this.showDetails[that] = false
      // check if there were any changes
      if (this.$refs['input-info']._data.initialValue === this.$refs['input-info']._data.lazyValue) return
      // update plan set info = this.plan[that]
      this.$store.dispatch('updatePlan', {
        id: this.plan.id,
        field: that,
        value: this.plan[that]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
