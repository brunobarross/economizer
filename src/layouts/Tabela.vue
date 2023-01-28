<template>
  <div class="relative overflow-x-auto shadow-sm-custom border border-neutral-200 sm:rounded-lg tabela lg:-order-none order-2" >
    <table class="w-full text-sm text-left text-gray-500 rounded-md ">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr class="capitalize border-b border border-neutral-200">
          <th scope="col" class="px-6 py-4 w-[40%]">
            Nome
          </th>
          <th scope="col" class="px-6 py-4">
            Tipo
          </th>
          <th scope="col" class="px-6 py-4">
            Data
          </th>
          <th scope="col" class="px-6 py-4">
            Valor
          </th>
          <th scope="col" class="px-6 py-4">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b capitalize " v-for="item in data" v-if="data.length">
          <th scope="row" class="px-6 py-4 font-normal  whitespace-nowrap capitalize">
            {{ item.nome }}
          </th>
          <td class="px-6 py-4">
            {{ item.tipo }}
          </td>
          <td class="px-6 py-4">
            {{ item.data }}
          </td>
          <td class="px-6 py-4" :class="item.tipo">
            R$ {{ item.valor.toFixed(2).replace('.', ',') }}
          </td>
          <td class="px-6 py-4">
            <button class="btn sm delete" @click="deleteItem(item.id)">Deletar</button>
          </td>
        </tr>
        <tr class="bg-white border-b" v-else>
          <th scope="row" class="px-6 py-4 font-normal  whitespace-nowrap text-center" colspan="12">
            Não há itens cadastrados
          </th>
        </tr>

      </tbody>
    </table>
  </div>
</template>


<script setup>
import {ref, computed, onMounted} from 'vue'
import { doc, deleteDoc } from "firebase/firestore";
import { database } from '../firebase';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../store/home.store';



const {data} = storeToRefs(useHomeStore())

const {deleteItem} = useHomeStore();




const props = defineProps(['data'])


// const timestampToDate = async (timestamp) => {
//   const date = new Date(timestamp);
//   console.log(date)
//   date.toLocaleDateString('pt-BR')
//   return date
// }



</script>

<style scoped>
/* .tabela {
  border: 1px solid #E6E6E6;
} */

table th, table td{
  color: rgba(26, 26, 26, 1);
  font-size: .875rem !important;

}

table > th{
  font-weight: 500;
}

table > td {
  font-weight: 400;
}

.receita{
  color: green;
}

.despesa{
  color: red;
}
</style>