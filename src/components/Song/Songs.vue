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
                  click to sort by {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>

            <template slot="items" slot-scope="props">
              <tr :class="[props.expanded ? 'grey lighten-2' : '']">

                <td class="cursor-pointer text-xs-right no-wrap"
                    @click="props.expanded = !props.expanded"
                    :title="[props.expanded ? 'click for less details' : 'click for more details']"
                  ><v-icon>{{ props.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>{{ props.item.id }}
                </td>

                <td :title="props.item.lyrics">
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="title"
                      required="true"
                      maxLength="50"
                    ></app-edit-song-field>
                  <span v-else>{{ props.item.title }}</span>
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="title_2"
                      fieldName="Subtitle"
                      maxLength="50"
                    ></app-edit-song-field>
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

                <td>
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="book_ref"
                      field-name="Book Reference Number"
                      maxLength="20"
                    ></app-edit-song-field>
                  <span v-else>{{ props.item.book_ref }}</span>
                </td>

                <td>
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="ccli_no"
                      field-name="CCLI Number"
                      maxLength="15"
                    ></app-edit-song-field>
                  <span v-else>{{ props.item.ccli_no }}</span>
                </td>

                <td class="text-xs-center">{{ props.item.license }}</td>

              </tr>
            </template>

            <template slot="expand" slot-scope="props">
              <v-card class="grid">
                <v-container fluid grid-list-lg>
                  <v-layout row wrap>

                    <v-flex xs4>
                      <h6 class="mb-1 subheading">Lyrics:</h6>
                      <app-edit-song-textarea-field
                          v-if="userIsAdmin && props.expanded"
                          :song="props.item"
                          field="lyrics"
                        ></app-edit-song-textarea-field>
                      <pre v-else-if="props.item.lyrics" class="grey lighten-3 pa-1 elevation-5 overflow-hidden">{{ 
                          '\n' + props.item.lyrics | maxLines(5) 
                        }}</pre>
                    </v-flex>

                    <v-flex xs4>
                      <h6 class="mb-1 subheading">Chords:</h6>
                      <app-edit-song-textarea-field
                          v-if="userIsAdmin && props.expanded"
                          :song="props.item"
                          field="chords"
                        ></app-edit-song-textarea-field>
                      <pre v-else class="grey lighten-3 pa-1 elevation-5 overflow-hidden">{{ 
                          props.item.chords | maxLines(5) 
                        }}</pre>
                    </v-flex>

                    <v-flex xs4 class="text-xs-right">
                      <v-menu bottom left>
                        <v-btn icon slot="activator">
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                        <v-list>
                          <v-list-tile @click="doThis(props.item.id)">
                            <v-list-tile-title>do This</v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile @click="doThis(props.item.id)">
                            <v-list-tile-title>do That</v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </v-flex>

                  </v-layout>
                </v-container>
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
        this.songList = []
        for (let key in this.songs) {
          this.songList.push(this.songs[key])
        }
      },

      doThis (id) {
        console.log('doing something with', this.songs[id].title)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
