

<template>
  <div class="">
    <!-- <div v-if="route.path == '/'" class="sidebar bg-slate-500 min-h-screen w-[300px] fixed left-0"></div> -->
     <TheHeader v-if="route.path == '/'" />
      <router-view></router-view>
    </div>
  
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from './store/auth.store';
import router from './router';
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { storeToRefs } from 'pinia';
import TheHeader from './components/TheHeader.vue';
const route = useRoute()

const {checkIfHasLogged} = useAuthStore()
const {isAuthenticate, user} = storeToRefs(useAuthStore())

let auth = ''
onMounted(async ()=>{
  auth = getAuth()
  onAuthStateChanged(auth, (userLogged)=>{
    if(userLogged){
      isAuthenticate.value = true
      user.value = userLogged
    } else{
      isAuthenticate.value = false
      user.value = userLogged
    }
  })
})

</script>
<style >
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import 'index.css';


</style>
