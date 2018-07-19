<template>
  <div class="bottom-bar">


    <div id="confirm-modal" class="ui modal">
      <div class="content">
        <div>
          <span>订单总价</span>
          <span>{{price}}</span>
        </div>
        <div class="address">
          <div>请选择收货地址</div>
          <Select v-model="address" style="width:200px">
            <Option v-for="item in addressData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button @click="addAddress"><Icon type="ios-plus-empty"></Icon>添加地址</Button>
          <div id="addAddress-modal" class="ui modal">
            <div class="content">
              <Input v-model="Address" placeholder="填入地址" />
            </div>
            <div class="actions">
              <div class="ui button" @click="cancle">取消</div>
              <div class="ui button" @click="add">添加</div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui button" @click="closeModal">取消</div>
        <div class="ui button" @click="submitOrder">提交订单</div>
      </div>

    </div>

    <span class="price">
      <span>
      总价:
        </span>
      <span id="sumPrice">
{{price}}
      </span>
    </span>
    <button class="ui button" style="transform: translateX(93vw);" @click="buyNow">
      立即购买
    </button>
  </div>
</template>

<script>
  import BusFactory from 'vue-happy-bus'

  export default {
    name: "bottom-bar",
    props: ['price'],
    data() {
      return {
        address: [],
        addressData: [],
        modalDom: null,
        modalDomadd: null,
        bus : BusFactory(this),
        Address: null
      }
    },
    methods: {
      buyNow() {
        this.showModal();
      },
      showModal() {
        this.modalDom.modal('show');
      },
      closeModal() {
        this.modalDom.modal('hide')
      },
      submitOrder() {
        let data = {
          addressId: this.address,
          price: this.price
        };
        this.bus.$emit('submitOrder',data)
      },
      addAddress(){
        this.modalDomadd.modal("show")
      },
      add(){
        let Data = {
          userId: parseInt(this.$util.getUser().userId),
          content: this.Address
        }
        this.$util.post('addAddress', Data, (data) => {
          this.$Message.success(data.msg)
          this.modalDomadd.modal("hide")
        })
      },
      cancle(){
        this.modalDomadd.modal("hide")
      }
    },
    mounted() {

      this.modalDom = $('#confirm-modal').modal();
      this.modalDomadd = $('#addAddress-modal').modal();
      this.bus.$on('closeModal',()=>{
        this.closeModal()
      });

      let data = {
        userId: parseInt(this.$util.getUser().userId)
      };

      this.$util.post(
        '/getAllAddress',
        data,
        (data) => {
          $.each(data, (index, content) => {
            this.addressData.push({
              value: content.id,
              label: content.content
            })
          })
        }
      )
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #0e8c8c;
  }

  .price {
    transform: translateX(85vw);
    position: fixed;
  }
</style>
