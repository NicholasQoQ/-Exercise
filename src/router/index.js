import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login'

import heard from '../views/heard'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'heard',
    path: '/',
    component: heard
  }
  ]
})

export default (router)
