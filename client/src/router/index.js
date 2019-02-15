import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Tippa from '@/components/Tippa'
import Live from '@/components/Live'
import Login from '@/components/Login'
import History from '@/components/History'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tippa',
      name: 'tippa',
      component: Tippa
    },
    {
      path: '/live',
      name: 'live',
      component: Live
    },
    {
      path: '/history',
      name: 'history',
      component: History
    }
  ]
})
