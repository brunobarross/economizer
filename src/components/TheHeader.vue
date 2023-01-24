<template>
  <header class="bg-slate-800 fixed top-0 left-0 h-12 w-full">
    <div class="flex items-center justify-between h-full text-white">
      Bem vindo {{ user.email }}
      <button @click="logout">Sair</button>
    </div>
  </header>
</template>


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';
const {logout} = useAuthStore()
const { isAuthenticate, user } = storeToRefs(useAuthStore())


</script>