<template>
  <div>
    <table class="ui table">
      <tr>
        <th>用户ID</th>
        <th>用户名</th>
        <th>密码</th>
        <th>邮箱</th>
        <th>权限</th>
        <th>是否锁定</th>
      </tr>
      <tr v-for="user in users">
        <td>{{user.id}}</td>
        <td>{{user.username}}</td>
        <td>{{user.password}}</td>
        <td>{{user.email}}</td>
        <td>{{user.role}}</td>
        <td v-if="user.fails >= 3">锁定</td>
        <td v-if="user.fails < 3">正常</td>
        <td>
          <button @click="deleteUser(user.id)">删除</button>
        </td>
        <td v-if="user.fails >= 3">
          <button @click="unlockUser(user.id)">解锁用户</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "user-manage",
    data() {
      return {
        users: null
      }
    },
    methods: {
      deleteUser(userId) {
        this.$util.post("deleteUser", {userId: userId}, (response) => {
          if (response.state = "success") {
            this.$Message.success("删除成功")
          }
          else {
            this.$Message.error("删除失败")
          }
        })
      },
      unlockUser(userId) {
        this.$util.post("unlockUser", {userId: userId}, (response) => {
          if (response.state = "success") {
            this.$Message.success("解锁成功")
          }
          else {
            this.$Message.error("解锁失败")
          }
        })
      }
    },
    mounted() {
      this.$util.post("getAllUsers", null, (response) => {
        this.users = response
      })
    }
  }
</script>

<style scoped>

</style>
