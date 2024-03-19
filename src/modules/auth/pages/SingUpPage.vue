// Esta se administra desde el portal de admin
<script setup lang="ts">
import { useAuth } from '../composables/authComposable';

const { displayName, email, password, onLogin } = useAuth()
</script>

<template>
  <div class="flez flex-row">
    <h3 class="text-3xl mb-2 text-center">¡Bienvenido!</h3>
    <p class="mb-3 text-center">Logueate para acceder a la plataforma</p>
  
    <form @submit.prevent="onLogin">
      <div class="flex flex-col mb-5">
        <label>Nombre:</label>
        <input v-model="displayName" type="text" placeholder="Type here" class="input input-bordered w-full" />
      </div>
      
      <div class="flex flex-col mb-5">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Type here" class="input input-bordered w-full" />
      </div>
  
      <div class="flex flex-col mb-5">
        <label>Contraseña:</label>
        <input v-model="password" type="password" placeholder="Type here" class="input input-bordered w-full" />
      </div>
  
      <div>
        <button class="btn btn-primary">Registrar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>