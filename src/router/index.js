import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Plan from '@/components/Plan/Plan'
import Plans from '@/components/Plan/Plans'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/plans',
      name: 'Plans',
      component: Plans
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ],
  mode: 'history'
})
