import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'

import Admin from '@/components/Admin/Admin'
import Users from '@/components/Admin/Users'
import User from '@/components/Admin/User'

import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'

import Plan from '@/components/Plan/Plan'
import Plans from '@/components/Plan/Plans'
import CreateItem from '@/components/Plan/CreateItem'
import CreatePlan from '@/components/Plan/CreatePlan'
import Item from '@/components/Plan/Item'
import Items from '@/components/Plan/Items'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/users',
      name: 'users',
      component: Users
    },
    {
      path: '/admin/users/{id}',
      name: 'user',
      component: User
    },
    {
      path: '/items',
      name: 'items',
      component: Items
    },
    {
      path: '/items/{id}',
      name: 'item',
      component: Item
    },
    {
      path: '/createitem',
      name: 'createitem',
      component: CreateItem
    },
    {
      path: '/createplan',
      name: 'createplan',
      component: CreatePlan
    },
    {
      path: '/plans',
      name: 'plans',
      component: Plans
    },
    {
      path: '/plans/{id}',
      name: 'plan',
      component: Plan
    },
    {
      path: '/nextplan',
      name: 'nextplan',
      component: Plan
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ],
  mode: 'history'
})
