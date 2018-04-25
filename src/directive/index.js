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

Vue.directive('readonly',{
  update(el,binding){
    let input = el.getElementsByTagName("input")||[];
    let area = el.getElementsByTagName("textarea")||[];
    let arr = [...input,...area];
    if(binding.value){
      Array.from(arr).forEach(val => {val.setAttribute('disabled','disabled');})
    }else{
      Array.from(arr).forEach(val => {val.removeAttribute('disabled','disabled')})
    }
  }
})
// 表格滚动条自动回顶部
Vue.directive('scroll',{
  update(el,binding){
    // console.log('我是指令的:'+binding.value)
    if(binding.value){
      el.querySelector('.el-table__body-wrapper').scrollTop = 0
    }
  }
})
