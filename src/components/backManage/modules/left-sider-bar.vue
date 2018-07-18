<template>
  <div class="ui  menu">
    <Menu mode="horizontal" theme="light" active-name="1" @on-select="select">
      <MenuItem name="1">
        <Icon type="ios-paper"></Icon>
        图书管理
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-paper"></Icon>
        订单管理
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-paper"></Icon>
        用户管理
      </MenuItem>
    </Menu>

  </div>
</template>

<script>
  export default {
    name: "left-sider-bar",
    methods: {
      select(name) {
        if (name == "1") {
  this.$parent.page="book"
        }
        else if (name == "2") {
          this.$parent.page="order"
        } else if (name == "3") {
          this.$parent.page="user"
        }
      }
    }
  }
</script>

<style scoped>

</style>
