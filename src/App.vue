<template lang="pug">
  #app
    mu-paper(:zDepth="6")
      mu-appbar.topbar(title="app")
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
</style>
