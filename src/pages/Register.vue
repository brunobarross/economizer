<template>
  <div class="min-h-screen grid grid-cols-2">
    <div class="bg-green-600 w-full h-full "></div>
    <div class="area h-full flex flex-col items-center justify-center p-8">
      <div class="mx-auto max-w-[300px] w-full">
        <div class="input-box w-full">
          <label for="email">Seu e-mail</label>
          <input type="email" class="shadow" placeholder="ex: user@gmail.com" id="email" v-model="email" />
        </div>
        <div class="input-box mt-6 w-full">
          <label for="password">Sua senha</label>
          <input type="password" class="shadow" v-model="senha" placeholder="Digite sua senha" />
        </div>
        <div class="btn-container w-full">
          <button class="bg-green-600 text-white mt-6 transition-all hover:border-green-600 hover:bg-transparent hover:text-green-600" @click="createAccount">Cadastrar-se</button>
          {{ erro }}
        </div>

      </div>

    </div>
  </div>
</template>


<script setup>
import { useAuthStore } from '../store/auth.store';

import { storeToRefs } from 'pinia'

const { email, senha, erro } = storeToRefs(useAuthStore())

const {createAccount} = useAuthStore()




</script>

<style scoped>
.input-box label {
  margin-bottom: .5rem;
  display: block;
  font-weight: 400;
}

.input-box input {
  border-radius: 4px;
  padding: .5rem 1rem;
  outline: none;
  width: 100%;
}

button {
  display: inline-flex;
  outline: none;
  justify-content: center;
  align-items: center;
  padding: .5rem 1rem;
  border-radius: 4px;
  width: 100%;
  border: 2px solid transparent;
  font-weight: 500;

}
</style>