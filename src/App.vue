<template>
  <div class="grid grid-cols-6 h-screen">
    <SideBar class="col-span-1" />
    <div class="bg-slate-200 col-span-5 p-4">
      <UserHeader v-if="userStore.isAuthorized" />
      <router-view  :key="$route.path" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import UserHeader from './components/UserHeader.vue';
import { useUserStore } from './stores/UserStore';

const userStore = useUserStore()
</script>
