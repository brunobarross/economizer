import { createApp } from 'vue'
import './index.css'
import { createPinia } from 'pinia'
import router from './router/index.js'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app
.use(pinia)
.use(router)
app.mount('#app');
