<template>
  <transition name="dialog-fade">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div :style="style" class="img-ct" v-if="rendered">
        <img :src=src alt="图片下载失败">
      </div>
      <i class="el-icon-close" @click="handleClose"  v-if="showClose"></i>
    </div>
  </transition>
</template>

<script>
  import Popup from 'element-ui/src/utils/popup';
  export default {
    name: 'ElDialog',
    mixins: [Popup],
    props: {
      src: {
        type: String,
      },
      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      width: String,
      beforeClose: Function,
    },
    watch: {
      visible(val) {
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },
    computed: {
      style() {
        let style = {};
        if (this.width) {
          style.width = this.width;
        }
        return style;
      }
    },
    methods: {
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },
    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>

<style scoped lang="scss">
  .el-dialog__wrapper {
    >.img-ct{
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
      img{
        width:100%;
      }
    }
    .el-icon-close{
      position: absolute;
      right:15px;
      top:15px;
      color:#fff;
      cursor:pointer;
      font-size:25px;
    }
  }
</style>

<!--
调用方式
<img-dialog
  :src="src"
  :visible.sync="imgVisible"
  :show-close="true"
  :modal="true"
  :close-on-click-modal="true"
  width="30%"
></img-dialog>
-->
