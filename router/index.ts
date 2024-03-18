import { createRouter, createWebHistory } from 'vue-router'
import aview from '../src/views/aView.vue';
import bview from '../src/views/bview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bview',
      name: 'bview',
      component: bview
    },
    {
      path: '/aview',
      name: 'aview',
      component: aview
    },
  ]
})

export default router

