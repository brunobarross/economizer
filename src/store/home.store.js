import { ref, onMounted, computed, watch } from 'vue'
import { defineStore,storeToRefs } from 'pinia'
import { app, database } from '../firebase'
import { getDocs, collection, query, doc, addDoc, where, onSnapshot } from 'firebase/firestore'
import router from '../router'
import { useAuthStore } from './auth.store'
const collectionRef = collection(database, 'itens')





export const useHomeStore = defineStore('homeStore', () => {
  const data = ref([]);
  const nome = ref('');
  const tipo = ref('receita')
  const dataCriacao = ref(null)
  const valor = ref('')
  const situacao = ref('tabela')

  async function getData() {

    onSnapshot(collectionRef, (querySnapshot)=>{
      const fbItens = []
      querySnapshot.forEach((doc)=>{
        const item = {
          id: doc.id,
          nome: doc.data().nome,
          tipo: doc.data().tipo,
          valor: doc.data().valor,
          dataCriacao: doc.data().dataCriacao,
        }
        fbItens.push(item)
      })
      data.value = fbItens
    })
  
  }


  async function createNewItem(usuario) {
    let curentDate = new Date().getTime(),
      date = curentDate.toString();
    const obj = {
      nome: nome.value,
      tipo: tipo.value,
      valor: tipo.value == 'receita' ? valor.value : -valor.value,
      data: date,
      owner: usuario
    }
    await addDoc(collectionRef, obj)
      .then((response) => {
        router.push('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  
async function deleteItem(id){
  try{
    await deleteDoc(doc(database, "itens", id));
  } catch(err){
    console.log(err)
  }

}



  return { getData, data,createNewItem,nome,tipo,valor,dataCriacao,  situacao, deleteItem }
})