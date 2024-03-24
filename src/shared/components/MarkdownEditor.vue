<script setup lang="ts">
import { ref, defineProps } from 'vue'

import { MdEditor, config } from 'md-editor-v3'
import ES_AR from 'md-editor-v3-i18-es-ar'

import 'md-editor-v3/lib/style.css'

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


const emit = defineEmits(['save'])

const onSave = () => {
  emit('save', text.value)
}

</script>

<template>
  <div class="container mx-auto py-8">
    <MdEditor v-model="text" language="es_AR" :preview="false" @on-save="onSave" />
  </div>
</template>
