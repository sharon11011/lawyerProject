import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/services', name: 'Services', component: () => import('../views/ServicesView.vue') },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/qa', name: 'QA', component: () => import('../views/QAView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
