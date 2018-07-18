<template>
  <div>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/top_bar/top-bar";

  export default {
    name: 'app',
    components: {TopBar},
    data() {
      return {}
    }
  }
</script>

<style lang="scss">

</style>
