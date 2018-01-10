<template>
  <span>

    <v-chip v-if="songsCount" outline color="primary" class="plan-actions-title ma-0">
      <v-icon color="primary">record_voice_over</v-icon> &nbsp;
      {{ songsCount }} 
      songs
    </v-chip>

    <v-chip v-if="othersCounts" outline color="primary" class="plan-actions-title ma-0">
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

  data () {
    return {
      songsCount: 0,
      scripturesCount: 0,
      othersCounts: 0
    }
  },

  created () {
    if (!this.plan) return
    if (!this.plan.actionList) return

    let actions = this.plan.actionList
    for (let index = 0; index < actions.length; index++) {
      const item = actions[index]
      if (item.type === 'song') this.songsCount++
      else if (item.type === 'scripture') this.scripturesCount++
      else this.othersCounts++
    }
  }
}
</script>
