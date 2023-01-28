import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.store'
import { storeToRefs } from 'pinia'
import pinia from '../store/store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Tabela from '../layouts/Tabela.vue'
import CadastroItem from '../pages/CadastroItem.vue'
import MinhaConta from '../pages/MinhaConta.vue'





const routes = [,
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      requireLogin: true
    },

    
  },

  {
    name: 'Minha Conta',
    path: '/minha-conta',
    component: MinhaConta,
    meta: {
      requireLogin: true
    },

    
  },

  {
    name: 'Cadastro',
    path: '/cadastro',
    component: CadastroItem,
    meta: {
      requireLogin: true
    },

    
  },

  {
    name: 'Login',
    path: '/login',
    component: Login,
    // beforeEnter: function (to, from, next) {
    //   const { isAuthenticate, user } = useAuthStore(pinia)
    //   if (isAuthenticate && user) {
    //     next({ name: 'Home', query: { redirectFrom: to.fullPath } })
    //   }

    // },
  },
  { name: 'Register', path: '/register', component: Register }
]


const router = createRouter({
  history: createWebHistory(),
  routes

})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin == true)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }

})

export default router