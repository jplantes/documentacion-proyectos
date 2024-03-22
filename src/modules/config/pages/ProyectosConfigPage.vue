<script setup lang="ts">
import { ThumbsDown, ThumbsUp } from '@iconoir/vue'
import { useConfig } from '../composables/configComposable'

const { getProyectos, changeIsActiveProyect, proyectos, isLoading } = useConfig()

getProyectos()
</script>

<template>
  <div class="flex flex-col md:flex-row md:justify-between md:items-end">
    <h1 class="text-2xl mb-3 md:mb-0 md:text-3xl">Administración de proyectos</h1>
    <RouterLink :to="{ name: 'config-nuevo-proyecto' }" class="btn btn-neutral">Crear proyecto</RouterLink>
  </div>

  <div v-if="!isLoading" class="mt-12">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="w-2/5 py-6 text-left">Nombre</th>
          <th class="w-2/5 py-6 text-left">Código</th>
          <th class="w-1/5 py-6">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proyecto in proyectos" :key="proyecto.id">
          <td class="py-4">{{ proyecto.data.nombre }}</td>
          <td class="py-4">{{ proyecto.data.codigo }}</td>
          <td class="flex justify-around py-4">
            <div v-if="proyecto.data.isActive" class="tooltip" data-tip="Deshabilita el pryecto">
              <button @click="changeIsActiveProyect(proyecto.id)" class="btn btn-circle btn-outline">
                <ThumbsDown />
              </button>
            </div>

            <div v-else class="tooltip" data-tip="Habilita el pryecto">
              <button @click="changeIsActiveProyect(proyecto.id)" class="btn btn-circle btn-outline">
                <ThumbsUp />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="flex flex-col justify-center items-center h-96">
    <span class="loading loading-bars loading-lg"></span>
    <h3 class="text-2xl mt-5">Buscando proyectos</h3>
  </div>
</template>