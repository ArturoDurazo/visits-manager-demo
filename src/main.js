import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import StoragePlugin from 'vue-web-storage';

createApp(App).use(router).use(StoragePlugin).mount('#app')
