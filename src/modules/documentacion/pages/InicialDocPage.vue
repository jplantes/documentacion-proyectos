<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

import HeaderPages from '@/shared/components/HeaderPages.vue'
import { Tipo, type docGroup, type DocTecnico, type docWithId } from '../interfaces/docIntercaces'
import { useAuthStore } from '@/modules/auth/store/authStore'
import { useDocsStore } from '../store/docsStore'



const authStore = useAuthStore()
const docsStore = useDocsStore()

const router = useRoute()
const db = getFirestore()

const isLoading = ref(false)
const autor = ref('')
const menuDinamico = ref<docGroup[]>([])
const allDocs = ref<docWithId[]>([])

const texto = ref('# Hola mundo')

const obtenerDocumentos = async (): Promise<void> => {
  const refCollection = collection(db, 'global', 'documentacion', router.params.proyect as string)
  const querySnapshot = await getDocs(refCollection)

  const arrayDoc: docWithId[] = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      data: doc.data() as DocTecnico
    }
  })

  allDocs.value = arrayDoc
  docsStore.documentos = arrayDoc
}

const verArticulo = (id: string) => {
  const cuerpo = allDocs.value.find((doc) => doc.id === id)

  if (cuerpo) {
    texto.value = cuerpo.data.cuerpo
    autor.value = cuerpo.data.autor
  }
}

const ordenarDocumentos = (docs: docWithId[]): docGroup[] => {
  // Ordenar documentos
  const salida: docGroup[] = []


  const tipos = Object.values(Tipo)
  tipos.forEach((tipo) => {
    const docsTipo = docs.filter((doc) => doc.data.tipo === tipo)

    salida.push({
      tipo,
      docs: docsTipo
    })

  })

  return salida
}

onMounted(async () => {

  isLoading.value = true

  // Si esta en el store no vuelvo a hacer la petición
  if (docsStore.documentos) {
    allDocs.value = docsStore.documentos
  } else {
    await obtenerDocumentos()
  }

  menuDinamico.value = ordenarDocumentos(allDocs.value)

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


    <div v-else class="flex">
      <div class="flex-none w-1/4 h-min rounded shadow p-5 mb-10 bg-white">
        <RouterLink v-if="authStore.isDev" :to="{ name: 'docs-new' }" class="btn btn-block btn-success mb-8">Nuevo
          documento</RouterLink>

        <ul class="menu w-56 rounded-box">
          <li v-for="menu of menuDinamico" :key="menu.tipo">
            <summary>{{ menu.tipo }}</summary>
            <ul>
              <li v-for="title of menu.docs" :key="title.id">
                <a @click="verArticulo(title.id)">{{ title.data.titulo }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="flex-auto w-3/4 rounded shadow p-5 ml-5 mb-10 bg-white">
        <MdPreview :modelValue="texto" />
        <h5 v-if="autor" class="text-sm text-gray-300">Autor: {{ autor }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped></style>