import { ref, onMounted, computed, watch } from 'vue'
import { defineStore,storeToRefs } from 'pinia'
import { app, database } from '../firebase'
import { getDocs, collection, query, doc, addDoc, where, onSnapshot, deleteDoc } from 'firebase/firestore'
import router from '../router'
import { useAuthStore } from './auth.store'


export const useHomeStore = defineStore('homeStore', () => {
  const data = ref([]);
  const nome = ref('');
  const tipo = ref('receita')
  const dataCriacao = ref(null)
  const valor = ref('')
  const situacao = ref('tabela')
  
  const {user} = storeToRefs(useAuthStore())
  const collectionRef = collection(database, 'itens');
 const  collectionRefQuery = (collection(database, 'itens'));


  async function getData() {

    onSnapshot(collectionRefQuery, (querySnapshot)=>{
      console.log(user.value)
      const fbItens = []
      let dadosFiltrados = [];
      querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        const item = {
          id: doc.id,
          nome: doc.data().nome,
          tipo: doc.data().tipo,
          valor: doc.data().valor,
          dataCriacao: doc.data().dataCriacao,
          owner: doc.data().owner
        }
 
        fbItens.push(item)
        dadosFiltrados = fbItens.filter((data)=> data.owner == user.value.uid)
   
      })
      data.value = dadosFiltrados
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