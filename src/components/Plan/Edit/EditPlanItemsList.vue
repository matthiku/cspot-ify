<template>
  <v-card>

    <v-card-text class="grey lighten-3 pb-1">
      <v-list two-line>

        <!-- loop through all plan action items -->
        <v-list-tile avatar v-for="item in plan.itemList" v-bind:key="item.id">

          <v-list-tile-avatar :title="item.id">
            <v-icon class="grey lighten-1 white--text">{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <!-- show actual item detail -->
          <v-list-tile-content v-show="!item.warning">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.book_ref }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-content v-show="item.warning">
            <v-list-tile-sub-title class="red--text mt-0 pt-0">Removing {{ item.book_ref }} ({{ item.title }})?
              <v-btn flat small @click="removeStaff(item)" color="red">Yes<v-icon>info</v-icon></v-btn>
              <v-btn flat small @click="item.warning = false">Cancel<v-icon>highlight_off</v-icon></v-btn>
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action v-show="!item.warning" v-if="userOwnsThisPlan">
            <v-btn icon ripple title="remove this item" @click="item.warning = true">
              <v-icon color="red lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <p class="text-xs-center ma-0"> 
          <span v-if="!plan.itemList">no items added yet</span>
        </p>
      </v-list>
    </v-card-text>

    <v-menu offset-y v-model="showMenu" absolute full-width>
      <v-card-text class="grey lighten-3" slot="activator">
        item 2 Lorem ipsum dolor sit amet. This is an item with a menu
      </v-card-text>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-card-actions v-if="userOwnsThisPlan">
      <v-btn flat>Add Item</v-btn>
      <v-btn flat color="purple">Explore</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'help_outline' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
      </v-card-text>
    </v-slide-y-transition>

  </v-card>
</template>


<script>
  import genericMixins from '../../../mixins'
  import planMixins from '../mixins'

  export default {
    mixins: [genericMixins, planMixins],

    props: ['plan', 'userOwnsThisPlan'],

    data () {
      return {
        itemList: [],
        show: false,
        showMenu: false,
        menuItems: [
          { title: 'Edit this item' },
          { title: 'Add item above' },
          { title: 'Add item below' },
          { title: 'Delete this item' }
        ]
      }
    },

    methods: {
      removeStaff (item) {
        this.$store.dispatch('removeStaffFromPlan', {
          planId: this.plan.id,
          staffId: item.id
        })
      },

      createPlanItemsList () {
        this.plan.itemList = []
        this.itemList = []
        let planItems = this.plan.items
        if (!planItems || !this.songs) return

        for (let key in planItems) {
          let item = planItems[key]
          let obj = {
            type: item.type,
            id: item.id ? item.id : 0,
            key,
            warning: false
          }
          if (item.type === 'song' && this.songs[item.id]) {
            obj.icon = 'record_voice_over'
            obj.title = this.songs[item.id].title
            obj.book_ref = this.songs[item.id].book_ref
          }
          this.itemList.push(obj)
        }
        this.plan.itemList = this.itemList
      }
    },
    created () {
      this.createPlanItemsList()
    },
    watch: {
      plan () {
        this.createPlanItemsList()
      },
      users () {
        this.createPlanItemsList()
      }
    }
  }
</script>
