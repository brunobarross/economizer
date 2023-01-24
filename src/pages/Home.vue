<template>
    <div class="main ml-[300px] px-6">
        <div class="min-h-screen flex flex-col justify-center">
            <div class="relative overflow-x-auto">
                <button @click="situacao = 'cadastro'">Novo item</button>
                <Tabela v-if="situacao == 'tabela'"/>
                <NovoItem v-else-if="situacao == 'cadastro'"/>
            </div>

        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';
import Tabela from '../layouts/Tabela.vue'
import NovoItem from '../layouts/NovoItem.vue'
const {isAuthenticate, user} = storeToRefs(useAuthStore())



const situacao = ref('tabela')
</script>


