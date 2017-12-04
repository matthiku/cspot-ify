<template>
  <v-container fluid>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="secondary--text">Create New Plan</h4 class="text--primary">
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatePlan">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
                name="title" 
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
                name="info" 
                label="Description"
                id="info"
                v-model="info"
                multi-line
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" class="primary":disabled="!formIsValid">Create Plan</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        date: new Date(),
        typeId: null,
        title: '',
        staff: [{ id: null, role: '' }],
        info: 'info'
      }
    },

    computed: {
      formIsValid () {
        return this.title !== ''
      }
    },
    methods: {
      onCreatePlan () {
        if (!this.formIsValid) {
          return
        }
        const planData = {
          date: this.date,
          typeId: this.typeId,
          title: this.title,
          staff: [{ id: null, role: '' }],
          info: this.info
        }
        this.$store.dispatch('createPlan', planData)
        this.$router.push({name: 'plan', params: {planId: 9}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
