import Vue from 'vue'

Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

Vue.directive('loadmore', {
  bind(el, binding) {
    var p=0,t=0,down=true;
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      //判断是否向下滚动
      p=this.scrollTop;
      if(t<p){down=true}else{down=false}
      t=p;
      //判断是否到底
      let sign = 10;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign && down) {
        binding.value()
      }
    })
  }
})

