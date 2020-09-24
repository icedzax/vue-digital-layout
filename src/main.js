import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import vmodal from "vue-js-modal";
import vuetify from "./plugins/vuetify";
import titleMixin from './titleMixin'

Vue.config.productionTip = false;


Vue.mixin(titleMixin)

Vue.use(VueAxios, axios, vmodal);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
