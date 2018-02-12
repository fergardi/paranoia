<template lang="pug">
  mu-paper#topbar(:zDepth="6")
    mu-appbar
      span ParanoIA
      form(@submit.stop.revent="asking")
        mu-text-field.microphone(icon="search", hintText="...", v-model="question", autofocus)
        mu-icon-button(icon="mic", @click="listening", :class="micro ? 'listening' : ''")
</template>

<script>
  import store from '@/vuex'
  import { listen } from '@/services/voice'

  export default {
    name: 'search-box',
    data () {
      return {
        question: '',
        online: navigator.onLine,
        micro: false
      }
    },
    methods: {
      async listening () {
        this.micro = true
        try {
          this.question = await listen()
          this.asking()
        } catch (error) {
          store.commit('sorry')
        }
        this.micro = false
      },
      asking () {
        store.commit('send', { question: this.question })
        this.question = ''
      }
    }
  }
</script>

<style lang="stylus">
  #topbar
    .mu-appbar-title
    & form
      display flex
      justify-content center
      align-items center
      width 100%
      .microphone
        width 100%
    .listening
      color green
</style>
