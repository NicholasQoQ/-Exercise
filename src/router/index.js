import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login'

import heard from '../views/heard'

import home from '../views/home/home.vue'
import article from '../views/article'
import images from '../views/images'

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
    children: [
      { name: 'home', path: '/', component: home },
      { name: 'article', path: '/article', component: article },
      { name: 'images', path: '/image', component: images }
    ]
  },

  // 其他路由位置
  {
    name: 'oter',
    path: '*',
    component: other
  }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('heima')
  if (user) return next()
  return next('/login')
})
export default (router)
