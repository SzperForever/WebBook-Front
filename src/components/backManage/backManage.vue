<template>
  <div>
    <top-bar></top-bar>
    <left-sider-bar style="margin-top: 9vh"></left-sider-bar>
    <div id="main-area">
      <book-manage v-if="page=='book'"></book-manage>
      <user-manage v-if="page=='user'"></user-manage>
      <order-manage v-if="page=='order'"></order-manage>
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/top_bar/top-bar";
  import LeftSiderBar from "@/components/backManage/modules/left-sider-bar";
  import BookManage from "@/components/backManage/modules/book-manage";
  import UserManage from "@/components/backManage/modules/user-manage";
  import OrderManage from "@/components/backManage/modules/order-manage";

  export default {
    name: "backManage",
    components: {OrderManage, UserManage, BookManage, LeftSiderBar, TopBar},
    data() {
      return {
        page: "book"
      }
    }
  }
</script>

<style scoped>

</style>
