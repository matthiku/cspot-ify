<template>
  <v-container fluid grid-list-xl>

    <!-- Show singe Plan -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <!-- TITLE area -->
            <v-toolbar color="blue">
              <!-- drop-down menu in Plan title bar -->
              <v-menu open-on-hover bottom right offset-y>
                <v-btn icon slot="activator" dark>
                  <v-toolbar-side-icon></v-toolbar-side-icon>
                </v-btn>
                <v-card>
                  <v-card-title class="subheading blue-grey--text text--lighten-1 pb-0 mb-0">Select Show Mode:</v-card-title>
                  <v-list class="mt-0">
                    <v-list-tile v-for="item in planMenuItems" :key="item.title" @click="planAction(item.action)">
                      <v-icon class="mr-3">{{ item.icon }}</v-icon>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                    <div v-if="userIsAdmin">
                      <hr>
                      <v-list-tile>
                        <template>
                          <app-delete-plan-dialog :plan="plan"></app-delete-plan-dialog>
                        </template>
                      </v-list-tile>
                    </div>
                  </v-list>
                </v-card>
              </v-menu>
              
              <!-- toolbar title showing Plan title and type -->
              <v-toolbar-title class="white--text">
                {{ pageTitle }}: 
                <v-chip large color="success" class="mr-0" elevation-4
                  :class="[ userIsAdmin ? 'cursor-pointer' : '' ]"
                  @click="openEditDialog('type')">
                  {{ plan ? types.length ? types[plan.typeId].name : plan.typeId : 'Plan gone' }}</v-chip>
                <app-edit-plan-type-dialog
                  v-if="userIsAdmin" 
                  :plan="plan"
                  ></app-edit-plan-type-dialog>
              </v-toolbar-title>
              <v-spacer></v-spacer>

              <!-- show floating action button for a presentation menu -->
              <v-tooltip bottom>
                <v-speed-dial
                  v-model="fab" bottom right hover
                  slot="activator"
                  direction="left"
                  transition="slide-x-transition"
                >
                  <v-btn
                    v-model="fab" dark fab hover
                    slot="activator"
                    color="blue darken-2"
                  >
                    <v-icon>airplay</v-icon>
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-tooltip bottom>
                    <v-btn fab dark small color="green" slot="activator">
                      <v-icon>airplay</v-icon>
                    </v-btn>
                    <span>Full Presentation</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn fab dark small color="indigo" slot="activator">
                      <v-icon>account_circle</v-icon>
                    </v-btn>
                    <span>Leader</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn fab dark small color="indigo" slot="activator">
                      <v-icon>queue_music</v-icon>
                    </v-btn>
                    <span>Chords</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn fab dark small color="red" slot="activator">
                      <v-icon>music_video</v-icon>
                    </v-btn>
                    <span>Sheetmusic</span>
                  </v-tooltip>
                </v-speed-dial>
                <span>Select Show Mode</span>
              </v-tooltip>
            </v-toolbar>

            <!-- PLAN DETAILS -->
            <v-container>
              <v-layout row wrap>

                <v-flex xs12>
                  <v-card class="mb-2">
                    <v-container fluid>
                      <v-layout row>

                        <v-flex v-if="!plan" xs12>No plan found!</v-flex>

                        <!-- show title, date and location -->
                        <v-flex v-else xs12 class="grey lighten-2">
                          <v-card-text class="mb-0 pt-1 pb-2">
                            <div>                  
                              <h2 :class="[ userOwnsThisPlan ? 'mb-0' : 'mb-2']" @click="openEditDialog('date')"
                                >{{
                                  plan.date | date
                                }}<span v-if="plan.end">-{{ plan.end | time }}</span><app-edit-plan-date-time-dialog v-if="userOwnsThisPlan"
                                    :plan="plan"></app-edit-plan-date-time-dialog>                                
                              </h2>

                              <!-- show and edit plan STAFF -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.staff" :class="[showDetails.staff ? 'green lighten-3' : '']">
                                  <div slot="header">
                                    <span class="body-2 mr-3"><v-icon class="mr-3">supervisor_account</v-icon> Staff</span>
                                    <span v-if="!showDetails.staff">
                                      <span v-if="Object.keys(plan.staff).length" v-for="(staff, index, key) in plan.staff" :key="index" class="caption">
                                        {{ staff.role | ucFirst }}:
                                        <strong v-if="users && users[staff.userId]">{{ users[staff.userId].name | firstWord 
                                          }}</strong><span v-else>(invalid user ID: {{ staff 
                                          }})</span><span 
                                          v-if="Object.keys(plan.staff).length > key + 1">,</span>
                                      </span>
                                    </span>
                                    <span class="caption" 
                                        v-if="!showDetails.staff && (!plan.staff || (plan.staff && !Object.keys(plan.staff).length) )"
                                      >(no staff assigned yet)</span>
                                  </div>
                                  <app-edit-plan-staff-field :plan="plan" :userOwnsThisPlan="userOwnsThisPlan"></app-edit-plan-staff-field>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-divider></v-divider>

                              <!-- show and edit plan INFO -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.info" :class="[showDetails.info ? 'green lighten-3' : '']">
                                  <div slot="header">
                                    <span class="body-2 mr-3"><v-icon class="mr-3">info</v-icon> Details</span> 
                                    <span v-if="!showDetails.info" class="caption">({{
                                        plan.info | sentenceMax(55, 'none')
                                      }})</span>
                                  </div>
                                  <app-edit-plan-info-field :plan="plan" :userOwnsThisPlan="userOwnsThisPlan"></app-edit-plan-info-field>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-divider></v-divider>

                              <!-- show and edit plan RESOURCES -->
                              <v-expansion-panel>
                                <v-expansion-panel-content v-model="showDetails.resources" :class="[showDetails.resources ? 'green lighten-3' : '']">
                                  <div slot="header"> 
                                    <span class="body-2 mr-3"><v-icon class="mr-3">event_seat</v-icon> Resources</span>
                                    <span v-if="!showDetails.resources" class="caption">(Room 1, Projector)</span></div>
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
                                <v-expansion-panel-content v-model="showDetails.notes" :class="[showDetails.notes ? 'green lighten-3' : '']">
                                  <div slot="header">
                                    <span class="body-2 mr-3"><v-icon class="mr-3">loyalty</v-icon> Notes</span>
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
                                <v-expansion-panel-content v-model="showDetails.items" :class="[showDetails.items ? 'green lighten-3' : '']">
                                  <div slot="header">
                                    <span class="body-2 mr-3">
                                      <v-icon class="mr-3">list</v-icon> Actions
                                    </span>
                                    <v-chip v-if="!showDetails.items" outline color="primary" class="ma-0">{{ Object.keys(plan.actions).length }} items</v-chip>
                                  </div>

                                  <app-edit-plan-items-list :planId="plan.id" :userOwnsThisPlan="userOwnsThisPlan"></app-edit-plan-items-list>

                                </v-expansion-panel-content>
                              </v-expansion-panel>

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
import genericMixins from '../../mixins'
import planMixins from './mixins'

export default {
  name: 'SinglePlan',

  mixins: [genericMixins, planMixins],

  data () {
    return {
      pageTitle: 'Current Plan',
      planMenuItems: [
        { icon: 'account_circle', action: 'lead', title: 'Lead' },
        { icon: 'airplay', action: 'present', title: 'Present' },
        { icon: 'queue_music', action: 'chords', title: 'Chords' },
        { icon: 'music_video', action: 'music', title: 'Music' }
      ],
      fab: false,
      showDetails: {
        staff: false,
        resources: false,
        notes: false,
        info: false,
        items: true
      },
      openDateEditingDlg: false,
      editing: ''
    }
  },
  computed: {
    // get plan depending on current route!
    plan () {
      if (this.$route && this.$route.name === 'nextsunday') {
        this.pageTitle = 'This Sunday\'s Plan'
        return this.$store.getters.nextSunday
      }
      return this.$store.getters.plan(this.$route.params.planId)
    },
    userOwnsThisPlan () {
      return this.userOwnsPlan(this.plan)
    }
  },

  methods: {
    openDateEditing () {
      if (!this.userOwnsThisPlan) return
      this.openDateEditingDlg = !this.openDateEditingDlg
    },
    openEditDialog (what) {
      if (!this.userOwnsThisPlan) return
      this.dialog.type = what
      this.$store.dispatch('showDialog')
    },
    checkEditing (what) {
      if (!this.userOwnsThisPlan) return
      this.editing = what
    },
    onFieldEdited (that) {
      if (!this.userOwnsThisPlan) return
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
  },

  watch: {
    plan () {
      if (this.plan) return
      // return to list of plans if this plan becomes void
      if (this.$route.name === 'plans') {
        this.$router.push({name: 'plans'})
      }
    }
  }
}
</script>
