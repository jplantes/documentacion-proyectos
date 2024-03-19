<script setup lang="ts">

interface HeaderPagesProps {
  title: string
  breadcrumbs: string[]
}

const props = defineProps<HeaderPagesProps>()

</script>

<template>
  <div class="flex h-52 bg-gradient-to-r from-indigo-200 from-10% to-blue-600 to-90%">
    <div class="container mx-auto">
      <div class="text-sm breadcrumbs py-8">
        <ul>
          <li v-for="item of props.breadcrumbs" v-bind:key="item">
            {{ item }}
          </li>
        </ul>
      </div>
  
      <h3 class="text-3xl self-center">{{ props.title }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>