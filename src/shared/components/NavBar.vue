<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/authStore';
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const onLogOut = async () => {
  await signOut(getAuth())
  router.push({ name: 'auth-singin' })
}

</script>

<template>
  <div class="navbar bg-white">
    <div class="flex-1">
      <h1 class="text-xl text">Documentación & QA</h1>
    </div>
    <div class="flex-none">
      <div class="flex px-1">
       <RouterLink :to="{ name: 'home'}" class="text-sm mx-3 cursor-pointer">Inicio</RouterLink>
       <RouterLink v-if="authStore.isAdmin" :to="{ name: 'config-usuarios'}" class="text-sm mx-3 cursor-pointer">Configuraciones</RouterLink>
       <button @click="onLogOut" class="text-sm mx-3 cursor-pointer"> Salir </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>