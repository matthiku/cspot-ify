<template>
  <v-data-table
      v-model="selected"
      :headers="headers"
      :items="plans"
      item-key="date"
      hide-actions
      class="elevation-1"
    >
    <template slot="headers" slot-scope="props">
      <tr>
        <th class="pa-0 ma-0"></th>

        <th class="subheading pa-0 ma-0" v-for="header in props.headers" :key="header.text">
          {{ header.text }}
        </th>
      </tr>
    </template>

    <template slot="items" slot-scope="props">
      <tr :active="props.selected" @click="onPlanSelected(props)">
        <td>
          <v-checkbox
            primary
            hide-details
            :input-value="props.selected"
          ></v-checkbox>
        </td>

        <td>{{ props.item.date | dateShort }}, <span class="no-wrap">{{ props.item.type }}</span></td>

        <td class="text-xs-right">{{ props.item.items }}</td>

        <td class="text-xs-right">{{ props.item.leader }}</td>

        <td class="text-xs-right">{{ props.item.teacher }}</td>
      </tr>
    </template>

    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, no plans found for you :(
      </v-alert>
    </template>

  </v-data-table>
</template>

<script>
  import genericMixins from '../../../mixins/'
  export default {
    props: ['plans'],

    mixins: [genericMixins],

    data () {
      return {
        selected: [],
        headers: [
          { text: 'Date', value: 'date' },
          { text: 'Items', value: 'items' },
          { text: 'Leader', value: 'leader' },
          { text: 'Teacher', value: 'teacher' }
        ]
      }
    },

    methods: {
      onPlanSelected (props) {
        props.selected = !props.selected

        // publish the selected plan and make sure only one is selected!
        if (props.selected) {
          this.dialog.selectedPlan = undefined
        } else {
          this.dialog.selectedPlan = props.item.id
          if (this.selected.length > 1) this.selected = []
        }
      }
    }
  }
</script>
