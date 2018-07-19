<template>
  <div>
    <div id="book-modal" class="ui modal">
      <div class="content">
        <span>书名：</span><Input v-model="bookName"></Input>
        <span>价格：</span><Input v-model="bookPrice"></Input>
        <span>库存：</span><Input v-model="bookStock"></Input>
      </div>
      <div class="actions">
        <button class="ui button green" @click="submitChange()">提交</button>
        <button class="ui button red" @click="close()">取消</button>
      </div>
    </div>

    <table class="ui table">
      <tr>
        <th>订单号</th>
        <th>书名</th>
        <th>图片</th>
        <th>定价</th>
        <th>库存</th>
      </tr>
      <tr v-for="book in books">
        <td>{{book.id}}</td>
        <td>{{book.name}}</td>
        <td>{{book.imgPath}}</td>
        <td>{{book.price}}</td>
        <td>{{book.stock}}</td>
        <td>
          <Button type="success" @click="edit(book)">编辑</Button>
        </td>
        <td>
          <Button type="error" @click="deleteBook(book.id)">删除</Button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "book-manage",
    data() {
      return {
        books: undefined,
        book: null,
        bookName: null,
        bookPrice: null,
        bookStock: null,
        modalDom: null
      }
    },
    methods: {
      show() {
        this.modalDom.modal('show');
      },
      close() {
        this.modalDom.modal('hide');
      },
      edit(book) {
        this.book = book;
        this.bookName = book.name;
        this.bookPrice = book.price;
        this.bookStock = book.stock;
        this.show();
      },
      submitChange() {
        this.$util.post("updateBook", {
          id: this.book.id,
          name: this.bookName,
          price: this.bookPrice,
          stock: this.bookStock
        }, (response) => {
          if(response.code === 1) {
            this.$Message.success(response.msg)
            this.close()
          }
          else{
            this.$Message.success(response.msg)
            this.close()
          }
        })
      },
      deleteBook(bookId) {
        this.$util.post('deleteBookById', {id: bookId}, (response) => {
          if (response) {
            this.$Message.success("成功删除");
          }
          else {
            this.$Message.error("删除失败");
          }
        })
      }
    },
    mounted() {
      this.$util.post("getBooks", null, (response) => {
        this.books = response
      });

      this.modalDom = $('#book-modal').modal();

    }
  }
</script>

<style scoped>

</style>
