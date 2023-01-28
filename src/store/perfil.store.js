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



  const { user } = storeToRefs(useAuthStore())

  const collectionRefQuery = (collection(database, 'users'));
  async function getData() {
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
        
        filtro = [userLogged].filter((usuario)=> usuario.uid === user.value.uid)



      })
      dadosUsuario.value = {...filtro[0]}

    })

  }


  async function editProfile(){

    const userToUpdate = doc(collectionRefQuery, dadosUsuario.value.id)

    console.log(userToUpdate);

    updateDoc(userToUpdate,{
      nome: dadosUsuario.value.nome,
    })
    .then(()=>{
      alert('certo')
      router.push('/')
    })
  }









  return { getData, dadosUsuario, editProfile}
})