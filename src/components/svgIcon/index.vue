<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" width="100%" height="100%"></use>
  </svg>
</template>

<script>
  export default {
    name: 'svg-icon',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      className: {
        type: String
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className
        } else {
          return 'svg-icon'
        }
      }
    }
  }
</script>

<style scoped>
  .svg-icon {
    display: inline-block;
    height:1em;
    width:1em;
    fill:currentColor;
    font-size:20px;
  }
</style>

<!--使用方法-->
<!--<svg-icon :icon-class="plus"></svg-icon>-->
