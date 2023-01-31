

<template>
  <div class="">
    <router-view></router-view>

  </div>

</template>
<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from './store/auth.store';
import { usePerfilStore } from './store/perfil.store';
import router from './router';
import { onMounted, computed } from 'vue';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { storeToRefs } from 'pinia';
const route = useRoute()

const { checkIfHasLogged } = useAuthStore()
const { isAuthenticate, user } = storeToRefs(useAuthStore())
const {getDataProfile} = usePerfilStore();

let auth = ''
onMounted(async () => {
  auth = getAuth()
  onAuthStateChanged(auth, (userLogged) => {
    if (userLogged) {
      isAuthenticate.value = true
      user.value = userLogged
 
    } else {
      isAuthenticate.value = false
      user.value = userLogged
    }
  })

  getDataProfile(); 
})

const currentRouteName = computed(() => {
  return route.name;
})



</script>
<style >
@import 'index.css';

</style>
