import MainLayout from '@/shared/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';
import InicioQaPage from '../pages/InicioQaPage.vue';

export const qaRouter: RouteRecordRaw = {
  path: '/qa',
  name: 'qa-inicio',
  component: MainLayout,
  children: [
    {
      path: ':proyect',
      name: 'qa-proyectos',
      component: InicioQaPage,
    },
  ],
  meta: {
    requiresAuth: true
  }
}