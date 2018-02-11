import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/console' },
    { path: '/console', name: 'console', component: () => import('@/views/console') },
    { path: '/devices', name: 'devices', component: () => import('@/views/devices') }
  ]
})
