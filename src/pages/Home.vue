<template>
    <MainContainer>
        <div class="flex flex-col md:pb-0 pb-16 ">
            <div class="flex flex-col mb-6 w-full">
                <div class="flex justify-between items-center">
                    <div class="select-box">
                        <label for="mes_referencia">Selecione um mês de referência:</label>
                        <select class="mes_referencia">
                            <option value="" selected disabled>Selecionar</option>
                            <option :value="mes.nome
                            " v-for="mes in meses['2023']" :key="mes.id
">{{ mes.nome }}</option>
                        </select>
                    </div>
                    <router-link to="/cadastro"> <button class="btn">
                            Adicionar novo
                            <font-awesome-icon icon="fa-solid fa-plus" class="ml-2" />
                        </button></router-link>

                </div>
            </div>
            <div class="grid-home">
                <Tabela @removeu="getData" />
                <div class="flex flex-col gap-4">
                    <div class="card p-6 sm">
                        <h3 class="text-lg font-medium text-neutral-500 flex items-center ">Total de Receitas
                            <font-awesome-icon icon="fa-duotone fa-credit-card" />
                        </h3>
                        <p class="text-2xl font-bold text-neutral-700 mt-2"> <span class="text-base ">R$</span> {{ totalReceita }}</p>

                    </div>
                    <div class="card p-6 sm">
                        <h3 class="text-lg font-medium text-neutral-500 ">Total de Despesas:</h3>
                        <p class="text-2xl font-bold text-neutral-700 mt-2">
                            <span class="text-base ">R$</span> {{ totalDespesas }}
                        </p>

                    </div>
                    <div class="card p-6">
                        <h3 class="text-lg font-medium text-neutral-500">Saldo atual:</h3>
                        <p class="text-2xl font-bold text-neutral-700 mt-2"> <span class="text-base">R$</span> {{ saldoAtual }}</p>
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';
import Tabela from '../layouts/Tabela.vue'
import { useHomeStore } from '../store/home.store';
import MainContainer from '../layouts/MainContainer.vue';

const { getData, updateSituation, situacao } = useHomeStore()

const { dadosFiltrados, meses } = storeToRefs(useHomeStore())

const { isAuthenticate, user } = storeToRefs(useAuthStore())


onMounted(async () => {
    await getData()

})


const totalDespesas = computed(() => {
    if (!dadosFiltrados.value) return
    const despesasArr = dadosFiltrados.value.filter((i) => i.tipo == 'despesa').reduce((acc, i) => {
        return acc += i.valor
    }, 0)

    return despesasArr.toFixed(2).replace('.', ',')
})


const totalReceita = computed(() => {
    if (!dadosFiltrados.value) return
    const despesasArr = dadosFiltrados.value.filter((i) => i.tipo == 'receita').reduce((acc, i) => {
        return acc += i.valor
    }, 0)

    return despesasArr.toFixed(2).replace('.', ',')
})


const saldoAtual = computed(() => {
    return Number(totalReceita.value.replace(',', '.') - totalDespesas.value.replace(',', '.').replace('-', '')).toFixed(2).replace('.', ',')
})


</script>


<style scoped>
.select-box label {
    margin-bottom: .5rem;
    display: block;
    font-weight: 400;
    font-size: 1rem;

}

.select-box 
select {
    border-radius: 4px;
    padding: .5rem;
    outline: none;
    width: 100%;
    border: 1px solid #E6E6E6;
    height: 3rem;
    font-size: 1rem;
}

.grid-home {
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 2rem;
    align-items: flex-start;
}

@media(max-width: 539px) {
    .grid-home {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
}
</style>

