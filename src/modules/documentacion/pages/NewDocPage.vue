<script setup lang="ts">
import HeaderPages from '@/shared/components/HeaderPages.vue';
import MarkdownEditor from '@/shared/components/MarkdownEditor.vue';

const save = (value: string) => {
  console.log(value);
};

</script>

<template>
  <HeaderPages title="Nuevo documento" :breadcrumbs="['E-Center','Documentos','Nuevo documento']" />

  <MarkdownEditor
    @save="save"
  />
</template>

<style scoped>

</style>