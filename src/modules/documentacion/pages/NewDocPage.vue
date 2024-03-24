<script setup lang="ts">
import { useDocs } from '../composables/docsComposable'

const { isUpdating, authStore, titulo, tipo, texto, titleHeader, Tipo, isSaving, save, verArticulo, tituloHeader, HeaderPages, MarkdownEditor, route, router } = useDocs()
if (!authStore.isDev) router.push({ name: 'home' })

tituloHeader()

if (route.params.idEntrada) {
  isUpdating.value = true
  verArticulo(route.params.idEntrada as string)
}

</script>

<template>
  <HeaderPages :title="titleHeader" :breadcrumbs="['Documentos', 'Nuevo documento']" />

  <div class="container mx-auto mt-10">

    <div class="flex flex-col ml-3 md:flex-row md:ml-0 md:items-end">
      <div class="flex flex-col mb-4 md:mb-0 md:w-1/3 md:gap-3 ">
        <label>Titulo</label>
        <input v-model="titulo" type="text" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="flex flex-col mb-4 md:mb-0 md:w-1/3 md:gap-3 ">
        <label>Tipo de documento</label>
        <select v-model="tipo" class="select select-bordered w-full max-w-xs">
          <option disabled selected></option>
          <option v-for="tipo of Tipo" :key="tipo" :value="tipo">{{ tipo }}</option>
        </select>
      </div>

      <div v-if="isSaving" class="flex justify-center self-center order-first md:order-last md:w-1/3 md:gap-3 ">
        <span class="loading loading-bars loading-xs mr-3"></span>
        <h3>Guardando Documento...</h3>
      </div>
    </div>

    <MarkdownEditor @save="save" :texto="texto" />

    <div class="flex justify-center py-10">
      <RouterLink :to="{ name: 'docs-proyectos', params: { proyect: route.params.proyect } }"
        class="btn btn-error w-1/5">Cancelar</RouterLink>
    </div>
  </div>
</template>
