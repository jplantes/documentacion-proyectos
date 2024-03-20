import { ref } from 'vue'
import { useAuth } from '@/modules/auth/composables/authComposable'
import { useAuthStore } from '@/modules/auth/store/authStore'

import { useConfigStore } from '../store/configStore'

export const useEditUsuario = () => {



  const authStore = useAuthStore()
  const configStore = useConfigStore()

  const { changeName, changePassword } = useAuth()

  const displayName = ref(authStore.name)
  const password1 = ref('')
  const password2 = ref('')

  const isUdatingName = ref(false)
  const isUdatingPassword = ref(false)

  const actualizarNombre = async () => {

    if (displayName.value === authStore.name) return

    try {
      isUdatingName.value = true
      await changeName(displayName.value)
      authStore.name = displayName.value
      isUdatingName.value = false
    } catch (error) {
      console.log(error)
    }
  }

  const cambiarPassword = async () => {
    if (password1.value !== password2.value) return

    try {
      isUdatingPassword.value = true
      await changePassword(password1.value)
      isUdatingPassword.value = false
    } catch (error) {
      console.log(error)
    }
  }

  const filtrarProyectos = (codigo: string) => {
    const salida = configStore.proyect.find((proyecto) => proyecto.codigo === codigo)
    return salida?.nombre
  }

  return {
    displayName,
    password1,
    password2,
    isUdatingName,
    isUdatingPassword,
    actualizarNombre,
    cambiarPassword,
    filtrarProyectos,

    authStore,
  }

}