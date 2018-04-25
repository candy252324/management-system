<template>
  <div class="navbar">
    <div>
      <hamburger :toggleClick="toggleSideBar" :isActive="sidebarStatus"></hamburger>
    </div>
    <div><el-button>right</el-button></div>
  </div>
</template>

<script>
  import hamburger from '@/components/hamburger'

  export default {
    components:{ hamburger },
    data() {
      return {

      }
    },
    computed:{
      sidebarStatus(){
        return this.$store.getters.sidebarStatus;
      },
    },
    methods:{
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
    }
  }
</script>

<style scoped>
  .navbar{
    background: #ccc;
    display: flex;
    padding:10px;
    justify-content: space-between;
  }
</style>
