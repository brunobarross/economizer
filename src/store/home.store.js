import { ref, onMounted, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { app, database } from '../firebase'
import { getDocs, collection, query, doc, addDoc, where, onSnapshot, deleteDoc } from 'firebase/firestore'
import router from '../router'
import { useAuthStore } from './auth.store'


export const useHomeStore = defineStore('homeStore', () => {
  const dadosFiltrados = ref([]);
  const nome = ref('');
  const tipo = ref('receita')
  const dataReferencia = ref(null)
  const mesReferencia = ref(null)
  const valor = ref('')
  const situacao = ref('tabela')
  const { user } = storeToRefs(useAuthStore())
  const collectionRef = collection(database, 'itens');
  const collectionRefQuery = (collection(database, 'itens'));

  const meses = ref({
    2023: [
      {
        id: 0,
        nome: 'Janeiro',
      },
      {
        id: 1,
        nome: 'Fevereiro'
      },
      {
        id: 2,
        nome: 'Março'
      },
      {
        id: 3,
        nome: 'Abril'
      },
      {
        id: 4,
        nome: 'Maio'
      },
      {
        id: 5,
        nome: 'Junho'
      },
      {
        id: 6,
        nome: 'Julho'
      },
      {
        id: 7,
        nome: 'Agosto'
      },
      {
        id: 8,
        nome: 'Setembro'
      },
      {
        id: 9,
        nome: 'Outubro'
      },
      {
        id: 10,
        nome: 'Novembro'
      },
      {
        id: 11,
        nome: 'Dezembro'
      },
    ]
  });




  async function getData() {
    onSnapshot(collectionRefQuery, (querySnapshot) => {
      const fbItens = []
      querySnapshot.forEach((doc) => {
        const item = {
          id: doc.id,
          nome: doc.data().nome,
          tipo: doc.data().tipo,
          valor: doc.data().valor,
          mes_referencia: doc.data().mes_referencia,
          data_referencia: doc.data().data_referencia,
          owner: doc.data().owner
        }

        fbItens.push(item)
      })
      dadosFiltrados.value = fbItens.filter((data) => data.owner == user.value.uid)

      console.log(dadosFiltrados.value);


    })

  }


  async function createNewItem(usuario) {

    const obj = {
      nome: nome.value,
      tipo: tipo.value,
      valor: tipo.value == 'receita' ? valor.value : -valor.value,
      mes_referencia: mesReferencia.value,
      data_referencia: dataReferencia.value,
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

async function createNewMonth(){
  
}


  async function deleteItem(id) {
    try {
      await deleteDoc(doc(database, "itens", id));
    } catch (err) {
      console.log(err)
    }

  }



  return { getData, dadosFiltrados, createNewItem, nome, tipo, valor, dataReferencia, situacao, deleteItem, meses }
})