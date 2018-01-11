<template>
  <span>

    <v-chip v-if="songsCount" outline color="primary" class="plan-actions-title ma-0">
      <v-icon color="primary">record_voice_over</v-icon> &nbsp;
      {{ songsCount }} 
      songs
    </v-chip>

    <v-chip v-if="othersCounts" outline color="primary" class="plan-actions-title ma-0">
      <v-icon color="primary">menu</v-icon> &nbsp;
      {{ othersCounts }} items
    </v-chip>

    <v-chip v-if="scripturesCount" outline color="primary" class="plan-actions-title ma-0">
      {{ scripturesCount }} items
    </v-chip>

    <small v-if="songsCount + scripturesCount + othersCounts === 0">(none)</small>

  </span>
</template>


<script>
export default {
  props: ['plan'],

  computed: {
    songsCount () {
      return this.getCounter(this.plan.actionList, 'song')
    },
    scripturesCount () {
      return this.getCounter(this.plan.actionList, 'scripture')
    },
    othersCounts () {
      return this.getCounter(this.plan.actionList, 'text')
    }
  },

  methods: {
    getCounter (actions, type) {
      if (!this.plan) return
      if (!actions) return

      let counter = 0
      for (let index = 0; index < actions.length; index++) {
        const item = actions[index]
        if (item.type === type) counter++
      }
      return counter
    }
  },

  created () {
  }
}
</script>
