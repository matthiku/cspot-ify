<template>
  <v-layout row justify-center>
    <v-dialog v-model="scriptureDialog" max-width="640">
      <v-card>
        <v-card-title class="headline">Select a Scripture Reference</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 sm4 md2>
                <v-select label="Book" :items="reference.books" hint="Select the book" required autofocus></v-select>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <v-text-field label="Chapter" hint="Select the chapter" required></v-text-field>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <v-text-field label="Verse from" hint="Select the Start Verse"></v-text-field>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <v-text-field label="Verse to" hint="Select the End Verse"></v-text-field>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <v-select label="Version" :items="reference.versions" hint="Select the Bible Version"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click.native="scriptureDialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="scriptureDialog = false">Set</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>  
</template>

<script>
import genericMixins from '../../../mixins'
import planMixins from '../mixins'

export default {
  mixins: [genericMixins, planMixins],

  data () {
    return {
      scriptureDialog: false,
      reference: {
        versions: ['ESV', 'NIV'],
        books: '',
        chapters: 0,
        verses: 0
      },
      result: ''
    }
  },

  created () {
    this.reference.books = Object.keys(this.bibleBooks)
  },

  watch: {
    dialogShow () {
      if (this.dialog.field === 'scripture') {
        this.scriptureDialog = true
        this.$store.dispatch('setDialog', {field: ''})
      }
    },
    scriptureDialog (val) {
      if (!val) {
        this.$store.dispatch('hideDialog')
        this.$store.dispatch('setDialog', {value: this.text})
      }
    }
  }
}
</script>
