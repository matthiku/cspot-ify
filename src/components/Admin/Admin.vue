<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">

      <v-layout>
        <v-tabs dark grow>
          <v-toolbar color="cyan" dark>

            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Admin Page</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            
            <v-tabs-bar class="cyan" slot="extension">
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tabs-item href="#tab-0">
                User List
              </v-tabs-item>

              <v-tabs-item href="#tab-1">
                User Roles
              </v-tabs-item>

              <v-tabs-item
                  v-for="(item, i) in items"
                  :key="i"
                  :href="'#tabo-' + (i + 1)"
                >
                {{ item }}
              </v-tabs-item>
              
              <v-menu :nudge-width="100" right bottom>
                <v-tabs-item slot="activator">
                  Menu
                  <v-icon>arrow_drop_down</v-icon>
                </v-tabs-item>
                <v-list class="grey lighten-3">
                  <v-list-tile
                      tag="a"
                      v-for="n in 4"
                      :key="n"
                      @click=""
                    >
                    Item {{ n }}
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-tabs-bar>

          </v-toolbar>
          <v-tabs-items>
            
            <v-tabs-content id="tab-0">
              <app-admin-user-list></app-admin-user-list>
            </v-tabs-content>
            
            <v-tabs-content id="tab-1">
              <app-admin-role-list></app-admin-role-list>
            </v-tabs-content>

            <v-tabs-content
              v-for="i in 3"
              :key="i"
              :id="'tabo-' + i"
            >
              <v-card flat>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>

        </v-tabs>
      </v-layout>

    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          'Plan Types', 'videos', 'images'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
