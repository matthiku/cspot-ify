<template>
  <v-dialog v-model="dateEditingDlg" max-width="500px">

    <v-btn flat icon color="gray"
        title="edit plan date"
        @click.stop="dateEditingDlg = true" 
        slot="activator"
      ><v-icon class="grey--text lighten-1">edit</v-icon></v-btn>

    <v-card>
      <v-card-title>
        <span>Edit Plan Date and Time</span>
      </v-card-title>

      <v-card-text>
        <template>
          <!-- show plan DATE picker -->
          <v-layout row wrap>

            <v-flex xs11 sm5>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="startDateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Pick the plan date"
                  v-model="startDate"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="startDate" no-title scrollable actions>
                  <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                      <v-btn flat color="primary" @click="save">OK</v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <!-- show START time picker -->
            <v-flex xs11 sm5>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="startTimeMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  v-model="startTime"
                  @change="saveDate"
                  slot="activator"
                  label="Pick the START time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker format="24hr" v-model="startTime" autosave></v-time-picker>
              </v-menu>
            </v-flex>

            <!-- show END time picker -->
            <v-spacer></v-spacer>
            <v-flex xs11 sm5>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="endTimeMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  v-model="endTime"
                  @change="saveDate"
                  slot="activator"
                  label="Pick the END time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker format="24hr" v-model="endTime" autosave></v-time-picker>
              </v-menu>
            </v-flex>

          </v-layout>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn color="secondary" flat @click.stop="dateEditingDlg=false">Close</v-btn>
        <v-btn color="primary" flat @click.stop="saveDate">Submit</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'editPlanDateTimeDialog',
  props: ['plan', 'dateEditingDialog'],

  data () {
    return {
      dateEditingDlg: false,
      startDateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      startDate: null,
      startTime: null,
      endTime: null
    }
  },

  methods: {
    saveDate () {
      this.dateEditingDlg = false
      let date = moment(this.startDate + 'T' + this.startTime).format()
      let end = moment(this.startDate + 'T' + this.endTime).format()
      // do not submit if nothing has changed
      if (date === this.plan.date && end === this.plan.end) return
      if (!(date !== this.plan.date || end !== this.plan.end)) return

      this.$store.dispatch('updatePlan', {
        id: this.plan.id,
        field: 'date',
        value: date
      })
      this.$store.dispatch('updatePlan', {
        id: this.plan.id,
        field: 'end',
        value: end
      })
    },
    updateDates () {
      if (!this.plan) return
      this.startDate = moment(this.plan.date).format('YYYY-MM-DD')
      this.startTime = moment(this.plan.date).format('HH:mm')
      this.endTime = moment(this.plan.end).format('HH:mm')
    }
  },

  watch: {
    plan () {
      this.updateDates()
    },
    dateEditingDialog () {
      this.dateEditingDlg = this.dateEditingDialog
    }
  },

  created () {
    this.updateDates()
  }
}
</script>
