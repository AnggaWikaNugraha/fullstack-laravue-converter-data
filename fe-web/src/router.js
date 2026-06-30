import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Convert from './pages/Convert.vue'
import JsonToExcel from './pages/JsonToExcel.vue'
import ColorConverter from './pages/ColorConverter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/convert', component: Convert },
    { path: '/json-to-excel', component: JsonToExcel },
    { path: '/color', component: ColorConverter },
  ],
})

export default router
