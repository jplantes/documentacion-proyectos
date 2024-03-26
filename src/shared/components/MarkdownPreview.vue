<script setup lang="ts">

import { defineProps, ref } from 'vue'

import { MdPreview, config } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import ES_AR from 'md-editor-v3-i18-es-ar'

const props = defineProps<{
  texto: string,
}>()

const text = ref()


if (props.texto) {
  text.value = props.texto
}

config({
  editorConfig: {
    languageUserDefined: {
      'es_AR': ES_AR
    }
  }
})
</script>

<template>
  <MdPreview language="es_AR" :modelValue="texto" />
</template>