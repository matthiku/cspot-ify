import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared'
import user from './user'
import plan from './plan'
import type from './type'
import role from './role'
import item from './item'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    shared,
    user,
    plan,
    type,
    role,
    item
  }
})
