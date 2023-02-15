<template>
  <MainContainer>
    <div class="card p-6 !mt-8 md:!mt-16">
      <form @submit.prevent="handleSubmit(dadosUsuario.nome, email)">
        <div class="input-box">
          <label for="nome_usuario">Nome do perfil</label>
          <input type="text" id="nome_usuario" v-model="dadosUsuario.nome" placeholder="Digite seu nome" />
        </div>
        <div class="input-box mt-6">
          <label for="email_usuario">E-mail</label>
          <input type="text" id="email_usuario" v-model="dadosUsuario.email" disabled />
        </div>
        <div class="btn-container flex justify-end mt-6">
          <button class="btn w-full md:min-w-[128px] md:w-auto">Salvar alterações</button>
          <p class="text-red-600 text-base mt-2"> {{ erro }}</p>
        </div>
      </form>

    </div>
  </MainContainer>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import MainContainer from '../layouts/MainContainer.vue';
import { storeToRefs } from 'pinia';
import { usePerfilStore } from '../store/perfil.store'

const { editProfile } = usePerfilStore()

const { dadosUsuario } = storeToRefs(usePerfilStore())


const nome = ref(dadosUsuario.nome)


function handleSubmit(nomeVal){
  editProfile(nomeVal)
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