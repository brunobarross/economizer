<template>
  <header class="bg-green-900 fixed top-0 left-0 py-4 w-full h-20">
    <div class="container-header">
      <div class="flex items-center justify-between h-full text-white">
        <p class="font-medium text-base">Bem vindo {{ user.email }}</p>
        <button class="btn !bg-white text-green-600 h-9 hover:bg-transparent hover:border-white" @click="logout">Sair</button>
      </div>

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

<style scoped>
header{
  /* left: 300px;
  right: 300px; */
}
.container-header{
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

</style>