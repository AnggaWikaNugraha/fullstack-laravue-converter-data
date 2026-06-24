import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Convert from './pages/Convert.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/convert', component: Convert },
  ],
})

export default router
