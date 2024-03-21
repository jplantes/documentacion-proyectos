import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { docWithId } from '../interfaces/docIntercaces'

export const useDocsStore = defineStore('auth', () => {

  const documentos = ref<docWithId[]>([])

  return {
    // State
    documentos,
  }
})