<template>
  <div>
    <table>
      <tr>
        <th>订单号</th>
        <th>订单总额</th>
        <th>订单状态</th>
      </tr>
      <tr v-for="order in orders">
        <th>{{order.id}}</th>
        <th>{{order.totalPrice}}</th>
        <th><img src="/src/assets/books/6.jpg"></img></th>
        <th v-if="order.status==0">未发货</th>
        <th v-if="order.status == 1">已发货</th>
        <th v-if="order.status == 2">已签收</th>
        <th v-if="order.status == 3">退货</th>
        <th><Button type="success" @click="sendGoods(order)">发货</Button></th>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "order-manage",
    data() {
      return {
        orders: null
      }
    },
    methods:{
      sendGoods(order){
          this.$util.post('changeOrderStatus',{
            OrderId : order.id,
            virginState : order.status,
            status : 1
          },(response)=>{
            console.log(response)
          })
      }
    },
    mounted() {
      this.$util.post("getAllOrders", null, (response) => {
          this.orders = response
      })
    }
  }
</script>

<style scoped>

</style>
