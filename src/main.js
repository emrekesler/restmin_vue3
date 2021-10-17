import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import Header from "@/components/Shared/Header";


const app = createApp(App);
app.component("Header", Header)
app.use(store);
app.use(router);
app.mount('#app');
