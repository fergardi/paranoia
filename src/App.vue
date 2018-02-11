<template lang="pug">
  #app
    search-box
    router-view
</template>

<script>
  import SearchBox from '@/components/searchbox'
  import store from '@/vuex'

  export default {
    name: 'app',
    components: { SearchBox },
    mounted () {
      setTimeout(() => {
        store.commit('send', { answer: 'Hola, me llamo ParanoIA. ¿En qué puedo ayudarte?' })
      }, 1000)
    }
  }
</script>

<style lang="stylus">
  .microphone
    color #FFF
    margin-bottom 0
    &.focus-state
      color #FFF
    .mu-text-field-hint
      color fade(#FFF, 50%)
    .mu-text-field-input
      color #FFF
    .mu-text-field-focus-line
      background-color #FFF
</style>
