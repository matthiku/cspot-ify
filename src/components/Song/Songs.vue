<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">

      <v-layout column align-center>
        <v-card class="w-100">
          <v-card-title>
            <h5>Song Repository</h5>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="searchString"
            ></v-text-field>
          </v-card-title>

          <v-data-table
              :headers="headers"
              :items="songList"
              :search="searchString"
              :rows-per-page-items="[10, 15, 25, { text: 'All', value: -1 }]"
              no-data-text="No Songs found"
              no-results-text="No matching songs found"
              class="elevation-1">

            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>

            <template slot="items" slot-scope="props">
              <tr :class="[props.expanded ? 'grey lighten-2' : '']">

                <td class="cursor-pointer text-xs-right"
                    @click="props.expanded = !props.expanded"
                    :title="[props.expanded ? 'click for less details' : 'click for more details']"
                  ><v-icon>keyboard_arrow_down</v-icon>{{ props.item.id }}</td>

                <td :title="props.item.lyrics">
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="title"
                      maxLength="50"
                    ></app-edit-song-field>
                  <span v-else>{{ props.item.title }}</span>
                  <v-edit-dialog
                      v-if="userIsAdmin && props.expanded"
                      title="click to edit sub-title"
                      lazy
                    >({{ props.item.title_2 }})
                    <v-text-field
                      slot="input"
                      label="Edit"
                      v-model="props.item.title_2"
                      hint="Press Enter or Esc to close. Ctrl+z to undo changes."
                      single-line counter
                      :rules="[max50chars]"
                      @blur="updateSong(props.item.id, 'title_2')"
                    ></v-text-field>
                  </v-edit-dialog>
                  <span v-else-if="props.item.title_2">({{ props.item.title_2 }})</span>
                </td>

                <td>
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="author"
                      maxLength="40"
                    ></app-edit-song-field>
                  <span v-else>{{ props.item.author }}</span>
                </td>

                <td>{{ props.item.book_ref }}</td>

                <td>{{ props.item.ccli_no }}</td>

                <td class="text-xs-center">{{ props.item.license }}</td>

              </tr>
            </template>

            <template slot="expand" slot-scope="props">
              <v-card>
                <v-card-title>
                  <pre class="grey lighten-3 pa-1 elevation-5">Lyrics:{{ 
                      '\n' + props.item.lyrics | maxLines(5) 
                    }}</pre>
                  <v-spacer></v-spacer>
                  test
                  <v-spacer></v-spacer>
                  <v-btn fab small color="primary"><v-icon>info</v-icon></v-btn>
                  <v-btn fab small color="indigo"><v-icon>add</v-icon></v-btn>
                </v-card-title>
              </v-card>
            </template>

            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">
                No songs available yet
              </v-alert>
            </template>

          </v-data-table>
        </v-card>
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
          { text: 'id', value: 'id', align: 'right' },
          { text: 'Title', value: 'title', align: 'left' },
          { text: 'Author', value: 'author', align: 'left' },
          { text: 'Book Ref.', value: 'book_ref', align: 'left' },
          { text: 'CCLI No.', value: 'ccli_no', align: 'left' },
          { text: 'License', value: 'license', align: 'center' }
        ],
        standAlone: true,
        max50chars: (v) => v.length <= 50 || 'Input too long!',
        searchString: '',
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
      },
      updateSong (id, field) {
        this.$store.dispatch('updateSong', {id, field, value: this.songs[id][field]})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
