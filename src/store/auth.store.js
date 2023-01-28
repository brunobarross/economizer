import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { app, database } from '../firebase'
import router from '../router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore';

import { useHomeStore } from './home.store';


export const useAuthStore = defineStore('authStore', () => {
  const email = ref('')
  const senha = ref('')
  const erro = ref('')
  const user = ref('')
  const isAuthenticate = ref(false)
  const token = ref('')



  const collectionRef = collection(database, 'users')


  const auth = getAuth();
  function createAccount() {
    createUserWithEmailAndPassword(auth, email.value, senha.value)
      .then((userCredential) => {
        // Signed in 
        const userInfo = userCredential.user;
        addDoc(collectionRef, {
          nome: userInfo.providerData[0].displayName,
          email: userInfo.providerData[0].email,
          avatar: userInfo.providerData[0].photoURL,
          uid: userInfo.uid
        })
        

        router.push('/login')
      })
      .catch((error) => {

        erro.value = error.message;
        // ..
      });

  }

  async function checkIfHasLogged() {
    const sessionToken = sessionStorage.getItem('token')
    const sessionUser = sessionStorage.getItem('user')
    if (sessionToken && sessionUser) {
      isAuthenticate.value = true
      user.value = JSON.parse(sessionUser)
    } else {
      isAuthenticate.value = false
      user.value = ''
    }
  }

  async function loginInAccount() {
    await signInWithEmailAndPassword(auth, email.value, senha.value)
      .then((userCredential) => {
        // Signed in 
        isAuthenticate.value = true
        token.value = userCredential.user.accessToken
        sessionStorage.setItem('token', userCredential.user.accessToken)
        sessionStorage.setItem('user', JSON.stringify(userCredential.user))
        resetValues()
        router.push('/')

      })
      .catch((error) => {
        erro.value = error.message;
        resetValues()
      });
  }

  async function logout() {
    const {data} = storeToRefs(useHomeStore())
    signOut(auth).then(() => {
      // Sign-out successful.
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      data.value = []
      router.push('/login')
    }).catch((error) => {
      console.log(error.message)
      erro.value = error.message
      // An error happened.
    });
  }

  function resetValues(){
    email.value = ''
    senha.value = ''
  }


  return { email, senha, createAccount, loginInAccount, isAuthenticate, user, checkIfHasLogged, erro, logout }
})

