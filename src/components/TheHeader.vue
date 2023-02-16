<template>
  <header class="bg-white fixed top-0 left-0 py-4 w-full h-16 border-b border-neutral-200">
    <div class="container-header px-6">
      <div class="flex items-center justify-between h-full text-white">
        <p class="font-medium text-bas text-neutral-100">Bem vindo, {{ dadosUsuario.nome ? dadosUsuario.nome : dadosUsuario.email }}!</p>
        <div class="links flex items-center">
          <router-link to="/"><a class="text-base inline-flex justify-center items-center text-primary-pure h-9 hover:text-primary-dark font-medium cursor-pointer">Home</a></router-link>
          <router-link to="/minha-conta"><a class="text-base inline-flex justify-center items-center text-primary-pure h-9 hover:text-primary-dark font-medium cursor-pointer ml-8">Minha conta</a></router-link>
          <a @click="logout" class="inline-flex justify-center items-center text-primary-pure h-9 hover:text-primary-dark ml-8 text-base cursor-pointer font-medium">Sair</a>

        </div>
      </div>


    </div>
  </header>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth.store';
import { usePerfilStore } from '../store/perfil.store';
import { storeToRefs } from 'pinia';
const { logout } = useAuthStore()
const { isAuthenticate, user } = storeToRefs(useAuthStore())
const { dadosUsuario } = storeToRefs(usePerfilStore())


</script>

<style scoped>
.container-header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>