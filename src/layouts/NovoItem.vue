<template>
  <div class="grid grid-cols-2 max-w-[600px] mx-auto gap-4">
    <div class="input-box">
      <label for="nome">Nome</label>
      <input type="text" id="nome" class="shadow border border-neutral-400" v-model="nome" placeholder="Digite o nome"/>
    </div>
    <div class="input-box">
      <label for="tipo">Tipo</label>
      <select name="tipo" id="tipo" class="shadow border border-neutral-400" v-model="tipo">
        <option value="gastos">Gastos</option>
        <option value="ganhos">Ganhos</option>
      </select>
    </div>
    <div class="input-box">
      <label for="data">Data</label>
      <input type="date" class="shadow border border-neutral-400" id="data" v-model="data" placeholder="Digite a data"/>
    </div>
    <div class="input-box">
      <label for="valor">Valor</label>
      <input type="text" class="shadow border border-neutral-400" id="valor" placeholder="Digite o valor" v-model="valor"/>
    </div>

    <div class="btn-container">
      <button @click="handleSubmit">Enviar</button>
    </div>

    
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {app, database} from '../firebase'
import {addDoc, collection} from 'firebase/firestore'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';

const {user} = storeToRefs(useAuthStore())
const nome = ref('');
const tipo = ref('')
const data = ref(null)
const valor = ref('')
const collectionRef = collection(database, 'itens')
function handleSubmit(){
console.log(user.value.uid)
  addDoc(collectionRef,{
    nome:nome,
    tipo:tipo,
    valor:valor,
    owner: user.value.uid
  })
  .then((response)=>{
    console.log(response)
  })
  .catch((err)=>{
    console.log(err.message)
  })
}

</script>

<style scoped>


.input-box label{
  margin-bottom: .5rem;
  display: block;
  font-weight: 400;
}
.input-box input, select{
  border-radius: 4px;
  padding: .5rem 1rem;
  outline: none;
  width: 100%;
}

button{
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