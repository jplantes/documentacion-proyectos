import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/modules/auth/composables/authComposable'
import { useAuthStore } from '@/modules/auth/store/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/shared/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/documentos',
      name: 'docs-inicio',
      component: () => import('@/shared/layouts/MainLayout.vue'),
      children: [
        {
          path: ':proyect',
          name: 'docs-proyectos',
          component: () => import('@/modules/documentacion/pages/InicialDocPage.vue'),
        },
        {
          path: 'doc-new',
          name: 'docs-new',
          component: () => import('@/modules/documentacion/pages/NewDocPage.vue'),
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/qa',
      name: 'qa-inicio',
      component: () => import('@/shared/layouts/MainLayout.vue'),
      children: [
        {
          path: ':proyect',
          name: 'qa-proyectos',
          component: () => import('@/modules/qa/pages/InicioQaPage.vue'),
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('@/shared/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'config-inicio',
          component: () => import('@/modules/config/pages/InicioConfigPage.vue'),
          children: [
            {
              path: 'usuarios',
              name: 'config-usuarios',
              component: () => import('@/modules/config/pages/UsuariosConfigPage.vue'),
            },
            {
              path: 'nuevo-usuario/:uuid?',
              name: 'config-nuevo-usuario',
              component: () => import('@/modules/config/pages/NuevoUsuarioConfigPage.vue'),
            },
            {
              path: 'proyectos',
              name: 'config-proyectos',
              component: () => import('@/modules/config/pages/ProyectosConfigPage.vue'),
            },
            {
              path: 'nuevo-proyecto',
              name: 'config-nuevo-proyecto',
              component: () => import('@/modules/config/pages/NuevoProyectoConfigPage.vue'),
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
        isAdmin: true,
      }
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/modules/auth/layout/AuthLayout.vue'),
      children: [
        {
          path: 'singin',
          name: 'auth-singin',
          component: () => import('@/modules/auth/pages/SingInPage.vue'),
        },

      ]
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/shared/pages/404NotFound.vue')
    },
  ]
})


const getCurrenteUser = async () => {
  const { leerPermisos } = useAuth()
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      user => {
        unsubscribe()
        leerPermisos()
        resolve(user)
      },
      reject
    )
  })
}


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some(record => record.meta.isAdmin)) {
    // Si el usuario no es admin lo redirigimos al home
    authStore.isAdmin ? next() : next('/')
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si el usuario no esta autenticado lo redirigimos a la pagina de autenticacion 
    await getCurrenteUser() ? next() : next('/auth/singin')
  } else {
    // Si el usuario esta autenticado y quiere ir a la pagina de autenticacion lo redirigimos al home
    (await getCurrenteUser() && to.path.includes('/auth')) ? next('/') : next()
  }
})

export default router
