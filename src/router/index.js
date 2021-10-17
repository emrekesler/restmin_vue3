import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Collections from '../views/Collections.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }, {
    path: '/collections',
    name: 'Collections',
    component: Collections
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
