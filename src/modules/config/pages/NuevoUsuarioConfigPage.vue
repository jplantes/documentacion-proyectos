<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { useAuth } from '@/modules/auth/composables/authComposable'
import { UserType } from '@/modules/auth/interfaces/userRoleInterface'

import { useConfigStore } from '../store/configStore'
import { useConfig } from '../composables/configComposable';

const configStore = useConfigStore()

const { email,
  displayName,
  isAdmin,
  proyectSelelected,
  typeUserSelelected,
  proyect,
  typeUser,
  uidGoogle,
  isLoading,
  isEditable,
  onRegister,
  addProyecto,
  removeProyecto,
  addTypeUser,
  removeTypeUser,
} = useAuth()

const { getUsuarios, usuarios } = useConfig()

const router = useRouter()
const route = useRoute()

const uuid = route.params.uuid as string



const editarUsuario = async () => {
  await getUsuarios()
  const usuario = usuarios.value.find((usuario) => usuario.id === uuid)

  if (usuario) {
    email.value = usuario?.data.email
    displayName.value = usuario?.data.name
    isAdmin.value = usuario?.data.isAdmin
    proyect.value = usuario?.data.proyect
    typeUser.value = usuario?.data.typeUser

  } else {
    router.push({ name: 'config-usuarios' })
  }

}


if (uuid) {
  isEditable.value = true
  uidGoogle.value = uuid
  editarUsuario()
} else {
  isEditable.value = false
}


</script>

<template>

  <div class="flex flex-col md:flex-row md:justify-between md:items-end md:px-3">
    <h1 class="text-3xl">Alta de usuarios</h1>
    <div class="mt-3 md:mt-0 md:w-2/5 md:px-3 flex items-center justify-between md:justify-end md:items-end">
      <span class="label-text mr-5">Es administrador</span>
      <input v-model="isAdmin" type="checkbox" class="toggle toggle-success" />
    </div>
  </div>

  <div>
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2 md:px-3">
        <label for="name" class="block mt-8 mb-4">Nombre</label>
        <input v-model="displayName" type="text" id="name" class="input input-bordered w-full" required
          :disabled="isEditable" />
      </div>
      <div class="md:w-1/2 md:px-3">
        <label for="email" class="block mt-8 mb-4">Email</label>
        <input v-model="email" type="email" id="email" class="input input-bordered w-full" required
          :disabled="isEditable" />
      </div>
    </div>


    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col md:w-1/2 px-3">

        <div class="flex">
          <div class="w-3/4">
            <label for="name" class="block mt-8 mb-4">Selecciones proyectos</label>
            <select v-model="proyectSelelected" class="select select-bordered w-full max-w-xs">
              <option disabled selected></option>
              <option v-for="proyect in configStore.proyect" :key="proyect.codigo" :value="proyect.codigo">
                {{ proyect.nombre }}
              </option>
            </select>
          </div>

          <div class="flex justify-end w-1/4 items-end">
            <button @click="addProyecto" class="btn btn-primary">+</button>
          </div>
        </div>

        <div v-if="proyect" class="flex gap-2 h-7">
          <div v-for="(item, i) in proyect" :key="i"
            class="flex gap-1 p-1 bg-gray-400 w-min h-min rounded-lg justify-between items-center mt-3">
            <span class="px-2">{{ item }}</span>
            <button @click="removeProyecto(item)" class="px-2"> x </button>
          </div>
        </div>

      </div>

      <div class="md:w-1/2 px-3">
        <div class="flex">
          <div class="w-3/4">
            <label for="name" class="block mt-8 mb-4">Tipo de usuario</label>
            <select v-model="typeUserSelelected" class="select select-bordered w-full max-w-xs">
              <option disabled selected></option>
              <option :value="UserType.DEV">Desarrollador</option>
              <option :value="UserType.QA">QA</option>
            </select>
          </div>

          <div class="flex justify-end w-1/4 items-end">
            <button @click="addTypeUser" class="btn btn-primary">+</button>
          </div>
        </div>

        <div v-if="typeUser" class="flex gap-2 h-7">
          <div v-for="(item, i) in typeUser" :key="i"
            class="flex gap-1 p-1 bg-gray-400 w-min h-min rounded-lg justify-between items-center mt-3">
            <span class="px-2">{{ item }}</span>
            <button @click="removeTypeUser(item)" class="px-2"> x </button>
          </div>
        </div>

      </div>
    </div>



    <div class="flex justify-between p-3 mt-16">
      <RouterLink :to="{ name: 'config-usuarios' }" class="btn btn-danger">Cancelar</RouterLink>

      <button v-if="!isLoading" @click="onRegister(uidGoogle)" class="btn btn-success">
        <span v-if="!isEditable">Crear</span>
        <span v-else>Editar</span>
      </button>
      <button v-else class="btn">
        <span class="loading loading-spinner"></span>
        <span v-if="!isEditable">Creando usuario</span>
        <span v-else>Editando usuario</span>
      </button>
    </div>

  </div>
</template>

<style scoped></style>