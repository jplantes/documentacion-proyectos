<script setup lang="ts">

</script>

<template>
  <div class="flex items-center justify-center w-full h-lvh bg-white">
    
    <div class="flex h-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5 rounded-2xl shadow-2xl">
      <div 
        class="justify-center w-1/2 rounded-s-2xl hidden xl:block backgr"
        style="background-image: url(https://picsum.photos/600)"
      ></div>

      <div class="flex justify-center w-full xl:w-1/2 p-10">
        <RouterView />
      </div>
    </div>
    
  </div>
</template>

<style scoped>

</style>