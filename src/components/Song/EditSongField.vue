<template>
  <div>
    <v-edit-dialog
        title="click to edit title"
        lazy
      >{{ song[field] }}
      <v-text-field
        slot="input"
        label="Edit"
        v-model="song[field]"
        hint="Press Enter or Esc to close. Ctrl+z to undo changes."
        single-line counter
        :rules="[maxChars]"
        @blur="updateSong(song.id, field)"
      ></v-text-field>
    </v-edit-dialog>
  </div>
</template>

<script>
  export default {
    props: ['field', 'song', 'maxLength'],

    data () {
      return {
        initialValue: '',
        maxChars: (v) => v.length <= this.maxLength || 'Input too long!'
      }
    },
    methods: {
      updateSong (id, field) {
        // check if there were any changes
        if (this.initialValue === this.song[this.field]) return
        this.$store.dispatch('updateSong', {id, field, value: this.song[this.field]})
      }
    },
    created () {
      this.initialValue = this.song[this.field]
    }
  }
</script>
