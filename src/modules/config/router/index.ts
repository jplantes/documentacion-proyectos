import MainLayout from '@/shared/layouts/MainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'
import EditarUsuarioConfigPage from '../pages/EditarUsuarioConfigPage.vue'
import InicioConfigPage from '../pages/InicioConfigPage.vue'
import UsuariosConfigPage from '../pages/UsuariosConfigPage.vue'
import NuevoUsuarioConfigPage from '../pages/NuevoUsuarioConfigPage.vue'
import ProyectosConfigPage from '../pages/ProyectosConfigPage.vue'
import NuevoProyectoConfigPage from '../pages/NuevoProyectoConfigPage.vue'

export const perfilRouter: RouteRecordRaw = {
  path: '/perfil',
  name: 'perfil',
  component: MainLayout,
  children: [
    {
      path: 'editar',
      name: 'perfil-editar-usuario',
      component: EditarUsuarioConfigPage,
    },
  ],
  meta: {
    requiresAuth: true
  }
}

export const configRouter: RouteRecordRaw = {
  path: '/config',
  name: 'config',
  component: MainLayout,
  children: [
    {
      path: '',
      name: 'config-inicio',
      component: InicioConfigPage,
      children: [
        {
          path: 'usuarios',
          name: 'config-usuarios',
          component: UsuariosConfigPage,
          meta: { isAdmin: true },
        },
        {
          path: 'nuevo-usuario/:uuid?',
          name: 'config-nuevo-usuario',
          component: NuevoUsuarioConfigPage,
          meta: { isAdmin: true },
        },
        {
          path: 'proyectos',
          name: 'config-proyectos',
          component: ProyectosConfigPage,
          meta: { isAdmin: true },
        },
        {
          path: 'nuevo-proyecto',
          name: 'config-nuevo-proyecto',
          component: NuevoProyectoConfigPage,
          meta: { isAdmin: true },
        },
        {
          path: '',
          redirect: { name: 'config-usuarios' },
        }
      ],
    },
  ],
  meta: {
    requiresAuth: true,
  }
}