import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  const proyect = ref<string[]>([])
  const typeUser = ref<string[]>([])
  const email = ref<string>('')
  const name = ref<string>('')
  const isAdmin = ref<boolean>(false)


  return {
    // State
    proyect,
    typeUser,
    email,
    name,
    isAdmin,

    // Computed
    isDev: computed(() => typeUser.value.includes('dev')),
    isQa: computed(() => typeUser.value.includes('qa')),

    // Mutations
  }
})