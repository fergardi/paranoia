<template lang="pug">
  mu-paper#topbar(:zDepth="6")
    mu-appbar
      span ParanoIA
      form(@submit.stop.revent="ask")
        mu-text-field.microphone(icon="search", hintText="...", v-model="question", autofocus)
        mu-icon-button(icon="mic", @click="listen", :color="asking ? 'orange' : ''")
</template>

<script>
  import store from '@/vuex'

  export default {
    name: 'search-box',
    data () {
      return {
        question: '',
        online: navigator.onLine,
        asking: false
      }
    },
    methods: {
      listen () {
        this.question = ''
        this.asking = true
        let recognition = new webkitSpeechRecognition() // eslint-disable-line
        recognition.interimResults = true
        recognition.lang = this.language
        recognition.start()
        let speech = ''
        recognition.onresult = (event) => {
          for (var i = event.resultIndex; i < event.results.length; i++) {
            speech = event.results[i][0].transcript
          }
        }
        recognition.onend = () => {
          recognition.stop()
          this.asking = false
          this.question = speech
          this.ask()
        }
      },
      ask () {
        store.commit('send', { question: this.question })
        this.question = ''
      }
    },
    computed: {
      language () {
        return store.state.language
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
</style>
