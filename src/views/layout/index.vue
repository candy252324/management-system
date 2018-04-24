<template>
  <div>
    <div class="left"></div>
    <div class="top"></div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .left{
    width:250px;
    height: 100vh;
    background: rgba(0,0,0,.2);
    position: absolute;
    left:0;
    top:0;
  }
  .top{
    position: absolute;
    top:0;
    right:0;
    left:250px;
    height: 50px;
    background: rgba(0,0,0,.2);
  }
</style>
