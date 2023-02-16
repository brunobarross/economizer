import { ref, onMounted, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { app, database } from '../firebase'
import {  collection,doc,onSnapshot,updateDoc } from 'firebase/firestore'
import router from '../router'
import { useAuthStore } from './auth.store'


export const usePerfilStore = defineStore('perfilStore', () => {
  const dadosUsuario = ref(
    {
      uid: '',
      nome: '',
      email: '',
    });
    const erro = ref(false)
    const erroTxt = ref('')

  


  const { user } = storeToRefs(useAuthStore())

  const collectionRefQuery = (collection(database, 'users'));
  async function getDataProfile() {
    onSnapshot(collectionRefQuery, (querySnapshot) => {
      let userLogged = {}
      let filtro = []
      querySnapshot.forEach((doc) => {
        const item = {
          id: doc.id,
          uid: doc.data().uid,
          nome: doc.data().nome,
          email: doc.data().email,
        }

        userLogged = item

        if(user.value){
          filtro = [userLogged].filter((usuario)=> usuario.uid === user.value.uid)
        }




      })
      dadosUsuario.value = {...filtro[0]}

    })

  }


  async function editProfile(val1){

    const userToUpdate = doc(collectionRefQuery, dadosUsuario.value.id)
    updateDoc(userToUpdate,{
      nome: val1,
    })
    .then(()=>{
      router.push('/')
    })
    .catch((err)=>{
      erro.value = true
      erroTxt.value = err.message
    })
  }









  return { getDataProfile, dadosUsuario, editProfile}
})