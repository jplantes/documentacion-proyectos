import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import type { UserRole } from '../interfaces/userRoleInterface'
import { useAuthStore } from '../store/authStore'



export const useAuth = () => {

  const authStore = useAuthStore()


  const auth = getAuth()
  const db = getFirestore()

  const router = useRouter()

  const isLoading = ref<boolean>(false)
  const isEditable = ref<boolean>(false)
  const messageError = ref<string>('')
  const uidGoogle = ref<string | undefined>(undefined)

  const email = ref<string>('')
  const password = ref<string>('')
  const displayName = ref<string>('')
  const isAdmin = ref<boolean>(false)
  const proyect = ref<string[]>([])
  const typeUser = ref<string[]>([])

  const proyectSelelected = ref<string>('')
  const typeUserSelelected = ref<string>('')

  const onRegister = async (uidGoogle: string | undefined) => {
    // TODO: Manejar error de campos incompletos y mostras en UI
    if (!email.value || !displayName.value) return

    isLoading.value = true
    password.value = 'lkjLKJ92lkj(+'
    await registrarUsuario(email.value, password.value, displayName.value, uidGoogle)

    router.push({ name: 'config-usuarios' })
  }

  const onLogin = async () => {
    // TODO: Manejar error de campos incompletos y mostras en UI
    if (!email.value || !password.value) return
    isLoading.value = true
    await loginUsuario(email.value, password.value)
    router.push('/')
  }

  const addProyecto = () => {
    if (proyect.value.includes(proyectSelelected.value)) return
    if (proyectSelelected.value === '') return

    proyect.value.push(proyectSelelected.value)
  }

  const removeProyecto = (proyecto: string) => {
    proyect.value = proyect.value.filter(p => p !== proyecto)
  }

  const addTypeUser = () => {
    if (typeUser.value.includes(typeUserSelelected.value)) return
    if (typeUserSelelected.value === '') return

    typeUser.value.push(typeUserSelelected.value)
  }

  const removeTypeUser = (type: string) => {
    typeUser.value = typeUser.value.filter(t => t !== type)
  }

  // Metodos contra Firebase auth
  const registrarUsuario = async (email: string, password: string, displayName: string, uidGoogle: string | undefined) => {

    try {
      isLoading.value = true

      if (!isEditable.value) {
        // Doi de alta al usuario en firebase con email y password
        await createUserWithEmailAndPassword(auth, email, password)
        // Actulizo el nombre del usuario
        await actulizarNombre(displayName)
      }
      // Guardo los permisos en la base de datos de este usuario
      await guardarPermisos(uidGoogle)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const loginUsuario = async (email: string, password: string) => {

    try {
      await signInWithEmailAndPassword(auth, email, password)
      await leerPermisos()

      isLoading.value = false
      messageError.value = ''

    } catch (error) {
      const e = error as AuthError
      errorsAuthHandler(e.code)

    } finally {
      isLoading.value = false
    }
  }

  const errorsAuthHandler = (errorCode: string) => {
    console.log(errorCode)

    switch (errorCode) {
      case 'auth/invalid-credential':
        messageError.value = 'Credenciales invalidas'
        return
    }
  }


  // Metodos contra Firebase firestore

  const actulizarNombre = async (displayName: string) => {
    const currentUser = auth.currentUser
    if (currentUser) {
      await updateProfile(currentUser, { displayName })
    }
  }

  const guardarPermisos = async (uidAuth: string | undefined) => {

    if (!uidAuth) {
      uidAuth = auth.currentUser?.uid as string
    }
    // Creo una referencia al documento del usuario
    const userRef = doc(db, 'usuarios', uidAuth)

    const datos: UserRole = {
      name: displayName.value,
      email: email.value,
      proyect: proyect.value,
      typeUser: typeUser.value,
      isAdmin: isAdmin.value,
    }

    await setDoc(userRef, datos)
  }

  const leerPermisos = async () => {
    const userRef = doc(db, 'usuarios', auth.currentUser?.uid as string)
    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
      saveUserRole(docSnap.data() as UserRole)
    } else {
      console.log('No such document!')
    }
  }


  // Metodos de interacción con el store
  const saveUserRole = (userRole: UserRole) => {
    authStore.proyect = userRole.proyect
    authStore.typeUser = userRole.typeUser
    authStore.email = userRole.email
    authStore.name = userRole.name
    authStore.isAdmin = userRole.isAdmin
  }

  return {
    // Variables
    displayName,
    email,
    password,
    isAdmin,
    proyect,
    typeUser,

    uidGoogle,
    isEditable,
    isLoading,
    messageError,

    // Metodos
    proyectSelelected,
    typeUserSelelected,
    removeProyecto,
    addTypeUser,
    removeTypeUser,

    onRegister,
    onLogin,
    addProyecto,

    leerPermisos,
  }
}

