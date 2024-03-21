<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/authStore';
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { HomeUser } from '@iconoir/vue'

const router = useRouter()
const authStore = useAuthStore()

const onLogOut = async () => {
  await signOut(getAuth())
  router.push({ name: 'auth-singin' })
}

const closeMenu = () => {
  const elem = document.activeElement as HTMLElement;
  if (elem) {
    elem.blur();
  }
}

</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Documentación y QA</a>
    </div>
    <div class="flex-none gap-2">
      <RouterLink :to="{ name: 'home' }" class="text-sm mx-3 cursor-pointer">Inicio</RouterLink>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <HomeUser />
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li @click="closeMenu" class="my-2">
            <RouterLink :to="{ name: 'perfil-editar-usuario' }" class="justify-between">
              {{ authStore.name }}
            </RouterLink>
          </li>
          <hr>
          <li @click="closeMenu" v-if="authStore.isAdmin" class="my-2">
            <RouterLink :to="{ name: 'config-usuarios' }" class="text-sm cursor-pointer">
              Configuraciones</RouterLink>
          </li>
          <li @click="closeMenu" class="my-2"><button @click="onLogOut" class="text-sm cursor-pointer"> Salir </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>