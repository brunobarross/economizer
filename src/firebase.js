// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyA1WSJq5FghlYedjJpaExSeoZleBFkByzc",
  authDomain: "controle-despesas-d9a45.firebaseapp.com",
  projectId: "controle-despesas-d9a45",
  storageBucket: "controle-despesas-d9a45.appspot.com",
  messagingSenderId: "270233472127",
  appId: "1:270233472127:web:19924b161b5aa89686034a"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)