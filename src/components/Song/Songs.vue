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
              clearable
              single-line
              hide-details
              v-model="searchString"
            ></v-text-field>
          </v-card-title>

          <v-data-table
              :headers="headers"
              :items="songs"
              itemKey="key"
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
              <tr :class="[props.expanded ? 'blue-grey lighten-2' : '']">

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

                <td class="text-xs-center">
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :select-items="selectItems"
                      :song="props.item"
                      field="license"
                      field-name="License Type"
                      maxLength="10"
                    ></app-edit-song-field>
                  <span v-else>{{ props.item.license }}</span>
                </td>

                <td class="no-wrap">
                  <app-edit-song-field
                      v-if="userIsAdmin && props.expanded"
                      :song="props.item"
                      field="youtube_id"
                      field-name="Youtube ID"
                      maxLength="15"
                    ></app-edit-song-field>
                  <a  v-else-if="props.item.youtube_id" target="new"
                      class="youtube-link"
                      title="play song clip in new tab"
                      :href="'https://www.youtube.com/watch?v=' + props.item.youtube_id"
                    ><v-icon class="youtube-link">subscriptions</v-icon></a>
                </td>

              </tr>
            </template>

            <template slot="expand" slot-scope="props">
              <v-card class="grid blue-grey lighten-4">
                <v-container fluid grid-list-md>
                  <v-layout row wrap>

                    <v-flex md4>
                      <h6 class="mb-1 subheading">Lyrics:</h6>
                      <app-edit-song-textarea-field
                          v-if="userIsAdmin && props.expanded"
                          :song="props.item"
                          field="lyrics"
                        ></app-edit-song-textarea-field>
                      <pre v-else-if="props.item.lyrics" class="grey lighten-3 pa-1 elevation-5 overflow-hidden">{{ 
                          props.item.lyrics | maxLines(5, 'exact') 
                        }}</pre>
                    </v-flex>

                    <v-flex md4>
                      <h6 class="mb-1 subheading">Chords:</h6>
                      <app-edit-song-textarea-field
                          v-if="userIsAdmin && props.expanded"
                          :song="props.item"
                          field="chords"
                        ></app-edit-song-textarea-field>
                      <pre v-else-if="props.item.chords" class="grey lighten-3 pa-1 elevation-5 overflow-hidden">{{ 
                          props.item.chords | maxLines(5, 'exact') 
                        }}</pre>
                      <pre v-else class="grey lighten-3 pa-1 elevation-5 text-xs-center">{{ '\n\n(missing)\n\n\n' }}</pre>
                    </v-flex>

                    <v-flex md4>
                      <h6 class="mb-1 subheading">Other Data:</h6>
                      <v-card style="height: 103px"
                       class="grey lighten-3 pa-1 elevation-5 overflow-hidden">
                        <v-card-text class="pa-0">
                          <app-edit-song-field
                            v-if="userIsAdmin && props.expanded"
                            :song="props.item"
                            field="ccli_no"
                            field-name="CCLI Number"
                            show-label
                            maxLength="15"
                          ></app-edit-song-field>
                          <span v-else>
                            <span class="body-2 no-wrap mw-120">CCLI Number:</span>
                            {{ props.item.ccli_no || 'n/a' }}</span>
                        </v-card-text>
                        <v-card-text class="pa-0">
                          <app-edit-song-field
                            v-if="userIsAdmin && props.expanded"
                            :song="props.item"
                            field="sequence"
                            field-name="Song Parts Seq."
                            show-label
                            maxLength="50"
                          ></app-edit-song-field>
                          <span v-else>
                            <span class="body-2 no-wrap mw-120">Song Parts Seq.:</span>
                            {{ props.item.sequence || 'n/a' }}</span>
                        </v-card-text>
                        <v-card-text class="pa-0">
                          <app-edit-song-field
                            v-if="userIsAdmin && props.expanded"
                            :song="props.item"
                            field="hymnaldotnet_id"
                            field-name="Hymnal.Net ID"
                            show-label
                            maxLength="15"
                          ></app-edit-song-field>
                          <span v-else>
                            <span class="body-2 no-wrap mw-120">Hymnal.Net ID:</span>
                            {{ props.item.hymnaldotnet_id || 'n/a' }}</span>
                        </v-card-text>
                        <v-card-text class="pa-0">
                          <app-edit-song-field
                            v-if="userIsAdmin && props.expanded"
                            :song="props.item"
                            showLabel
                            field="link"
                            field-name="Other links"
                            maxLength="-1"
                          ></app-edit-song-field>
                          <span v-else>
                            <span class="body-2 no-wrap mw-120">Other links:</span>
                            {{ props.item.link || 'n/a' }}</span>
                        </v-card-text>
                      </v-card>

                    </v-flex>

                  </v-layout>
                  onsong chords?
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
          { text: 'License', value: 'license', align: 'center' },
          { text: 'Clip', value: 'youtube_id', align: 'left' }
        ],
        selectItems: [
          { text: 'PD' },
          { text: 'CCLI' },
          { text: 'Unknown' },
          { text: 'Other' }
        ],
        standAlone: true,
        searchString: ''
      }
    },

    created () {
      // only show title when this is not a component of the Admin page
      this.standAlone = (this.$route.name === 'admin')
    },

    methods: {
      doThis (id) {
        console.log('doing something with', this.songs[id].title)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
