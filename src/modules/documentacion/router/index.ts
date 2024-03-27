import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/shared/layouts/MainLayout.vue'
import InicialDocPage from '../pages/InicialDocPage.vue'
import NewDocPage from '../pages/NewDocPage.vue'

export const docRouter: RouteRecordRaw = {
  path: '/documentos',
  name: 'docs-inicio',
  component: MainLayout,
  children: [
    {
      path: ':proyect/:idEntrada?',
      name: 'docs-proyectos',
      component: InicialDocPage,
    },
    {
      path: 'doc-new/:proyect/:idEntrada?',
      name: 'docs-new',
      component: NewDocPage,
    },
  ],
  meta: {
    requiresAuth: true
  }
}