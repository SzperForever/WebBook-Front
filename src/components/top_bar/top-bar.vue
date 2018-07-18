<template>
  <div class="background-nav">
    <div class="topBar">
      <Nav></Nav>
    </div>
  </div>
</template>

<script>
  import Nav from "@/components/top_bar/modules/nav";

  export default {
    name: "top-bar",
    components: {Nav}
  }
</script>

<style scoped>
  .topBar {
    position: fixed;
    top: 0;
    padding: 20px;
    height: 8vh;
    width: 101% !important;
    z-index: 7;
    transition: all 500ms;
  }

  .background-nav {
    position: fixed;
    top: 0;
    z-index: 10;
    background: url("/src/assets/index/login-backgroud.jpg") top center;
    background-size: cover;
    width: 100%;
    height: 8vh;
    margin-bottom: 8vh;
  }
</style>
