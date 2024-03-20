<script setup lang="ts">
import { FloppyDisk } from '@iconoir/vue'
import { useEditUsuario } from '../composables/editUsuarioComposable';

const { isUdatingName, isUdatingPassword, displayName, password1, password2, actualizarNombre, cambiarPassword, filtrarProyectos, authStore } = useEditUsuario()

</script>

<template>
  <div class="container mx-auto mt-9">
    <div class="bg-white rounded-2xl shadow-lg h-full p-5">

      <h3 class="text-3xl mb-10">Perfil usuario</h3>

      <div class="grid grid-cols-2 gap-5 mt-8">
        <div class="shadow-xl p-4">
          <h3 class="flex items-end text-lg mb-4">
            Corregir nombre
            <span v-if="!isUdatingName" @click="actualizarNombre" class="text-gray-400 text-lg ml-4 cursor-pointer">
              <FloppyDisk />
            </span>
            <span v-else class="loading loading-ball loading-xs ml-4"></span>
          </h3>


          <div class="flex items-center">
            <input v-model="displayName" type="text" class="input w-full max-w-xs" />
          </div>
        </div>

        <div class="shadow-xl p-4">
          <h3 class="flex items-end text-lg mb-4">
            Cambiar contraseña
            <span v-if="!isUdatingPassword" @click="cambiarPassword" class="text-gray-400 text-lg ml-4 cursor-pointer">
              <FloppyDisk />
            </span>
            <span v-else class="loading loading-ball loading-xs ml-4"></span>

          </h3>

          <div class="flex justify-start items-end">
            <div class="flex flex-col items-center">
              <input v-model="password1" type="password" placeholder="Tu nueva contraseña"
                class="input w-full max-w-xs mb-3" />
              <input v-model="password2" type="password" placeholder="Repeti la contraseña"
                :class="(password1 === password2) ? 'input w-full max-w-xs mb-3' : 'input w-full max-w-xs mb-3 input-bordered input-error'" />
            </div>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-2 gap-5 mt-8">

        <div class="shadow-xl p-6">
          <h4 class="text-lg mb-4">Proyectos asignados</h4>

          <p v-for="proyecto in authStore.proyect" :key="proyecto" class="p-2 bg-gray-300 my-2 rounded w-1/3">
            {{ filtrarProyectos(proyecto) }}
          </p>
        </div>

        <div class="shadow-xl p-6">
          <h4 class="text-lg mb-4">Tipo de usuario</h4>

          <p v-for="user in authStore.typeUser" :key="user" class="p-2 bg-gray-300 my-2 rounded w-1/3">
            {{ user === 'dev' ? 'Desarrollador' : 'QA' }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
