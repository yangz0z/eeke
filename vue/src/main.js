import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// Vue.prototype.$http = axios

const app = createApp(App)

app.use(router)
app.config.globalProperties.axios = axios; // axios 전역화
app.mount('#app')