// Esta se administra desde el portal de admin
<script setup lang="ts">
import { useAuth } from '../composables/authComposable';

const { email, password, isLoading, messageError, onLogin } = useAuth()
</script>

<template>
  <div class="flez flex-row">
    <h3 class="text-3xl mb-2 text-center">¡Bienvenido!</h3>
    <p class="mb-3 text-center">Logueate para acceder a la plataforma</p>

    <div v-if="messageError !== ''" role="alert" class="alert alert-error mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{{ messageError }}</span>
    </div>

    <form @submit.prevent="onLogin">
      <div class="flex flex-col mb-5">
        <label>Email:</label>
        <input v-model="email" type="email" class="input input-bordered w-full" />
      </div>

      <div class="flex flex-col mb-5">
        <label>Contraseña:</label>
        <input v-model="password" type="password" class="input input-bordered w-full" />
      </div>


      <div class="mt-8">
        <button v-if="!isLoading" type="submit" class="btn btn-success btn-block">Ingresar</button>

        <button v-else class="btn btn-success btn-block" disabled>
          <span class="loading loading-spinner"></span>
          Buscando usuario
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>