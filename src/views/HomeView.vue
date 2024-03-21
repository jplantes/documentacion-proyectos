<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useAuthStore } from '@/modules/auth/store/authStore'
import { useConfigStore } from '@/modules/config/store/configStore'

import HeaderPages from '@/shared/components/HeaderPages.vue'
import type { Proyecto } from '@/modules/config/interfaces/configInterfaces'

const verProyectos = ref<Proyecto[]>([])

const configStore = useConfigStore()
const authStore = useAuthStore()

onMounted(() => {
  // Muestro solo los proyectos que tengo configuraco
  const proyectUser = authStore.proyect
  configStore.proyect.forEach((proyect) => {
    if (proyectUser.includes(proyect.codigo)) {
      verProyectos.value.push(proyect)
    }
  })

})

</script>

<template>
  <HeaderPages title="Sistema documentación" :breadcrumbs="['Inicio']" />

  <div class="container mx-auto py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-8 ">

      <div v-for="modulo in verProyectos" :key="modulo.nombre" class="rounded shadow-2xl bg-white p-10">
        <h3 class="text-2xl mb-4">{{ modulo.nombre }}</h3>
        <p class="text-sm">{{ modulo.descripcion }}</p>

        <div class="flex w-full mt-5">
          <RouterLink :to="{ name: 'docs-proyectos', params: { proyect: modulo.codigo } }"
            class="grid w-1/2 card bg-base-200 rounded-box place-items-center">Docs</RouterLink>
          <!-- <div class="divider divider-horizontal text-sm">O</div>
          <RouterLink :to="{ name: 'qa-proyectos', params: { proyect: modulo.codigo } }"
            class="grid w-1/2 card bg-base-200 rounded-box place-items-center">QA</RouterLink> -->
        </div>
      </div>

    </div>
  </div>
</template>
