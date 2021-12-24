import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { i18n } from 'vue-lang-router';
import { FontAwesomeIcon } from './plugins/font-awesome'
import setupInterceptors from './services/setupInterceptors';
setupInterceptors(store);

createApp(App)
  .use(router)
  .use(i18n)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
