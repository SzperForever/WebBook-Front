<template>
  <div class="ui text menu depart-menu">
    <router-link to="/index" class="item">
      首页
    </router-link>
    <router-link to="/chart" class="item">
      购物车
    </router-link>
    <router-link to="/order" class="item">
      订单
    </router-link>
    <a class="item" v-on:click.prevent="logOut">登出</a>
    <router-link to="/manage" class="item">
      后台管理
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "nav",
    methods: {
      logOut() {
        this.$util.set("user", null)
        location.reload();
      }
    }
  }
</script>

<style scoped>
  .menu {
    margin: 0 !important;
  }

  .item {
    color: white !important;
    font-size: large;
    font-weight: bolder !important;
    margin-left: 15px !important;
  }

  .item:after {
    content: " ";
    border-bottom: 2px solid white;
    position: absolute;
    top: 27px;
    left: 50%;
    width: 0;
    transition: all .3s;
  }

  .item:hover:after {
    left: 0%;
    width: 100%;
  }
</style>
