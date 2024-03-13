<script setup lang="ts">
import { LogIn, Menu } from '@iconoir/vue'
</script>


<template>
  <div class="navbar bg-white">
    <div class="flex-1">
      <h1 class="text-xl text">Documentación & QA</h1>
    </div>
    <div class="flex-none">
      <div class="flex px-1">
       <a class="text-sm mx-3 cursor-pointer">Documentación</a>
       <a class="text-sm mx-3 cursor-pointer">Historias de usuario QA</a>
       <a class="text-sm mx-3 cursor-pointer"> Ingresar </a>
      </div>
    </div>
  </div>

  <div class="flex h-52 bg-gradient-to-r from-indigo-200 to-blue-600">
    <div class="container mx-auto">
      <div class="text-sm breadcrumbs py-8">
        <ul>
          <li><a>E-Center</a></li> 
          <li><a>Documents</a></li> 
          <li>Back-end</li>
        </ul>
      </div>
  
      <h3 class="text-3xl self-center">Documentación</h3>
    </div>
  </div>

  <div class="container mx-auto mt-8 grid grid-cols-3 gap-8">

    <div class="rounded shadow-2xl bg-white p-10">
      <h3 class="text-2xl mb-4">E-Center</h3>
      <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>

    <div class="rounded shadow-2xl bg-white p-10">
      <h3 class="text-2xl mb-4">Recepción de productos</h3>
      <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>

    <div class="rounded shadow-2xl bg-white p-10">
      <h3 class="text-2xl mb-4">AVISA</h3>
      <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </div>

</template>
