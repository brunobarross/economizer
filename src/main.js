import { createApp } from 'vue'

import './index.css'
import { createPinia } from 'pinia'
import router from './router/index.js'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faArrowLeft, faTrash,faPlus } from "@fortawesome/free-solid-svg-icons";

import App from './App.vue'

library.add(faArrowLeft);
library.add(faTrash);
library.add(faPlus);

const pinia = createPinia()
const app = createApp(App)
app
  .use(pinia)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
