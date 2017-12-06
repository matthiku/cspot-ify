<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn color="warning" dark slot="activator"><v-icon>delete</v-icon> Delete Plan</v-btn>
      <v-card>
        <v-card-title class="headline">Do you really want to remove this enter Plan?</v-card-title>
        <v-card-text>You can remove this plan from the active list of plans. It will be placed into the bin...</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" flat @click.native="executeDeletion">Yes!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['plan'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      executeDeletion () {
        this.dialog = false
        this.$store.dispatch('deletePlan', this.plan)
      }
    }
  }
</script>