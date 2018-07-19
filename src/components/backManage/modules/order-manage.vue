<template>
  <div>
    <table class="ui table">
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
        <th v-if="order.status == -2">已受理退货申请</th>
        <th><Button v-if="order.status == 0" type="success" @click="sendGoods(order)">发货</Button></th>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "order-manage",
    data() {
      return {
        orders: null,
        Disabled: false
      }
    },
    methods:{
      sendGoods(order){
          this.$util.post('changeStatus',{
            orderId : order.id,
            status : order.status
          },(response)=>{
            console.log(response)
            this.$Message.success("发货成功")
          })
      },
      disabledButton(order){
        console.log("order" + order)
        if(order.status === 0){
          return false
        }
        else{
          return true
        }
      },
      returnGoods(order){
        this.$util.post('changeStatus',{
          orderId : order.id,
          status : -2
        },(response)=>{
          console.log(response)
          this.$Message.success("受理成功")
        })
      }
    },
    mounted() {
      this.$util.post("getAllOrders", null, (response) => {
          this.orders = response
          //console.log(this.orders)
      })
    }
  }
</script>

<style scoped>

</style>
