import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import DiscordController from '@/components/DiscordController.vue';

const routes = [
  {
    path: '/discord',
    name: 'DiscordController',
    component: DiscordController,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
