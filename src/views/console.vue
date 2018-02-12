<template lang="pug">
  #console
    div.message(v-for="(message, index) in messages", :key="index", :class="message.answer ? 'answer' : 'question'")
      mu-chip {{ message.question || message.answer }}
</template>

<script>
  import { database } from '@/services/firebase'
  import { speech } from '@/services/voice'
  // import { switchLight } from '@/services/xiaomi' // eslint-disable-line
  import store from '@/vuex'

  export default {
    name: 'devices',
    async created () {
      await this.$bindAsArray('devices', database.ref('devices'))
      await this.$bindAsArray('commands', database.ref('commands'))
    },
    watch: {
      'messages.length' (index) {
        let question = this.messages[index - 1].question
        let answer = this.messages[index - 1].answer
        let regexp = '^0-9a-zA-Z_\s' // eslint-disable-line
        if (question) {
          let coincidences = this.commands.filter(command => {
            let keys = command.keys.toLowerCase().replace(regexp, '').split(', ')
            let query = question.toLowerCase().replace(regexp, '').split(' ')
            let matches = keys.filter(key => query.indexOf(key) !== -1)
            return matches.length ? Object.assign(command, { matches: matches.length }) : false
          })
          if (coincidences.length) {
            let matches = coincidences.sort((a, b) => {
              return b.matches >= a.matches
            })
            let coincidence = matches[0]
            if (coincidence.response) store.commit('send', { answer: coincidence.response })
            if (coincidence.device && coincidence.command) this.handle(coincidence.device, coincidence.command)
          } else {
            store.commit('sorry')
          }
        } else {
          if (answer) {
            this.answer(answer)
          }
        }
      }
    },
    methods: {
      answer (text) {
        speech(text)
      },
      async handle (device, command) {
        if (device && command) {
          await database.ref('devices').child(device).once('value', async snapshot => {
            let xiaomi = snapshot.val()
            console.log(xiaomi)
            switch (command) {
              case 'LIGHT_ON':
                // await switchLight(xiaomi.address, xiaomi.token)
                break
              case 'LIGHT_OFF':
                // await switchLight(xiaomi.address, xiaomi.token)
                break
            }
          })
        }
      }
    },
    computed: {
      messages () {
        return store.state.messages
      },
      language () {
        return store.state.language
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #console
    overflow-y auto
    padding 20px
    .message
      width 100%
      display block
      margin 10px 0
      &.question
        .mu-chip
          background-color lightblue
      &.answer
        text-align right
        .mu-chip
          background-color lightgreen
</style>
