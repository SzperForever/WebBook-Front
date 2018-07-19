<template>
  <div>
    <top-bar></top-bar>

    <table class="ui celled table" style="margin-top: 10vh;">
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
          <ul >
            <li style="display:inline;list-style: none" v-for="book in order.books">
              {{book.name}}
            </li>
          </ul>
        </th>
        <th v-if="order.status==0">
            未发货
        </th>
        <th v-if="order.status==1">
          已发货<Button @click="changeState(order)" size="small" type="success">签收</Button>
        </th>
        <th v-if="order.status==2">
          已签收<Button v-if="order.status == 2" @click="returnGoods(order)" size="small" type="error">退货</Button>
        </th>
        <th v-if="order.status == -2">
          已退货
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
    methods:{
      changeState(order){
        this.$util.post('changeStatus',{
          orderId : order.id,
          status : order.status
        },(response)=>{
          console.log(response)
          this.$Message.success("签收成功")
        })
      },
      returnGoods(order){
        this.$util.post('changeStatus',{
          orderId : order.id,
          status : -1
        },(response)=>{
          console.log(response)
          this.$Message.success("退货成功")
        })
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
