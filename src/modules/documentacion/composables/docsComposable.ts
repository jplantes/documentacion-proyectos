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
  const isDeleting = ref(false)
  const menuDinamico = ref<docGroup[]>([])
  const allDocs = ref<docWithId[]>([])

  const texto = ref('')
  const autor = ref('')
  const createtAt = ref('')
  const updateAt = ref('')
  const editBy = ref('')
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
      isDeleting.value = true
      const refDoc = doc(db, 'global', 'documentacion', route.params.proyect as string, idDoc.value)
      await deleteDoc(refDoc)
      await inicializar(undefined)

      texto.value = ''
      autor.value = ''
      titulo.value = ''
      createtAt.value = ''
      updateAt.value = ''
      editBy.value = ''

      await obtenerDocumentos()
      isDeleting.value = false
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


    if (cuerpo) {
      idDoc.value = id
      titulo.value = cuerpo.data.titulo
      texto.value = cuerpo.data.cuerpo
      tipo.value = cuerpo.data.tipo
      autor.value = cuerpo.data.autor || ''
      createtAt.value = cuerpo.data.createtAt || ''
      updateAt.value = cuerpo.data.updateAt || ''
      editBy.value = cuerpo.data.editBy || ''
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

  const inicializar = async (idEntrada: string | undefined) => {
    console.log('entro en inicializar')
    isLoading.value = true

    if (!docsStore.documentos) {
      await obtenerDocumentos()
    } else {
      allDocs.value = docsStore.documentos
    }
    menuDinamico.value = ordenarDocumentos(allDocs.value)

    if (idEntrada) {
      console.log('entro en ver articulo');
      verArticulo(idEntrada)
    }
    isLoading.value = false
  }




  const save = async (value: string) => {
    // Si estoy guardando no hago nada
    if (isSaving.value) return

    if (!titulo.value || !tipo.value || !value) {
      alert('Todos los campos son obligatorios')
      return
    }

    if (isUpdating.value) {
      // TODO: Actualizar
      const updateDoc: DocTecnico = {
        titulo: titulo.value,
        cuerpo: value,
        tipo: tipo.value,
        editBy: authStore.name,
        updateAt: new Date().toISOString(),
      }
      const refDoc = doc(db, 'global', 'documentacion', route.params.proyect as string, idDoc.value)

      isSaving.value = true
      await setDoc(refDoc, updateDoc, { merge: true })
      isSaving.value = false
    } else {
      const nuevoDocumento: DocTecnico = {
        titulo: titulo.value,
        cuerpo: value,
        autor: authStore.name,
        tipo: tipo.value,
        createtAt: new Date().toISOString(),
      }
      await guardarDocumento(nuevoDocumento)
    }


    await obtenerDocumentos()
    router.push({ name: 'docs-proyectos', params: { proyect: route.params.proyect, idEntrada: idDoc.value } })
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
    isDeleting,
    menuDinamico,
    texto,
    autor,
    createtAt,
    updateAt,
    editBy,
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