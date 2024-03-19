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
  <HeaderPages title="Documentación" :breadcrumbs="['E-Center', 'Documentación']" />

<div class="container mx-auto py-8">
  <div class="flex">
    <div class="flex-none w-1/4 h-min rounded shadow p-5 mb-10 bg-white">
      <RouterLink :to="{ name: 'docs-new'}" class="btn btn-block btn-success mb-8">Nuevo documento</RouterLink>

      <ul class="menu w-56 rounded-box">
        <li><a>Inicio</a></li>
        <li>
          <summary>Modulos</summary>
          <ul>
            <li><a>Autenticación</a></li>
            <li><a>Conbustibles</a></li>
            <li><a>Quimicos</a></li>
            <li><a>Lubricantes</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="flex-auto w-3/4 rounded shadow p-5 ml-5 mb-10 bg-white">
      <MdPreview :modelValue="texto" />
    </div>
  </div>
</div>
</template>

<style scoped></style>