<template lang="pug">
  ul
    li(v-for="device in devices") {{ device.name }}
</template>

<script>
  import { database } from '@/services/firebase'
  
  export default {
    name: 'devices',
    async created () {
      await this.$bindAsArray('devices', database.ref('devices'))
    }
  }
</script>

<style lang="stylus" scoped>
</style>
