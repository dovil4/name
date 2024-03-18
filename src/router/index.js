import { createRouter, createWebHistory } from 'vue-router'
import jobs from '../views/jobs.vue'
import salery from '../views/salary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: jobs
    },
    {
      path: '/salery',
      name: 'salery',
      component: salery
    }
  ]
})

export default router
