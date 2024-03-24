<script setup lang="ts">
import { onMounted } from 'vue'

import { useDocs } from '../composables/docsComposable'




const { isLoading, inicializar, texto, titulo, autor, idDoc, authStore, HeaderPages, menuDinamico, verArticulo, eliminarDocumento, EditPencil, Trash, MdPreview } = useDocs()

console.log(texto.value)
onMounted(async () => {

  isLoading.value = true

  // TODO: Si esta en el store no vuelvo a hacer la petición
  // if (docsStore.documentos) {
  //   allDocs.value = docsStore.documentos
  // } else {
  //   await obtenerDocumentos()
  // }
  inicializar()

  isLoading.value = false
})
</script>

<template>
  <HeaderPages title="Documentación" :breadcrumbs="['E-Center', 'Documentación']" />


  <div class="container mx-auto py-8">
    <div v-if="isLoading" role="alert" class="alert">
      <span class="loading loading-ring loading-md"></span>
      <span>Buscando documentos</span>
    </div>


    <div v-else class="flex flex-col md:flex-row">
      <div class="flex-none md:w-1/4 h-min rounded shadow p-5 mb-10 bg-white">
        <RouterLink v-if="authStore.isDev" :to="{ name: 'docs-new' }" class="btn btn-block btn-success mb-8">Nuevo
          documento</RouterLink>

        <ul class="menu md:w-56 rounded-box">
          <div v-for="menu of menuDinamico" :key="menu.tipo">
            <li v-if="menu.docs.length > 0">
              <details>
                <summary>{{ menu.tipo }} ({{ menu.docs.length }})</summary>
                <ul>
                  <li v-for="title of menu.docs" :key="title.id">
                    <a @click="verArticulo(title.id)">{{ title.data.titulo }}</a>
                  </li>
                </ul>
              </details>
            </li>
          </div>
        </ul>
      </div>

      <div class="flex-auto md:w-3/4 rounded shadow p-5 md:ml-5 mb-10 bg-white">
        <div class="flex flex-col md:flex-row md:justify-between mb-5">
          <h3 class="text-3xl">{{ titulo }}</h3>

          <div v-if="(authStore.isAdmin || authStore.isDev) && texto !== ''"
            class="flex justify-between order-first mb-9 md:order-last">
            <button v-if="authStore.isAdmin" @click="eliminarDocumento"
              class="btn btn-error btn-circle btn-outline mx-2">
              <Trash />
            </button>

            <button v-if="authStore.isDev"
              @click="$router.push({ name: 'docs-new', params: { proyect: $route.params.proyect, idEntrada: idDoc } })"
              class="btn btn-info btn-circle btn-outline mx-2">
              <EditPencil />
            </button>
          </div>
        </div>

        <MdPreview :modelValue="texto" />

        <h5 v-if="autor" class="text-sm text-gray-300">Autor: {{ autor }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped></style>