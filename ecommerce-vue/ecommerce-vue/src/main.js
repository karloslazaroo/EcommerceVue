import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import Cart from './components/Cart.vue';
import Product from './components/HelloWorld.vue'
import Admin from './components/Admin.vue'


const routes = [
  { path: '/', component: Product },
  { path: '/cart', component: Cart },
  { path: '/admin', component: Admin }
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

createApp(App).use(router).mount('#app');
