import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import HomeView from '../views/HomeView.vue'
import MainLayout from '@/shared/layouts/MainLayout.vue'

import { useAuth } from '@/modules/auth/composables/authComposable'
import { useAuthStore } from '@/modules/auth/store/authStore'

import { docRouter } from '../modules/documentacion/router'
import { qaRouter } from '../modules/qa/router'
import { perfilRouter, configRouter } from '../modules/config/router'
import { authRouter } from '@/modules/auth/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: MainLayout,
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
      ...docRouter,
      path: '/documentos',
    },
    {
      ...qaRouter,
      path: '/qa',
    },
    {
      ...perfilRouter,
      path: '/perfil',
    },
    {
      ...configRouter,
      path: '/config',
    },
    {
      ...authRouter,
      path: '/auth',
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
