<template>
  <v-dialog v-model="dateEditingDlg" max-width="500px">

    <v-btn flat icon color="green" 
      @click.stop="dateEditingDlg = true" 
      slot="activator"
    ><v-icon>edit</v-icon></v-btn>

    <v-card>
      <v-card-title>
        <span>Edit Plan Date and Time</span>
      </v-card-title>

      <v-card-text>
        <template>
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
            <v-spacer></v-spacer>
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
                  slot="activator"
                  label="Picker in menu"
                  v-model="startTime"
                  prepend-icon="access_time"
                  @change="saveDate"
                  readonly
                ></v-text-field>
                <v-time-picker format="24hr" v-model="startTime" autosave></v-time-picker>
              </v-menu>
            </v-flex>

          </v-layout>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dateEditingDlg=false">Close</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import * as moment from 'moment'

export default {
  props: ['plan'],
  data () {
    return {
      dateEditingDlg: false,
      startDateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      startDate: moment(this.plan.date).format('YYYY-MM-DD'),
      startTime: moment(this.plan.date).format('HH:mm')
    }
  },
  methods: {
    saveDate () {
      let date = moment(this.date + 'T' + this.time)
      this.plan.date = moment(date).format()
      this.$store.dispatch('updatePlan', {
        id: this.plan.id,
        field: 'date',
        value: this.plan.date
      })
    }
  }
}
</script>
