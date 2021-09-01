import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
import router from "@/router";
import 'aplayer/dist/APlayer.min.css';
import dayjs from "dayjs"

Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.prototype.$axios = axios
//this.$axios.baseUrl="http://localhost"
//axios.defaults.baseURL="http://localhost";

new Vue({
  vuetify,
  router,
  render: h => h(App),
  components: {
  }
}).$mount('#app')

