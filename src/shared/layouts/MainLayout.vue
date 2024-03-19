<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import { useStart } from '../composables/startComposable';

const { isLoading, start } = useStart()

start()
</script>


<template>
  <div v-if="!isLoading">
    <NavBar />
    <RouterView />
  </div>

  <div v-else class="flex flex-col justify-center items-center w-lvw h-lvh">
    <span class="loading loading-dots loading-lg"></span>
    <h3>Obteniendo datos</h3>
  </div>
  
</template>
