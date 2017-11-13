<template>
  <v-app>

    <v-navigation-drawer
      persistent
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          value="true"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon>
        <img src="/static/cspoticon36.png" alt="c-SPOT icon" width="20px">
      </v-btn>
      <v-btn flat>Next Sunday</v-btn>

      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>      
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>


    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">

            <v-layout column align-center>
              <img src="/static/cspoticon.png" alt="c-SPOT icon" class="mb-5">
              <blockquote>
                &#8220;Leave the presence of a fool, for there you do not meet words of knowledge.&#8221;
                <footer>
                  <small>
                    <em>&mdash;King Solomon</em>
                  </small>
                </footer>
              </blockquote>
            </v-layout>

          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>


    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-footer fixed app>
      <span>&copy; 2017 Matthias Kuhs</span>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        items: [
          {
            icon: 'bubble_chart',
            title: 'Administration'
          },
          {
            icon: 'group',
            title: 'User List'
          }
        ],
        right: true,
        rightDrawer: false,
        title: 'c-SPOT'
      }
    }
  }

</script>
