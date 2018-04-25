<template>
  <el-col class="lang-set">
    <el-dropdown :show-timeout=50 @command="changeLang" trigger="click">
      <span class="el-dropdown-link">
        <svg-icon icon-class="language"></svg-icon>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zhCN" :disabled="language==='zhCN'">简体中文</el-dropdown-item>
        <el-dropdown-item command="zhTW" :disabled="language==='zhTW'">繁體中文</el-dropdown-item>
        <!--<el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>-->

      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</template>
<script>
  export default {
    computed: {
      language() {
        return this.$store.getters.language
      }
    },
    methods:{
      changeLang(lang){
        this.$i18n.locale=lang;
        this.$store.dispatch('setLanguage', lang)
      }
    },
  }
</script>
<style lang="scss" scoped>
  .lang-set .svg-icon{
    font-size:25px;
    color:#777;
  }
</style>

