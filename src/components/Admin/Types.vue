<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">

      <v-layout column align-center>

        <!-- <app-admin-edit-field-dialog></app-admin-edit-field-dialog> -->

        <v-data-table
            v-bind:headers="headers"
            :items="types"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">

            <td class="text-xs-right">{{ props.item.id }}</td>

            <td class="text-xs-right" @click="editField('name', props.item)">{{ props.item.name }}</td>

            <td class="text-xs-right">{{ props.item.subtitle }}</td>

            <td class="text-xs-right">{{ props.item.weekday }}</td>

            <td class="text-xs-right">{{ props.item.repeat }}</td>

            <td class="text-xs-right">{{ props.item.start }}</td>

            <td class="text-xs-right">{{ props.item.end }}</td>

            <td class="text-xs-right">
              <v-btn @click="removeType(props.item)"
                v-if="!props.item.users" color="error" fab small dark>
                <v-icon>delete</v-icon>
              </v-btn>
            </td>

          </template>
        </v-data-table>
        <v-btn color="primary" @click="addType">add type</v-btn>
      </v-layout>

    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import genericMixins from '../../mixins/'

  export default {
    name: 'EventTypesList',
    mixins: [genericMixins],
    data () {
      return {
        headers: [
          { text: 'Id', value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Subtitle', value: 'subtitle' },
          { text: 'Weekday', value: 'weekday' },
          { text: 'Start', value: 'start' },
          { text: 'End', value: 'end' },
          { text: 'Repeat', value: 'repeat' }
        ],
        typesList: []
      }
    },
    computed: {
      types () {
        return this.$store.getters.types
      }
    },
    created () {
      this.$store.dispatch('hideDialog')
    },
    watch: {
      dialogShow (val) {
        if (!this.dialog.updated) return
        this.$store.dispatch('updateType', {
          id: this.dialog.item.id,
          field: this.dialog.field,
          value: this.dialog.item[this.dialog.field]
        })
      }
    },
    methods: {
      editField (field, what) {
        if (!this.userIsAdmin) return
        this.$store.dispatch('setDialog', {field, item: what})
        this.$store.dispatch('showDialog')
      },
      addType () {
        if (!this.userIsAdmin) return
        this.$store.dispatch('addDummyType', {id: 'new', name: ''})
        this.$store.dispatch('setDialog', {field: 'name', item: this.types.new})
        this.$store.dispatch('showDialog')
      },
      removeType (type) {
        if (!this.userIsAdmin) return
        this.$store.dispatch('removeType', type)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
