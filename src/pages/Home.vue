<template>
    <div class="main">
        <div class="min-h-screen flex flex-col pt-40">

            <div class="flex flex-col" v-if="situacao == 'tabela'">
                <div class="flex flex-col mb-6 w-full">
                    <div class="flex justify-end">
                        <button class="btn" @click="situacao = 'cadastro'">Adicionar novo</button>
                    </div>
                </div>
                <div class="grid-home">
                    <Tabela :data="data" />
                    <div class="card p-6">
                        <p>Total de receitas: R$ {{ totalReceita }}</p>
                        <p>Total de despesas: R$ {{ totalDespesas }}</p>
                        <p>Saldo atual: {{ saldoAtual }}</p>
                    </div>
                </div>
            </div>
            <NovoItem v-else-if="situacao == 'cadastro'" @changeSituation="updateSituation" />

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';
import Tabela from '../layouts/Tabela.vue'
import NovoItem from '../layouts/NovoItem.vue'
import { app, database } from '../firebase'
import { getDocs, collection, query, doc } from 'firebase/firestore'
const { isAuthenticate, user } = storeToRefs(useAuthStore())
const situacao = ref('tabela')
const data = ref([])

onMounted(() => {
    getData()
})



async function getData() {
    const q = query(collection(database, "itens"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.data()) {
            data.value = [...data.value, doc.data()]
            return data.value
        }
    })
}


function updateSituation(val) {
    situacao.value = val

}


const totalDespesas = computed(() => {
    const despesasArr = data.value.filter((i) => i.tipo == 'despesa').reduce((acc,i)=>{
        return acc += i.valor
    },0)

    return despesasArr.toFixed(2).replace('.', ',')
})


const totalReceita = computed(() => {
    const despesasArr = data.value.filter((i) => i.tipo == 'receita').reduce((acc,i)=>{
        return acc += i.valor
    },0)

    return despesasArr.toFixed(2).replace('.', ',')
})


const saldoAtual = computed(() => {

    console.log()
    return Number(totalReceita.value.replace(',', '.') - totalDespesas.value.replace(',', '.').replace('-', '')).toFixed(2).replace('.', ',')
})


</script>


<style scoped>
.main {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: -300px;
}

.grid-home {
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 2rem;
}
</style>


