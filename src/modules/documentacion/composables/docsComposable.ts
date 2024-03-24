import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'

import { EditPencil, Trash } from '@iconoir/vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

import HeaderPages from '@/shared/components/HeaderPages.vue'
import MarkdownEditor from '@/shared/components/MarkdownEditor.vue'


import { useAuthStore } from '@/modules/auth/store/authStore'
import { useDocsStore } from '../store/docsStore'
import { useConfigStore } from '@/modules/config/store/configStore'

import { Tipo, type docGroup, type DocTecnico, type docWithId } from '../interfaces/docIntercaces'

export const useDocs = () => {

  const authStore = useAuthStore()
  const docsStore = useDocsStore()
  const configStore = useConfigStore()

  const router = useRouter()
  const route = useRoute()
  const db = getFirestore()

  const isLoading = ref(false)
  const isUpdating = ref(false)
  const menuDinamico = ref<docGroup[]>([])
  const allDocs = ref<docWithId[]>([])

  const texto = ref('')
  const autor = ref('')
  const idDoc = ref('')
  const titulo = ref('')
  const tipo = ref('')
  const titleHeader = ref('')
  const isSaving = ref(false)


  const tituloHeader = () => {
    const nombreProyecto = configStore.proyect.find((proyect) => proyect.codigo === route.params.proyect)?.nombre || ''
    titleHeader.value = `Nuevo documento ${nombreProyecto}`
  }

  const eliminarDocumento = async () => {
    if (idDoc.value) {
      console.log('Eliminando');
      const refDoc = doc(db, 'global', 'documentacion', route.params.proyect as string, idDoc.value)
      await deleteDoc(refDoc)
      console.log('se elimino');
      await inicializar()

      texto.value = ''
      autor.value = ''
      titulo.value = ''

    }
  }

  const obtenerDocumentos = async (): Promise<void> => {
    const refCollection = collection(db, 'global', 'documentacion', route.params.proyect as string)
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
    const cuerpo = docsStore.documentos.find((doc) => doc.id === id)
    console.log(cuerpo)

    if (cuerpo) {
      idDoc.value = id
      titulo.value = cuerpo.data.titulo
      texto.value = cuerpo.data.cuerpo
      autor.value = cuerpo.data.autor
      tipo.value = cuerpo.data.tipo
    }
  }

  const ordenarDocumentos = (docs: docWithId[]): docGroup[] => {
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

  const inicializar = async () => {
    allDocs.value = docsStore.documentos
    await obtenerDocumentos()
    menuDinamico.value = ordenarDocumentos(allDocs.value)
  }




  const save = async (value: string) => {
    // Si estoy guardando no hago nada
    if (isSaving.value) return

    if (!titulo.value || !tipo.value || !value) {
      alert('Todos los campos son obligatorios')
      return
    }

    const nuevoDocumento: DocTecnico = {
      titulo: titulo.value,
      cuerpo: value,
      autor: authStore.name,
      tipo: tipo.value,
    }

    if (isUpdating.value) {
      // TODO: Actualizar
      const refDoc = doc(db, 'global', 'documentacion', route.params.proyect as string, idDoc.value)
      await setDoc(refDoc, nuevoDocumento)
    } else {
      await guardarDocumento(nuevoDocumento)
    }


    router.push({ name: 'docs-proyectos', params: { proyect: route.params.proyect } })
  }

  // Metodos con firebase
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


  return {
    isLoading,
    isUpdating,
    menuDinamico,
    texto,
    autor,
    idDoc,
    titulo,
    titleHeader,
    EditPencil,
    Trash,
    MdPreview,
    MarkdownEditor,
    HeaderPages,
    eliminarDocumento,
    verArticulo,
    inicializar,
    save,
    authStore,
    configStore,
    docsStore,
    tipo,
    Tipo,
    isSaving,
    tituloHeader,
    route,
    router,
  }
}