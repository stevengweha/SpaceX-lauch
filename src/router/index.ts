import { createRouter, createWebHistory } from 'vue-router'
import LaunchesView from '../views/LaunchesView.vue'
import RocketsView from '../views/RocketsView.vue'

// Configuration du router pour navigation entre les vues.

const routes = [
  { path: '/', component: LaunchesView },
  { path: '/rockets', component: RocketsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
