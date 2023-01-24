<template>
  <div class="card p-6">
    <div class="header-card">
      <p class="font-bold text-sm text-green-600">Novo cadastro</p>
      <h3 class="font-bold text-2xl text-neutral-700 capitalize">{{ tipo }}</h3>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-8">
      <div class="input-box">
        <label for="nome">Nome</label>
        <input type="text" id="nome" v-model="nome" placeholder="Digite o nome" />
      </div>
      <div class="input-box">
        <label for="tipo">Tipo</label>
        <select name="tipo" id="tipo" v-model="tipo">
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      <div class="input-box">
        <label for="data">Data</label>
        <input type="date" id="data" v-model="data" placeholder="Digite a data" />
      </div>
      <div class="input-box">
        <label for="valor">Valor</label>
        <input type="number" id="valor" placeholder="Digite o valor" v-model="valor" />
      </div>
    </div>

    <div class="btn-container flex justify-end mt-6">
      <button class="btn" @click="handleSubmit">Salvar</button>
    </div>

  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { app, database } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';

const { user } = storeToRefs(useAuthStore())
const collectionRef = collection(database, 'itens')

/* valores dos inputs */
const nome = ref('');
const tipo = ref('receita')
const data = ref(null)
const valor = ref('')


const emit = defineEmits(['changeSituation'])


function handleSubmit() {
  let curentDate = new Date().getTime(),
    date = curentDate.toString();
  addDoc(collectionRef, {
    nome: nome.value,
    tipo: tipo.value,
    valor: tipo.value == 'receita' ? valor.value : -valor.value,
    data: date,
    owner: user.value.uid
  })
    .then((response) => {
      console.log(response)
      emit('changeSituation', 'tabela')

    })
    .catch((err) => {
      console.log(err.message)
    })
}


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
  padding: .5rem 1rem;
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