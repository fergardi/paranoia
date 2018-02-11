import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  strict: true,
  state: {
    language: 'es-ES',
    messages: []
  },
  mutations: {
    send (state, message) {
      state.messages.push(message)
    },
    sorry (state) {
      state.messages.push({ answer: 'Lo siento, no te he entendido. ¿Puedes repetirlo?' })
    }
  }
})

export default vuex
