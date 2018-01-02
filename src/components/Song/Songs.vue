<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">

      <v-layout column align-center>
        <h5 v-if="!standAlone">Song List</h5>

        <v-data-table
            v-bind:headers="headers"
            :items="songList"
            :search="search.filter"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">

            <router-link class="text-xs-right"
                tag="td"
                :to="{name: 'song', params: {songId: props.item.id}}"
                title="click to edit this song"
                style="cursor: pointer"
              >{{ props.item.id }}</router-link>

            <td>{{ props.item.title }}<span v-if="props.item.title_2"> ({{ props.item.title_2 }})</span></td>

            <td>{{ props.item.author }}</td>

            <td>{{ props.item.book_ref }}</td>

            <td>{{ props.item.ccli_no }}</td>

            <td>{{ props.item.license }}</td>

          </template>
        </v-data-table>
      </v-layout>

    </v-slide-y-transition>
  </v-container>
</template>


<script>
  import genericMixins from '../../mixins/'
  import planMixins from '../Plan/mixins'

  export default {
    name: 'SongsList',

    mixins: [genericMixins, planMixins],

    data () {
      return {
        headers: [
          { text: 'id', value: 'id', align: 'right', sortable: true },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Author', value: 'author', align: 'left' },
          { text: 'Book Ref.', value: 'book_ref', align: 'left' },
          { text: 'CCLI No.', value: 'ccli_no', align: 'left' },
          { text: 'License', value: 'license', align: 'left' }
        ],
        standAlone: true,
        songList: []
      }
    },

    created () {
      // only show title when this is not a component of the Admin page
      this.standAlone = (this.$route.name === 'admin')
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
