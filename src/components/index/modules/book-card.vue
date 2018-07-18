<template>
  <div class="ui card">
    <div class="image">
      <img :src="img">
    </div>
    <div class="content">
      <a class="header" style="text-align: center">{{bookName}}</a>
    </div>
    <div class="extra content">
      <div>
        <button class="ui button" style="transform: translateX(70%)" @click="showInfo">加入购物车</button>
      </div>
      <div class="right floated author">
        库存：{{stock}}
      </div>
    </div>


  </div>
</template>

<script>

  export default {
    name: "book-card",
    props: ['id', 'bookName', 'stock', 'price','imgPath'],
    data() {
      return {
        img: 'src/assets/books/6.jpg'
      }
    },
    methods : {
        showInfo(){
          let book = {
            id : this.id,
            name : this.bookName,
            stock : this.stock,
            price : this.price,
            imgPath:this.imgPath
          };
          console.log(this.$parent.bookData);
          this.$parent.bookInfo = book;
          this.$emit('showInfo')
        }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
