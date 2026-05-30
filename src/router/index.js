import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

function adminGuard(to, from, next) {
  if (sessionStorage.getItem('admin_token') === 'xiu_admin_authenticated') {
    next()
  } else {
    next('/admin/login')
  }
}

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/services', name: 'Services', component: () => import('../views/ServicesView.vue') },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/qa', name: 'QA', component: () => import('../views/QAView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
  { path: '/admin/login', name: 'AdminLogin', component: () => import('../views/admin/AdminLogin.vue') },
  { path: '/admin', name: 'AdminDashboard', component: () => import('../views/admin/AdminDashboard.vue'), beforeEnter: adminGuard },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
