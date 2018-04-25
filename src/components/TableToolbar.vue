<template>
  <div class="c-tool" :class="{'show-action':startAction}">
    <div class="face plain">
      <slot name="plain"></slot>
    </div>
    <div class="face action" @click="hideAction">
      <i class="el-icon-close"></i>
      <slot name="action"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props:["startAction"],
    methods:{
      hideAction(e){
        let className=e.target.className;
        if(className=="action-ct"||className=="el-icon-close"){
          this.$emit("update:startAction",false)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $toolbarH:60px;
  .c-tool{
    position: relative;
    width:100%;
    height: $toolbarH;
    overflow: hidden;
    font-size: $g-font-size-base;
    .face{
      position: absolute;
      top:0;
      width:100%;
      height: $toolbarH;
      line-height: $toolbarH;
      transition: left .2s;
    }
    .plain{
      left:0;
    }
    .action{
      left:-100%;
      i{
        position: absolute;
        right:10px;
        top:8px;
      }
    }
  }
  .show-action{
    .plain{
      left: 100%;
    }
    .action{
      left:0;
    }
  }
</style>
