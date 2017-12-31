<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">

      <v-layout column align-center>
        <h5 v-if="standAlone">Song List</h5>

        <v-data-table
            v-bind:headers="headers"
            :items="songList"
            :search="search.filter"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">

            <router-link
                tag="td"
                :to="{name: 'song', params: {songId: props.item.id}}"
                title="click to edit this song"
                style="cursor: pointer"
              >{{ props.item.id }}</router-link>

            <td class="text-xs-right">{{ props.item.title }}<span v-if="props.item.title_2">({{ props.item.title_2 }})</span></td>

            <td class="text-xs-right">{{ props.item.author }}</td>

            <td class="text-xs-right">{{ props.item.book_ref }}</td>

            <td class="text-xs-right">{{ props.item.ccli_no }}</td>

            <td class="text-xs-right">{{ props.item.license }}</td>

          </template>
        </v-data-table>
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
        headers: [
          { text: 'id', value: 'id', align: 'left', sortable: false },
          { text: 'Title', value: 'title' },
          { text: 'Author', value: 'author' },
          { text: 'Book Ref.', value: 'book_ref' },
          { text: 'CCLI No.', value: 'ccli_no' },
          { text: 'License', value: 'license' }
        ],
        standAlone: true,
        songList: []
      }
    },

    created () {
      // only show title when this is no a component of the Admin page
      this.standAlone = this.$router.name === 'admin'

      if (this.userIsAdmin) {
        this.headers[0].text = 'id (click id to edit item)'
      }
      this.updateSongsList()
    },

    watch: {
      songs () {
        this.updateSongsList()
      }
    },

    methods: {
      updateSongsList () {
        // morph the songs object into an array of songs
        for (let key in this.songs) {
          this.songList.push(this.songs[key])
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
