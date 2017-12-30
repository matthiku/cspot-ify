<template>
  <v-card>

    <v-card-text class="grey lighten-3 pb-1">item 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, veritatis?</v-card-text>

    <v-menu offset-y v-model="showMenu" absolute full-width>
      <v-card-text class="grey lighten-3" slot="activator">
        item 2 Lorem ipsum dolor sit amet.
      </v-card-text>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-card-text class="grey lighten-3 py-1">item 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. </v-card-text>
    <v-card-text class="grey lighten-3 pt-1">item 4 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae explicabo repellendus repellat maiores similique quis quo sed? Rem doloremque blanditiis voluptatem molestiae! </v-card-text>

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
        show: false,
        showMenu: false,
        items: [
          { title: 'Edit this item' },
          { title: 'Add item above' },
          { title: 'Add item below' },
          { title: 'Delete this item' }
        ]
      }
    }
  }
</script>
