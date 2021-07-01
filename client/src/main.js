import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import router from './router'
import './index.css'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timestamp: "",
    status: "",
    email: ""
  },
  mutations: {
    setTimeStamp (state, payload) {
      let date = new Date(JSON.parse(payload.updatedAt))
      let hours = date.getHours()
      let minute = date.getMinutes()
      state.timestamp = {...payload, updatedAt: `${hours} : ${minute}`}
    },
    setStatus (state, payload) {
      state.status = payload
    },
    setEmail (state, payload) {
      state.email = payload
    }
  }
})

Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
