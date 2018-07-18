<template>
  <div class="chart">
    <goods-list></goods-list>

    <bottom-bar :price="price"></bottom-bar>
  </div>
</template>

<script>
  import GoodsList from "@/components/chart/modules/goods-list";
  import BottomBar from "@/components/chart/modules/bottom-bar";

  export default {
    name: "chart",
    components: {BottomBar, GoodsList},
    data(){
      return {
        price : 0
      }
    }
  }
</script>

<style scoped>
  .chart {
    margin-top: 9vh;
  }
</style>
