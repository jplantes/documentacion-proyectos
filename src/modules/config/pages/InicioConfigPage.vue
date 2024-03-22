<script setup lang="ts">
import HeaderPages from '@/shared/components/HeaderPages.vue';


</script>

<template>
  <HeaderPages title="Configuración del portal" :breadcrumbs="['Inicio', 'Configuración']" />

  <div class="container mx-auto py-8">
    <div class="flex flex-col md:flex-row">
      <div class="flex-none md:w-1/4 h-min rounded shadow p-5 mb-10 bg-white">
        <h1 class="text-2xl mb-5">Configuraciones</h1>

        <ul class="menu w-56 rounded-box">
          <li>
            <RouterLink :to="{ name: 'config-usuarios' }">Usuarios</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'config-proyectos' }">Proyectos</RouterLink>
          </li>
        </ul>
      </div>

      <div class="flex-auto md:w-3/4 rounded shadow p-5 md:ml-5 mb-10 bg-white">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>