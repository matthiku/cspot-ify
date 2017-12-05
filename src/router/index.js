import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'

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
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/users',
      name: 'users',
      component: Users,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/users/:userId',
      name: 'user',
      component: User,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/items',
      name: 'items',
      component: Items,
      beforeEnter: AuthGuard
    },
    {
      path: '/items/:itemId',
      name: 'item',
      component: Item,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/createitem',
      name: 'createitem',
      component: CreateItem,
      beforeEnter: AuthGuard
    },
    {
      path: '/createplan',
      name: 'createplan',
      component: CreatePlan,
      beforeEnter: AuthGuard
    },
    {
      path: '/plans',
      name: 'plans',
      component: Plans,
      beforeEnter: AuthGuard
    },
    {
      path: '/plans/:planId',
      name: 'plan',
      props: true,
      component: Plan,
      beforeEnter: AuthGuard
    },
    {
      path: '/nextsunday',
      name: 'nextsunday',
      component: Plan,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
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
