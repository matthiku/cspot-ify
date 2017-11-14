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
          v-for="(item, i) in menuItems"
          :key="i"
          value="true"
          v-if="(item.auth=='user' && user.id) || (!user.id && !item.auth) || (item.auth=='admin' && user.isAdmin)"
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


    <v-toolbar fixed app :clipped-left="clipped" class="primary">

      <v-toolbar-side-icon 
        @click.stop="drawer = !drawer"
        :class="[ user.isAdmin ? '' : 'hidden-sm-and-up' ]"
      ></v-toolbar-side-icon>

      <v-btn icon>
        <router-link to="/"><img src="/static/cspoticon36.png" alt="c-SPOT icon" width="30px"></router-link>
      </v-btn>

      <v-toolbar-title v-text="title"></v-toolbar-title>      

      <v-toolbar-items class="hidden-xs-only">        
        <v-btn flat
          v-for="(item, i) in menuItems"
          :key="i"
          v-if="(item.auth=='user' && user.id) || (!user.id && !item.auth) || (item.auth=='admin' && user.isAdmin)"
        ><v-icon>{{ item.icon }}</v-icon>{{ item.title }}</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn icon 
        @click.stop="rightDrawer = !rightDrawer"
        class="hidden-sm-and-up"
        >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>


    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>


    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      class="hidden-sm-and-up"
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
        title: 'c-SPOT',
        user: {
          id: 123,
          isAdmin: false
        },
        clipped: true,
        drawer: true,
        menuItems: [
          {
            icon: 'bubble_chart',
            title: 'Administration',
            component: 'admin',
            auth: 'admin'
          },
          {
            icon: 'group',
            title: 'User List',
            component: 'userlist',
            auth: 'admin'
          },
          {
            icon: 'change_history',
            title: 'Next Sunday',
            component: 'nextplan',
            auth: 'user'
          },
          {
            icon: 'perm_identity',
            title: 'Profile',
            component: 'profile',
            auth: 'user'
          },
          {
            icon: 'face',
            title: 'Sign in',
            component: 'signin',
            auth: false
          },
          {
            icon: 'lock_open',
            title: 'Sign up',
            component: 'signup',
            auth: false
          }
        ],
        right: true,
        rightDrawer: false
      }
    }
  }

</script>
