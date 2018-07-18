<template>
  <div>

    <top-bar></top-bar>

    <CheckboxGroup v-if="loaded" v-model="book" @on-change="changeSelect">
      <Checkbox class="book-check-box" v-for="book in this.chart.bookList" :label="book.id">
        <div class="ui grid" style="margin-left: 0rem;">
          <div class="four wide column">
            <img src="/src/assets/books/6.jpg">
          </div>
          <div class="four wide column">
            <div class="row">
              名称
            </div>
            <div class="row">
              {{book.name}}
            </div>
          </div>
          <div class="four wide column">
            <div class="row">
              价格
            </div>
            <div class="row">
              {{book.price}}
            </div>
          </div>
          <div class="four wide column">
            <div class="row">
              数量
            </div>
            <div class="row">
              {{book.num}}
            </div>
          </div>
        </div>
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script>
  import TopBar from "@/components/top_bar/top-bar";
  import BusFactory from 'vue-happy-bus'

  export default {
    name: "goods-list",
    components: {TopBar},
    data() {
      return {
        book: [],
        chart: undefined,
        loaded: false,
        bus: BusFactory(this)
      }
    },
    methods: {
      changeSelect(book) {
        var sumPrice = 0;
        $.each(book, (index, value) => {
          $.each(this.chart.bookList, (index, value2) => {
            if (value == value2.id) {
              sumPrice += (value2.price * value2.num);
            }
          })
        });
        this.$parent.price = sumPrice
      },
      submitOrder(data) {
        let books = [];
        console.log(this.book);
        $.each(this.book, (index, bookId) => {

          $.each(this.chart.bookList, (index, value) => {
            if (bookId == value.id) {
              books.push({
                id: value.id,
                num: value.num
              })
            }
          });

        });

        let result = {
          userId: this.$util.getUser().userId,
          addressId: data.addressId,
          price: parseInt(data.price),
          books: books
        };


        this.$util.post('submitOrder', JSON.stringify(result), (data) => {
          this.bus.$emit('closeModal');
          if (data.state == "success") {
            this.$Message.success('成功购买');
          }
          else {
            this.$Message.error(data.reason);
          }

        },"application/json; charset=utf-8")

      }
    },
    mounted() {
      this.chart = this.$util.getChart();
      this.loaded = true;
      this.bus.$on('submitOrder', (data) => {
        this.submitOrder(data)
      })
    }
  }
</script>

<style>
  .book-check-box {
    display: block;
    width: 100%;
  }

  .book-check-box .ivu-checkbox {
    transform: translateY(7vh) !important;
  }


</style>
