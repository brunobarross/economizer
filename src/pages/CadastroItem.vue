<template>
  <MainContainer>


    <div class="card p-6">

      <div class="header-card flex-row justify-between">
        <p class="font-semibold text-sm text-primary-pure"> Novo cadastro</p>
        <h3 class="font-semibold text-2xl text-neutral-700 capitalize">{{ tipo }}</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8">
        <div class="input-box col-span-6">
          <label for="nome">Nome*</label>
          <input type="text" id="nome" v-model="nome" placeholder="Digite o nome" />
        </div>
        <div class="input-box col-span-6">
          <label for="tipo">Tipo*</label>
          <select name="tipo" id="tipo" v-model="tipo">
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>
        <div class="input-box col-span-6">
          <label for="data">Data de referĂȘncia*</label>
          <input type="date" id="data" v-model="dataReferencia" placeholder="Digite a data" />
        </div>
        <div class="input-box col-span-6">
          <label for="valor">Valor*</label>
          <input type="number" id="valor" placeholder="Digite o valor" v-model="valor" />
        </div>
      </div>
      <p class="text-red-600 text-base mt-2"> {{ erroTxt}}</p>
      <div class="btn-container flex justify-end mt-6">
        <router-link to="/">
          <button class="btn secondary w-full md:min-w-[128px] md:w-auto mr-2">Cancelar</button>
        </router-link>
        <button class=" btn w-full md:min-w-[128px] md:w-auto" @click="createNewItem(user.uid)">Salvar</button>
      </div>
 

    </div>

  </MainContainer>
</template>





<script setup>

import { ref, defineEmits, defineComponent } from 'vue'
import { app, database } from '../firebase'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';
import { useHomeStore } from '../store/home.store';
import MainContainer from '../layouts/MainContainer.vue';


const { user } = storeToRefs(useAuthStore())

const { nome, tipo, dataReferencia, valor, meses, mesReferencia, erro, erroTxt } = storeToRefs(useHomeStore())
const { createNewItem } = useHomeStore();

/* valores dos inputs */
const emit = defineEmits(['changeSituation'])





</script>

<style scoped>
.input-box label {
  margin-bottom: .5rem;
  display: block;
  font-weight: 400;
  font-size: .875rem;

}

.input-box input,
select {
  border-radius: 4px;
  padding: .5rem;
  outline: none;
  width: 100%;
  border: 1px solid #E6E6E6;
  height: 3rem;
  font-size: .875rem;
}



.card {
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}
</style>