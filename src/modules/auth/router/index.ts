import type { RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layout/AuthLayout.vue'
import SingInPage from '../pages/SingInPage.vue'

export const authRouter: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  component: AuthLayout,
  children: [
    {
      path: 'singin',
      name: 'auth-singin',
      component: SingInPage,
    },
  ]
}