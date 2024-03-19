<script setup lang="ts">
import { useConfig } from '../composables/configComposable'
const { proyecto, isLoading, onSaveProyecto } = useConfig()
</script>

<template>
  <h1 class="text-3xl">Nuevo Proyecto</h1>

  <div class="mt-12">
    <form @submit.prevent="onSaveProyecto">
      <div class="flex flex-row">
        <div class="w-1/2 py-2 px-4">
          <label for="nombre" class="block mb-2">Nombre</label>
          <input v-model="proyecto.nombre" type="text" id="nombre" class="input input-bordered w-full" />
        </div>
        <div class="w-1/2 py-2 px-4">
          <label for="codigo" class="block mb-2">Código</label>
          <input v-model="proyecto.codigo" type="text" id="codigo" class="input input-bordered w-full" />
        </div>
      </div>

      <div class="py-2 px-4">
        <label for="descripcion" class="block mb-2">Descripción</label>
        <textarea v-model="proyecto.descripcion" id="descripcion" class="textarea textarea-bordered w-full"></textarea>
      </div>

      <div class="flex justify-between mb-6 px-4 mt-4">
        <RouterLink :to="{name: 'config-proyectos'}" class="btn btn-primary">Cancelar</RouterLink>

        <button v-if="!isLoading" class="btn btn-success">Guardar</button>
        <button v-else class="btn">
          <span class="loading loading-spinner"></span>
          Guardando...
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>