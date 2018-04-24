<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import icons from './assets/icons'
  export default {
    name: 'App',
    created: function() {
      document.body.insertAdjacentHTML('afterbegin', icons)
    },
  }
</script>

