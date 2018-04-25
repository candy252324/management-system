<template>
  <div class="main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    computed: {
      cachedViews() {
        return this.$store.getters.cachedViews
      }
    }
  }
</script>

