<template>
  <v-container fluid px-0>
    <v-slide-y-transition mode="out-in">

    <v-layout row justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-card-text class="pa-2">

            <!-- Alert Panel -->
            <v-container v-if="error || message">
              <v-layout row>
                <v-flex xs12>
                  <app-alert v-if="error" @dismissed="onDismissed('clearError')" :text="error"></app-alert>
                  <app-success v-if="message" @dismissed="onDismissed('clearMessage')" :text="message"></app-success>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container fluid px-0>
              <v-layout>
                <v-flex xs12>

                  <v-card-title>
                    <h4>Your User Profile</h4>
                    <v-spacer></v-spacer>
                    <v-avatar
                        size="60"
                        class="grey lighten-4">
                      <img 
                        v-if="user.providerData && user.providerData.length && user.providerData[0].photoURL"
                        style="max-height:60px!important"
                        :src="user.providerData[0].photoURL" :alt="user.displayName">
                      <img v-else style="max-height:60px!important" src="\static\cspoticon72.png" alt="this could be your photo!">
                    </v-avatar>
                  </v-card-title>

                  <v-form ref="form" lazy-validation v-model="valid">

                    <v-text-field label="Name"
                        v-model="user.name"
                        @keyup.enter="submit"
                      >
                    </v-text-field>

                    <v-layout row wrap>
                      <v-flex xs12 sm10 md8>
                        <v-text-field label="E-mail" class="mb-0 pb-0"
                            v-model="user.email"
                            @keyup.enter="submit"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm2 md4>
                        <div class="ml-3 mb-0" :class="[user.verified ? '' : 'red--text']">
                          <v-icon class="primary--text">
                            {{ user.verified ? 'done' : 'warning' }}
                          </v-icon>
                          Email {{ user.verified ? 'verified' : 'unverified!' }}
                          <span v-if="!user.verified" class="small">You have only limited access.</span>
                        </div>
                      </v-flex>
                    </v-layout>

                    <v-layout row class="mt-3">
                      <label>Assign<span v-if="!userIsAdmin">ed</span> Roles:</label>
                    </v-layout>
                    <v-layout row wrap class="mt-0">
                      <v-flex sm3 lg2 xl1 class="my-0"
                        v-for="(role, index) in rolesList" 
                        :key="index">
                        <v-checkbox 
                            v-bind:label="role"
                            :disabled="!userIsAdmin"
                            :title="role"
                            :value="role"
                            v-model="userRoles" light
                          ></v-checkbox>
                      </v-flex>
                    </v-layout>

                    <div>
                      <span class="caption">Profile completion:</span>
                      <v-progress-linear class="mt-0 pt-0" v-model="profileComplete"></v-progress-linear>
                    </div>

                    <v-divider></v-divider>
                    <v-card-actions class="pa-3">
                      <v-btn @click="submit" :disabled="!valid">update</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="resendEmailVerification">Re-send Email-Verification</v-btn>
                    </v-card-actions>

                    <v-divider></v-divider>
                    <v-card class="mt-2 pa-0" v-if="user.providerData && user.providerData.length">
                      <div v-for="(prov, id) in user.providerData" :key="id">
                        <v-card-text>
                          <span class="blue--text">Authentication Provider:</span> {{ prov.providerId }}
                          <v-spacer></v-spacer>
                          <span class="blue--text">Photo URL:</span> {{ prov.photoURL }}
                        </v-card-text>
                        <v-divider></v-divider>
                      </div>
                    </v-card>

                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import genericMixins from '../../mixins/'

  export default {
    mixins: [genericMixins],

    data () {
      return {
        valid: false,
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        rolesList: [],
        userRoles: []
      }
    },

    computed: {
      profileComplete () {
        let v = 50
        if (this.user.name) v += 25
        if (this.user.verified) v += 25
        return v
      }
    },

    created () {
      // create list of possible roles
      for (let role in this.roles) {
        this.rolesList.push(role)
      }
      // create list of roles actually assigned to this user
      this.user.roles.forEach(element => {
        this.userRoles.push(element)
      })
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.user.roles = this.userRoles
          const userData = {
            id: this.user.id,
            email: this.user.email,
            name: this.user.name,
            roles: this.userRoles
          }
          this.$store.dispatch('updateUserProfile', userData)
        }
      },
      resendEmailVerification () {
        this.$store.dispatch('sendEmailVerification')
        this.$store.dispatch('setLoading', true)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
