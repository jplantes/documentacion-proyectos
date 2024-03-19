<script setup lang="ts">
import { EditPencil } from '@iconoir/vue'
import { useConfig } from '../composables/configComposable';

const { getUsuarios, isLoading, usuarios } = useConfig()

getUsuarios()

</script>

<template>
  <div class="flex justify-between items-end">
    <h1 class="text-3xl">Administración de usuarios</h1>
    <RouterLink :to="{ name: 'config-nuevo-usuario' }" class="btn btn-neutral">Crear usuario</RouterLink>
  </div>

  <div v-if="!isLoading" class="mt-12">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="w-2/5 py-6 text-left">Nombre</th>
          <th class="w-2/5 py-6 text-left">Correo</th>
          <th class="w-1/5 py-6">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario of usuarios" :key="usuario.id">
          <td class="py-4">{{ usuario.data.name }}</td>
          <td class="py-4">{{ usuario.data.email }}</td>
          <td class="flex justify-around py-4">
            <RouterLink :to="{ name: 'config-nuevo-usuario', params: { uuid: usuario.id } }"
              class="btn btn-circle btn-outline">
              <EditPencil />
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="flex flex-col justify-center items-center h-96">
    <span class="loading loading-bars loading-lg"></span>
    <h3 class="text-2xl mt-5">Buscando usuarios</h3>
  </div>
</template>


<style scoped></style>