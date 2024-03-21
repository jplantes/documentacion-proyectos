<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addDoc, collection, getFirestore } from 'firebase/firestore'


import { useConfigStore } from '@/modules/config/store/configStore'

import HeaderPages from '@/shared/components/HeaderPages.vue'
import MarkdownEditor from '@/shared/components/MarkdownEditor.vue'

import { Tipo, type DocTecnico } from '../interfaces/docIntercaces'

import { useAuthStore } from '@/modules/auth/store/authStore'

const db = getFirestore()

const route = useRoute()
const router = useRouter()

const configStore = useConfigStore()
const authStore = useAuthStore()

if (!authStore.isDev) {
  router.push({ name: 'home' })
}

const titleHeader = ref('')
const title = ref('')
const tipo = ref('')
const isSaving = ref(false)

const nombreProyecto = configStore.proyect.find((proyect) => proyect.codigo === route.params.proyect)?.nombre || ''
titleHeader.value = `Nuevo documento ${nombreProyecto}`

const save = async (value: string) => {
  // Si estoy guardando no hago nada
  if (isSaving.value) return

  if (!title.value || !tipo.value || !value) {
    alert('Todos los campos son obligatorios')
    return
  }

  const nuevoDocumento: DocTecnico = {
    titulo: title.value,
    cuerpo: value,
    autor: authStore.name,
    tipo: tipo.value,
  }

  await guardarDocumento(nuevoDocumento)

  router.push({ name: 'docs-proyectos', params: { proyect: route.params.proyect } })
}

const guardarDocumento = async (documento: DocTecnico) => {
  // /global/documentacion/ecci

  const refCollection = collection(db, 'global', 'documentacion', route.params.proyect as string)

  try {
    isSaving.value = true
    await addDoc(refCollection, documento)
    isSaving.value = false
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <HeaderPages :title="titleHeader" :breadcrumbs="['E-Center', 'Documentos', 'Nuevo documento']" />

  <div class="container mx-auto mt-10">
    <div class="flex items-end">
      <div class="flex flex-col w-1/3 gap-3 ">
        <label>Titulo</label>
        <input v-model="title" type="text" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="flex flex-col w-1/3 gap-3 ">
        <label>Tipo de documento</label>
        <select v-model="tipo" class="select select-bordered w-full max-w-xs">
          <option disabled selected></option>
          <option v-for="tipo of Tipo" :key="tipo">{{ tipo }}</option>

        </select>
      </div>

      <div v-if="isSaving" class="flex justify-center self-center w-1/3 gap-3 ">
        <span class="loading loading-bars loading-xs"></span>
        <h3>Guardando Documento...</h3>
      </div>
    </div>

    <MarkdownEditor @save="save" />

    <div class="flex justify-center py-10">
      <RouterLink :to="{ name: 'docs-proyectos', params: { proyect: route.params.proyect } }"
        class="btn btn-error w-1/5">Cancelar</RouterLink>
    </div>
  </div>
</template>
