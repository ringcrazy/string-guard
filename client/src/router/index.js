import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Settings from '@/components/settings'
import Show from '@/components/show'
import Modify from '@/components/modify'
import Info from '@/components/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/show',
      component: Show
    },
    {
      path: '/modify',
      component: Modify
    },
    {
      path: '/info',
      component: Info
    }
  ]
})
