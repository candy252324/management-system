<template>
  <div class="layout" :class="{ 'hide-sidebar':!sidebarStatus}">
    <sidebar></sidebar>
    <div class="main-container">
      <sticky>
        <navbar></navbar>
        <tags-view></tags-view>
      </sticky>
      <main-body></main-body>
    </div>
  </div>
</template>

<script>
  import Sticky from '@/components/sticky'
  import Navbar from './Navbar'
  import Sidebar from './sidebar'
  import TagsView from './TagsView'
  import MainBody from './MainBody'

  export default {
    components:{ Sticky,Navbar, Sidebar, TagsView ,MainBody },
    data() {
      return {}
    },
    computed:{
      sidebarStatus(){
        return !!this.$store.getters.sidebarStatus;
      },
    },
  }
</script>

<style scoped>

</style>
