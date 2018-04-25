<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sticky',
    props: {
      stickyTop: {
        type: Number,
        default: 0
      },
      zIndex: {
        type: Number,
        default: 1
      },
      className: {
        type: String
      }
    },
    data() {
      return {
        active: false,
        position: '',
        currentTop: '',
        width: undefined,
        height: undefined,
        child: null,
        stickyHeight: 0
      }
    },
    mounted() {
      this.height = this.$el.getBoundingClientRect().height
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.reSetWidth)
    },
    activated() {
      this.handleScroll()
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.reSetWidth)
    },
    methods: {
      sticky() {
        if (this.active) {
          return
        }
        this.position = 'fixed'
        this.active = true
        this.width = this.width + 'px'
      },
      reset() {
        if (!this.active) {
          return
        }
        this.position = ''
        this.width = 'auto'
        this.active = false
      },
      handleScroll() {
        this.width = this.$el.getBoundingClientRect().width
        const offsetTop = this.$el.getBoundingClientRect().top
        if (offsetTop <= this.stickyTop) {
          this.sticky()
          return
        }
        this.reset()
      },
      //窗口大小发生变化时，需要重新设置sticky的宽度，防止出现sticky宽度小于预期宽度的情况
      reSetWidth(){
        this.active = false;
        this.handleScroll();
      }
    }
  }
</script>
