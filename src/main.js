import 'babel-polyfill'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify);

new Vue({
  store,
  render: h => h(App)
}).$mount('.sp-metrics')