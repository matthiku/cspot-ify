<template>
  <div>

    <pre v-if="song.lyrics"
         @click="dialog = !dialog"    
         title="click to edit"
         class="grey lighten-3 pa-1 elevation-5 cursor-pointer">Lyrics:
{{
        '\n' + song.lyrics | maxLines(5) 
      }}</pre>

    <v-dialog v-model="dialog" max-width="600px" lazy>
      <v-card>
        <v-card-text>

          <v-text-field
            slot="input"
            label="Edit Lyrics"
            v-model="song['lyrics']"
            :rows="rows"
            @keydown.ctrl.enter="updateSong(song.id)"
            multi-line
            full-width
            counter autofocus
          ></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="resetField">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click.native="updateSong(song.id)">Save</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['song'],

    data () {
      return {
        dialog: false,
        rows: 5,
        initialValue: ''
      }
    },

    methods: {
      updateSong (id) {
        // check if there even were any changes
        if (this.initialValue.trim() === this.song.lyrics.trim()) return
        this.dialog = false

        let value = this.song.lyrics || ''
        this.$store.dispatch('updateSong', {id, field: 'lyrics', value})
        this.initialValue = this.song.lyrics
      },

      resetField () {
        this.dialog = false
        this.song.lyrics = this.initialValue
      }
    },

    created () {
      // save the initial value in order to check if it was actually changed for updating
      this.initialValue = this.song.lyrics

      this.rows = Math.max(this.song.lyrics.split('\n').length + 1, 5)
    }
  }
</script>
