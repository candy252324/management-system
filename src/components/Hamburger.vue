<template>
  <div>
    <!--<svg-icon icon-class="menu"  @click="toggleClick"></svg-icon>-->
    <svg class="menu" @click="toggleClick" :class="{'is-active':isActive}">
      <use xlink:href="#icon-menu" width="100%" height="100%"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.menu{
  display: inline-block;
  height:1em;
  width:1em;
  fill:currentColor;

	cursor: pointer;
  color:#555;
  font-size:32px;
	transform: rotate(90deg);
	transition: .38s;
	transform-origin: 50% 50%;
}
.menu.is-active {
	transform: rotate(0deg);
}
</style>
