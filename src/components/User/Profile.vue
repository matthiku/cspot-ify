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
                <v-flex xs12 v-if="user">

                  <v-card-title>
                    <h4><span v-if="ownProfile">Your</span><span v-else>A</span> User Profile</h4>
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
                      Init:<strong class="mr-3">{{ initRoles }}</strong>
                      Current:<strong class="mr-3">{{ userRoles }}</strong> 
                      Add:<strong class="mr-3">{{ addRoles }}</strong> 
                      Remove:<strong class="mr-3">{{ removeRoles }}</strong>
                    </v-card>

                  </v-form>
                </v-flex>
                <v-flex v-else>no user data</v-flex>
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
        rolesList: [], // list of available roles
        userRoles: [], // roles currently assigned to this user
        initRoles: [], // keep record of the initial state
        addRoles: [],  // which roles are to be added for this user?
        removeRoles: [] // which roles are to be removed from this user?
      }
    },

    computed: {
      profileComplete () {
        let v = 50
        if (this.user.name) v += 25
        if (this.user.verified) v += 25
        return v
      },
      ownProfile () {
        return this.$route && this.$route.name === 'profile'
      },
      // get user depending on current route!
      user () {
        if (this.ownProfile) {
          return this.$store.getters.user
        }
        if (!this.users) return {}
        return this.users[this.$route.params.userId]
      }
    },

    watch: {
      userRoles (newRoles) {
        if (!this.rolesList) return
        console.log('\n')
        // loop through all existing roles
        for (let idx in this.rolesList) {
          let role = this.rolesList[idx]
          let posInInit = this.initRoles.indexOf(role)
          let posInNew = newRoles.indexOf(role)
          let posInRemove = this.removeRoles.indexOf(role)
          let posInAdd = this.addRoles.indexOf(role)
          // Do we have a role to be added?
          if (posInInit < 0 && posInNew > -1) {
            // put it into the ADD list if not there yet
            if (posInAdd < 0) this.addRoles.push(role)
            // make sure the role is not in the REMOVE list
            if (posInRemove > -1) this.removeRoles.splice(posInRemove, 1)
          }
          // Do we have a role to be removed that was there initially?
          if (posInInit > -1 && posInNew < 0) {
            // put it into the REMOVE list if not there yet
            if (posInRemove < 0) this.removeRoles.push(role)
            // remove it from the ADD list if necessary
            if (posInAdd > -1) this.addRoles.splice(posInAdd, 1)
          }
          // Do we have a role to be removed that was NOT there initially?
          // (the user had added it earlier in this session)
          if (posInInit < 0 && posInAdd > -1 && posInNew < 0) {
            // get it OUT OF the REMOVE list if necessary
            if (posInRemove > -1) this.removeRoles.splice(posInRemove, 1)
            // remove it from the ADD list if necessary
            if (posInAdd > -1) this.addRoles.splice(posInAdd, 1)
          }
          // a role was clicked again (the user can't make up this mind...)
          if ((posInInit > -1) && posInNew > -1) {
            // remove it from the ADD list if necessary
            if (posInAdd > -1) this.addRoles.splice(posInAdd, 1)
            // remove it from the REMOVE list if necessary
            if (posInRemove > -1) this.removeRoles.splice(posInRemove, 1)
          }
        }
      },

      $route (value) {
        // when moving from any user's profile to your own, we neet to do:
        this.createRolesArrays()
        // (as 'mounted()' won't trigger!)
      }
    },

    created () {
      this.createRolesArrays()
      this.refreshInitRoles()
    },

    methods: {

      refreshInitRoles () {
        this.initRoles = []
        for (let r in this.userRoles) {
          this.initRoles.push(this.userRoles[r])
        }
      },

      createRolesArrays () {
        // create list of possible roles
        this.rolesList = []
        for (let role in this.roles) {
          this.rolesList.push(role)
        }
        // create list of roles actually assigned to this user
        if (this.user.roles) {
          this.userRoles = []
          this.user.roles.forEach(element => {
            this.userRoles.push(element)
          })
        }
      },

      submit () {
        if (this.$refs.form.validate()) {
          this.user.roles = this.userRoles
          const userData = {
            id: this.user.id,
            email: this.user.email,
            name: this.user.name,
            roles: this.userRoles
          }
          // update the user profile
          this.$store.dispatch('updateUserProfile', userData)
          // update the list of roles and their users
          this.$store.dispatch('updateRolesUserList', {
            user: this.user,
            add: this.addRoles,
            remove: this.removeRoles
          })
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
