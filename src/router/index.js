import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/plans/:category?',
    name: 'plans',
    component: () => import('@/views/PlansView.vue'),
  },
  { path: '/empresa', name: 'company', component: () => import('@/views/CompanyView.vue') },
  { path: '/sobre-nosaltres', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/acces-client', name: 'clientAccess', component: () => import('@/views/ClientAccessView.vue') },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('@/views/NotFoundView.vue') },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
