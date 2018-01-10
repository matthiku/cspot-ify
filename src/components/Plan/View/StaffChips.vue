<template>
  <span>
    <v-chip outline color="primary" class="plan-actions-title ma-0">
      {{ Object.keys(plan.actions).length }} items
    </v-chip>
  </span>
</template>

<script>
import planMixins from '../mixins'

export default {
  mixins: [planMixins],

  props: ['plan'],

  methods: {
  }
}
</script>
