<template>
  <div class="grid grid-cols-6 h-screen">
    <SideBar class="bg-slate-300 col-span-1" />
    <div class="bg-slate-200 col-span-5 p-4">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar.vue'
</script>
