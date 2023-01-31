<template>
  <div class="min-h-screen flex flex-col justify-center md:grid  md:grid-cols-2">
  

    <div class="bg-primary-dark w-full h-full hidden md:block "></div>
    <div class="area h-full flex flex-col items-center justify-center p-8">
      <div class="mx-auto max-w-[350px] w-full">
        <h1 class="text-[2rem] font-semibold">Fazer Login</h1>
        <p class="text-sm mt-1 font-medium text-neutral-400">Insira seu e-mail e senha para entrar em sua conta.</p>

        <form @submit.prevent="loginInAccount" class="mt-8">
          <div class="input-box w-full">
            <label for="email">Seu e-mail</label>
            <input type="email" class="shadow" placeholder="ex: user@gmail.com" id="email" v-model="email" />
          </div>
          <div class="input-box mt-6 w-full">
            <label for="password">Sua senha</label>
            <input type="password" class="shadow" v-model="senha" placeholder="Digite sua senha" />
          </div>
          <div class="btn-container w-full">
            <button class="btn mt-6 hover:border-primary-dark hover:bg-transparent hover:text-green-600 w-full">Entrar</button>
            <p class="text-red-600 text-sm mt-2"> {{ erro }}</p>
          </div>
        </form>
        <div class="area">
          <p class="mt-4 text-base">Ainda não tem uma conta? <router-link to="/register"><span class="text-primary-dark font-medium">Inscreva-se</span></router-link></p>
        </div>
        

      </div>

    </div>
  </div>
</template>


<script setup>
import { useAuthStore } from '../store/auth.store';

import { storeToRefs } from 'pinia'
const { email, senha, erro } = storeToRefs(useAuthStore())
const { loginInAccount } = useAuthStore()


</script>

<style scoped>
.input-box label {
  margin-bottom: .5rem;
  display: block;
  font-weight:500;
  font-size: .875rem;
}

.input-box input {
  border-radius: 4px;
  padding: .5rem 1rem;
  outline: none;
  width: 100%;
  font-size: .875rem;
  height: 2.5rem;
}


</style>