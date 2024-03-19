import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Proyecto } from '../interfaces/configInterfaces'

export const useConfigStore = defineStore('config', () => {

  const proyect = ref<Proyecto[]>([])


  return {
    // State
    proyect,

    // Computed

    // Mutations
  }
})