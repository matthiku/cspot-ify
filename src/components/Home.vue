<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-center>
      <v-flex xs4 sm3 md2 lg1 class="pa-0">
        <img src="/static/cspoticon.png" alt="c-SPOT icon">
      </v-flex>
    </v-layout>

    <!-- Show upcoming plans -->
    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title class="white--text">Upcoming Plans</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Alert Panel -->
            <v-container v-if="error">
              <v-layout row>
                <v-flex xs12>
                  <app-alert @dismissed="onDismissed" :text="error"></app-alert>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container>
              <v-layout row wrap>

                <v-flex xs12 mb-2 v-if="!upcomingPlans && !loading">
                  There are currently no upcoming Plans.<br>
                  <v-btn :to="{name: 'createplan'}">Create one!</v-btn>
                </v-flex>

                <v-flex xs12 mb-2 v-if="loading">
                  <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
                </v-flex>

                <!-- iterate through each registered plan -->
                <app-show-list-of-plans :plans="upcomingPlans"></app-show-list-of-plans>
                
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <v-layout row justify-center>
      <v-flex xs12 md6>
        <blockquote>
          &#8220;Leave the presence of a fool, for there you do not meet words of knowledge.&#8221;
          <footer>
            <small>
              <em>&mdash;King Solomon</em>
            </small>
          </footer>
        </blockquote>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import genericMixins from '../mixins/'

export default {
  name: 'HomeView',

  mixins: [genericMixins],

  computed: {
    upcomingPlans () {
      return this.$store.getters.futurePlans
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
