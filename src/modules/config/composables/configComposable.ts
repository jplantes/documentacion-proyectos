import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { doc, getFirestore, setDoc, collection, getDocs  } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'uuid'

import { useConfigStore } from '../store/configStore'
import type { Proyecto, ProyectoDoc } from '../interfaces/configInterfaces'
import type { UserRole, Users } from '@/modules/auth/interfaces/userRoleInterface'

export const useConfig = () => {

  const router = useRouter()
  const db = getFirestore()
  const configStore = useConfigStore()

  const isLoading = ref(false)
  const proyectos = ref<ProyectoDoc[]>([])
  const proyecto = ref<Proyecto>({
    nombre: '',
    codigo: '',
    descripcion: '',
    isActive: true,
  })

  const usuarios = ref<Users[]>([])

  const onSaveProyecto = async () => {
    // TODO: Manejar el error de que todos los campos son requeridos
    if (proyecto.value.nombre === '' || proyecto.value.codigo === '' || proyecto.value.descripcion === '') {
      alert('Todos los campos son requeridos')
      return
    }

    try {
      isLoading.value = true
      await guardarProyecto( uuidv4() )

      proyecto.value = {
        nombre: '',
        codigo: '',
        descripcion: '',
        isActive: true,
      }

      router.push({ name: 'config-proyectos' })
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }

  }

  const changeIsActiveProyect = async (uuid: string) => {
    const proyect = proyectos.value.find( proyecto => proyecto.id === uuid )

    // TODO: Manejar el error de que no existe el proyecto
    if ( !proyect) return

    proyect.data.isActive = !proyect.data.isActive
    proyecto.value = proyect?.data
    
    try {
      guardarProyecto( uuid )
    } catch (error) {
      console.log(error)
    }
  }

  const getProyectos = async () => {
    isLoading.value = true
    await obtenerProyectos()
    isLoading.value = false
  }

  const getUsuarios = async () => {
    isLoading.value = true
    await obtenerUsuarios()
    isLoading.value = false
  }
  

  // metodos que impactan contra Firebase
  const obtenerProyectos = async () => {
    const proyectCollection = collection(db, 'global', 'configuraciones', 'proyectos')
    const queryProyectSnapshot = await getDocs( proyectCollection )
  
    configStore.proyect = []
    
    queryProyectSnapshot.forEach((doc) => {
      proyectos.value.push({
        id: doc.id,
        data: doc.data() as Proyecto
      })

      configStore.proyect.push(doc.data() as Proyecto)
    })
  }


  const guardarProyecto = async ( uuid: string ) => {
    // TODO: Manejar el error de que el uuid no es valido
    if ( !validate(uuid) ) return

    // Creo una referencia al documento del usuario
    const userRef = doc(db, 'global', 'configuraciones', 'proyectos', uuid)
    const datos = proyecto.value

    await setDoc(userRef, datos)
  }

  const obtenerUsuarios = async () => {
    const proyectCollection = collection(db, 'usuarios')
    const queryProyectSnapshot = await getDocs( proyectCollection )
  
    queryProyectSnapshot.forEach((doc) => {
      usuarios.value.push({
        id: doc.id,
        data: doc.data() as UserRole
      })
    })
  }

  return {
    proyecto,
    proyectos,
    usuarios,
    isLoading,

    onSaveProyecto,
    getProyectos,
    changeIsActiveProyect,

    getUsuarios,
  }

}
