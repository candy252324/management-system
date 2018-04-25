<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import icons from './assets/icons'

  export default {
    name: 'app',
    data(){
      return{
        menuData: null,
        userData: null
      }
    },
    created: function() {
      document.body.insertAdjacentHTML('afterbegin', icons)
    },
  }
</script>


