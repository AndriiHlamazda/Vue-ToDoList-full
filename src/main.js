import Vue from 'vue';
import App from './App';
import './assets/tailwind.css';

import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

// eslint-disable-next-line vue/require-name-property
new Vue({
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
