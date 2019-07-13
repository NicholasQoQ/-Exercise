import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login'

import heard from '../views/heard'

import home from '../views/home/home.vue'

import other from '../views/other/other.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: heard,
    children: [{
      name: 'home',
      path: '/',
      component: home
    }]
  },

  // 其他路由位置
  { name: 'oter', path: '*', component: other }
  ]
})

export default (router)
