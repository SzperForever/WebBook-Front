<template>
  <div>
    <top-bar></top-bar>

    <table class="ui celled striped table" style="margin-top: 9vh;">
      <tr>
        <th>订单号</th>
        <th>总价</th>
        <th>收货地址</th>
        <th>订单内容</th>
        <th>订单状态</th>
      </tr>
      <tr v-for="order in orderData">
        <th>{{order.id}}</th>
        <th>{{order.totalPrice}}</th>
        <th>{{order.address}}</th>
        <th>
          <ul>
            <li style="display:inline;list-style: none" v-for="book in order.books">
              {{book.name}}
            </li>
          </ul>
        </th>
        <th v-if="order.status==0">
            未发货
        </th>
        <th v-if="order.status==1">
          已发货
        </th>
        <th v-if="order.status==2">
          已签收
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
  import TopBar from "@/components/top_bar/top-bar";
  export default {
    name: "order",
    components: {TopBar},
    data() {
      return {
        orderData : null
      }
    },
    mounted(){

      this.$util.post('getAllOrder',{userId : this.$util.getUser().userId},(response)=>{
          this.orderData = response;
        console.log(this.orderData)
      })
    }
  }
</script>

<style scoped>

</style>
