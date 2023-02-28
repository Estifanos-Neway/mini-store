<template>
  <div class="grid grid-cols-6 h-screen">
    <SideBar class="col-span-1 " />
    <div class="bg-slate-200 col-span-5 p-4 h-screen overflow-y-scroll">
      <UserHeader v-if="userStore.isAuthorized" />
      <div class="h-1 w-[50%] mt-[2px]" :class="{'bg-blue-300':generalStore.isLoading}"></div>
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import UserHeader from './components/UserHeader.vue';
import { useUserStore } from './stores/UserStore';
import { useGeneralStore } from './stores/GeneralStore';

const userStore = useUserStore()
const generalStore = useGeneralStore()
</script>
