<template>
  <v-container fluid>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="secondary--text">Create New Plan</h4 class="text--primary">
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatePlan">

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
                name="title" 
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>

          <!-- Alert Panel -->
          <v-container v-if="error">
            <v-layout row>
              <v-flex xs12>
                <app-alert @dismissed="onDismissed" :text="error"></app-alert>
              </v-flex>
            </v-layout>
          </v-container>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-layout row>
                <v-flex xs11 sm5>
                  <v-dialog
                    persistent
                    v-model="modalDate"
                    lazy
                  >
                    <v-text-field
                      slot="activator"
                      label="Pick a date"
                      v-model="date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" scrollable actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs11 sm5>
                  <v-dialog
                    persistent
                    v-model="modalTime"
                    lazy
                  >
                    <v-text-field
                      slot="activator"
                      label="Pick a time"
                      v-model="time"                      
                      prepend-icon="schedule"
                      readonly
                    ></v-text-field>
                    <v-time-picker v-model="time" format="24hr" scrollable actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-time-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
                name="info" 
                label="Description"
                id="info"
                v-model="info"
                multi-line
                required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn 
                type="submit" 
                class="primary"
                :disabled="!formIsValid" 
                :loading="loading"
                @click="loader = 'loading'"
                >Create Plan
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import * as moment from 'moment'

export default {
  data () {
    return {
      date: null,
      typeId: null,
      title: '',
      staff: [{ id: 0, role: 'dummy' }],
      info: 'info',
      time: '',
      modalDate: false,
      modalTime: false
    }
  },

  computed: {
    planId () {
      return this.$store.getters.newPlanId
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    formIsValid () {
      return this.title !== '' && this.dateTime.isValid()
    },
    dateTime () {
      return moment(this.date + 'T' + this.time)
    }
  },

  methods: {
    onCreatePlan () {
      if (!this.formIsValid) {
        return
      }
      const planData = {
        date: this.dateTime.format(),
        typeId: this.typeId,
        title: this.title,
        staff: [{ id: 0, role: 'dummy' }],
        info: this.info
      }
      this.$store.dispatch('createPlan', planData)
    }
  },

  watch: {
    // check if the new plan was added to the array of plans
    // then open the new plan
    planId () {
      this.$router.push({ name: 'plan', params: { planId: this.planId } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
