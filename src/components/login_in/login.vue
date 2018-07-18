<template>
  <div class="login">
    <video-bg></video-bg>
    <sign-in></sign-in>
  </div>
</template>

<script>
  import VideoBg from "./modules/video-bg";
  import SignIn from "./modules/sign-in";
  export default {
    name: "login",
    components: {SignIn, VideoBg}
  }
</script>

<style scoped>
  .login{

  }
</style>
