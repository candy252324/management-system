<template>
  <div class="tags-view">
    <el-button size="mini" v-for="item in 5" type="primary" :key="item">{{item}}</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .tags-view{
    padding:3px;
    border:1px solid #ddd;
  }
</style>
