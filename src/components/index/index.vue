<template>
  <div>
        <top-bar></top-bar>
    <book-list></book-list>
  </div>
</template>

<script>
  import TopBar from "@/components/top_bar/top-bar";
  import BookList from "@/components/index/modules/book-list";

  export default {
    name: "index",
    components: {BookList, TopBar}
  }
</script>

<style scoped>

</style>
