<template>
  <div>
    <v-edit-dialog lazy
        :title="'click to edit ' + (fieldName || field)">
      {{ song[field] }}
      <small class="white no-wrap" v-if="!song[field]">add {{ fieldName || field }}</small>

      <v-text-field
        slot="input"
        :label="'Edit ' + (fieldName || field)"
        hint="Press Enter or Esc to close. Ctrl+z to undo changes."
        v-model="song[field]"
        :rules="[rules.maxChars, rules.required]"
        :required="required ? true : false"
        :clearable="clearable"
        single-line
        counter autofocus
        @keyup.ctrl.enter="updateSong(song.id, field)"
        @keyup.enter="updateSong(song.id, field, 'Enter')"
        @blur="resetField()"
      ></v-text-field>

    </v-edit-dialog>
  </div>
</template>

<script>
  export default {
    props: ['field', 'song', 'maxLength', 'fieldName', 'required'],

    data () {
      return {
        fullWidth: false,
        clearable: true,
        initialValue: '',
        rules: {
          maxChars: (v) => this.maxLength < 0 || v.length <= this.maxLength || 'Input too long!',
          required: (v) => {
            if (this.required && !v) return 'This field cannot be empty!'
            return true
          }
        }
      }
    },

    methods: {
      updateSong (id, field, enter) {
        // check if there even were any changes
        if (this.initialValue.trim() === this.song[this.field].trim()) return

        // don't submit empty strings for required fields
        if (this.required && !this.song[field]) {
          this.song[this.field] = this.initialValue
          return
        }

        let value = this.song[this.field] || ''
        this.$store.dispatch('updateSong', {id, field, value})
        this.initialValue = this.song[this.field]
      },
      resetField () {
        this.song[this.field] = this.initialValue
      }
    },

    created () {
      // save the initial value in order to compare before actually updating
      this.initialValue = this.song[this.field]

      if (this.required) this.clearable = false
    }
  }
</script>
