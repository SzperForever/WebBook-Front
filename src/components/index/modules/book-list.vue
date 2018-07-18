<template>
  <div>
    <div id="modal" class="ui modal">
      <i class="close icon"></i>
      <div id="bookName" class="header">
        {{this.bookInfo.name}}
      </div>
      <div class="image content">
        <div id="bookPic" class="image">
          <img src="/src/assets/books/6.jpg">
          <!--{{this.bookInfo.imgPath}}-->
        </div>
        <div class="description">
          <div id="price">
            价格：{{this.bookInfo.price}}
          </div>
          <div id="stock">
            库存：{{this.bookInfo.stock}}
          </div>
          <div>
             数量：
            <InputNumber :max="this.bookInfo.stock" :min="1" :step="1" v-model="buyNum"></InputNumber>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui button" @click="addToChart()">加入购物车</div>
      </div>
    </div>
    <div class="ui five cards">
      <book-card v-if="loaded"
                 v-for="book of bookData"
                 :price="book.price"
                 :bookName="book.name"
                 :stock="book.stock"
                 :imgPath="book.imgPath"
                 :id="book.id"
                 v-on:showInfo="showInfo">
        {{book}}
      </book-card>
    </div>
    <Page :total="bookNum" show-sizer class="page-selector" @on-change="changePage"
          @on-page-size-change="changePageSize"></Page>
  </div>
</template>

<script>
  import BookCard from "@/components/index/modules/book-card";

  export default {
    name: "book-list",
    components: {BookCard},
    data() {
      return {
        bookNum: 0,
        bookData: undefined,
        loaded: false,
        currentPage: 1,
        currentPageSize: 10,
        bookInfo: {},
        buyNum: 1,
        modalDom: null
      }
    },
    methods: {
      loadBookNum() {
        this.$util.post('getBooks',null,(data)=>{
          this.bookNum = data.length;
        });
      },
      changePage(page) {
        this.currentPage = page;
        this.loadBookData();
      },
      changePageSize(pageSize) {
        this.currentPageSize = pageSize;
        this.loadBookData();
      },
      loadBookData() {
        var pageInfo = {
          page: this.currentPage,
          size: this.currentPageSize
        };

        this.$util.post('pageInfo',pageInfo,(data)=>{
          this.bookData = data;
          this.loaded = true
        });

      },
      showInfo() {
        this.modalDom.modal('show');
      },
      addToChart(){
          var result = this.$util.addToChart(this.bookInfo,this.buyNum);
          this.modalDom.modal('hide');
          if(result.state == 'success'){
          this.$Message.success("已成功添加到购物车");
          }else{
            this.$Message.error(result.reason);
          }
      }
    },
    mounted() {
      this.loadBookNum();
      this.loadBookData();
      this.modalDom = $('#modal').modal()
    }
  }
</script>

<style scoped>
  .page-selector {
    margin-top: 20px;
  }
</style>
