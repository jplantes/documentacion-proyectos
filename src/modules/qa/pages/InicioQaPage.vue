<script setup lang="ts">
import { ref } from 'vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

import HeaderPages from '@/shared/components/HeaderPages.vue'

const texto = ref(`
# Hello Editor

\`Esto es un fragmento de codigo\`

| Paso 1 | Paso 2 |
| - | - |
| Contenido del cuadro 1 | Contenido del cuadro 2 |

\`\`\`mermaid
sequenceDiagram
  LOGIN->>B: hello!
  B-->>LOGIN: hi!
  B->>C: cambio
  LOGIN-)B: bye!
  \`\`\`

\`\`\`sh
rm -rf *
\`\`\`
`)
</script>

<template>

<HeaderPages title="Historias de usuario" :breadcrumbs="['E-Center', 'Historias de usuario']" />

<div class="container mx-auto py-8">
  <div class="flex">
    <div class="flex-none w-1/4 h-min rounded shadow p-5 mb-10 bg-white">
      <ul class="menu w-56 rounded-box">
        <li>
          <summary>Sprint 1303</summary>
          <ul>
            <li><a>ECCI-601</a></li>
            <li><a>ECCI-602</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="flex-auto w-3/4 rounded shadow p-5 ml-5 mb-10 bg-white">

      <h3 class="text-2xl mb-8">Historias de usuario ECCI-601</h3>
      <div class="collapse collapse-arrow bg-white mb-3 shadow">
        <input type="radio" name="historia-usuario" />
        <div class="collapse-title text-xl font-medium">
          Que el usuario al entrar solo pueda ver el boton litros pendientes
        </div>
        <div class="collapse-content">
          <div>
            <MdPreview :modelValue="texto" />
          </div>
          <div class="flex justify-between mt-5">
            <button class="btn btn-warning">Realizado</button>
            <button class="btn btn-success">Aprobado</button>
          </div>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-white mb-3 shadow">
        <input type="radio" name="historia-usuario" />
        <div class="collapse-title text-xl font-medium">
          Que el usuario al entrar solo pueda ver el boton litros pendientes
        </div>
        <div class="collapse-content">
          <div>
            <MdPreview :modelValue="texto" />
          </div>
          <div class="flex justify-between mt-5">
            <button class="btn btn-warning">Realizado</button>
            <button class="btn btn-success">Aprobado</button>
          </div>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-white mb-3 shadow">
        <input type="radio" name="historia-usuario" />
        <div class="collapse-title text-xl font-medium">
          Que el usuario al entrar solo pueda ver el boton litros pendientes
        </div>
        <div class="collapse-content">
          <div>
            <MdPreview :modelValue="texto" />
          </div>
          <div class="flex justify-between mt-5">
            <button class="btn btn-warning">Realizado</button>
            <button class="btn btn-success">Aprobado</button>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</div>
</template>

<style></style>
