<template>
  <div class="app-wrapper"  :class="{foldSidebar:!sidebar.opened && roleGrade!==undefined}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <sticky >
        <navbar></navbar>
        <tags></tags>
      </sticky>
      <main-body></main-body>
    </div>
  </div>
</template>
<script>
  import Navbar from "@/views/layout/Navbar"
  import Sidebar from "@/views/layout/sidebar/Sidebar"
  import MainBody from "@/views/layout/MainBody"
  import Tags from "@/views/layout/Tags"
  import Sticky from '@/components/Sticky'

  export default {
    name:"layout",
    data(){
      return {}
    },
    components:{
      Navbar,
      MainBody,
      Sidebar,
      Tags,
      Sticky
    },
    computed:{
      sidebar() {
        return this.$store.state.app.sidebar
      },
      roleGrade() {
        return this.$store.state.user.roleGrade
      }
    },
  }
</script>


