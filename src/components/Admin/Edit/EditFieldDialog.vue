<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogShow" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card v-if="dialog.field">
        <v-card-title>
          <span class="headline">Edit {{ dialog.field }} of '{{ dialog.item.id }}'</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  ref="inputfield"
                  :label="dialog.field"
                  v-model="dialog.item[dialog.field]" 
                  @keyup.enter="closeDialog(false)"
                  autofocus
                  required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog(true)">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeDialog(false)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import genericMixins from '../../../mixins/'

  export default {
    mixins: [genericMixins],
    data () {
      return {
      }
    },
    methods: {
      closeDialog (close) {
        this.$store.dispatch('hideDialog')
        if (close || this.$refs.inputfield.initialValue === this.$refs.inputfield.value) return
        this.dialog.updated = true
      }
    }
  }
</script>