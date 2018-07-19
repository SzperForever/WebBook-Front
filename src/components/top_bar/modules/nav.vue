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
    <router-link to="/manage" class="item" id="manage_item">
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
      },
      displayManage(){
        let Data = {name:this.$util.getUser().username}
        let User = this.$util.post('getUserByName', Data, (data) => {
          if(data.role === 0){
            $('#manage_item').css('display', 'none');
          }
          else
            $('#manage_item').css('display', 'block');
        })
      }
    },
    created:function () {
        this.displayManage()
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
