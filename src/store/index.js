import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared'
import plan from './plan'
import type from './type'
import role from './role'
import user from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    shared,
    plan,
    type,
    role,
    user
  }
})
