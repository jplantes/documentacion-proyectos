import { ref } from 'vue'

import { useAuth } from '@/modules/auth/composables/authComposable'
import { useConfig } from '@/modules/config/composables/configComposable'

export const useStart = () => {

  const { getProyectos } = useConfig()
  const { leerPermisos } = useAuth()

  const isLoading = ref<boolean>(false)

  const start = async () => {
    isLoading.value = true

    await leerPermisos()
    await getProyectos()
    
    isLoading.value = false
  };

  return {
    isLoading,
    start,
  };
}