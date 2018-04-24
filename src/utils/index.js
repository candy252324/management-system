

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
// export function getQueryObject(url) {
//   url = url == null ? window.location.href : url
//   const search = url.substring(url.lastIndexOf('?') + 1)
//   const obj = {}
//   const reg = /([^?&=]+)=([^?&=]*)/g
//   search.replace(reg, (rs, $1, $2) => {
//     const name = decodeURIComponent($1)
//     let val = decodeURIComponent($2)
//     val = String(val)
//     obj[name] = val
//     return rs
//   })
//   return obj
// }

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// export function deepcopy(source) {
//   if (!source) {
//     return source;
//   }
//   let sourceCopy = source instanceof Array ? [] : {};
//   for (let item in source) {
//     sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
//   }
//   return sourceCopy;
// };



//生成随机字符串"a2aed19f-e962-4a7f-ba7a-8cc74bb6900e"
export function randomString(){
  var len = 36;
  var str = 'abcdefghijkmnopqrstuwxyz23456789';
  var maxPos = str.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    if (i == 8 || i == 13 || i == 18 || i == 23) {
      pwd += "-";
    } else {
      pwd += str.charAt(Math.floor(Math.random() * maxPos));
    }

  }
  return pwd;
}

export function getCurTime (ignore_minute,source) {
  var myDate;
  var separate = '-';
  var minute = '';
  if (source === void(0)) {
    source = new Date();
  }
  if (source) {
    if (source.split) {
      source = source.replace(/\-/g, '/');
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/\-/g, '/');
    } else {
      source = new Date(source);
    }
    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source);
      if (!ignore_minute) {
        minute = (myDate.getHours() < 10 ? " 0" : " ")
          + myDate.getHours() + ":"
          + (myDate.getMinutes() < 10 ? "0" : "")
          + myDate.getMinutes()+ ":"
          + (myDate.getSeconds() < 10 ? "0" : "")
          + myDate.getSeconds();
      }
      return myDate.getFullYear() + separate +
        (myDate.getMonth() < 10 ? '0' : '') +
        (myDate.getMonth() + 1) + separate +
        (myDate.getDate() < 10 ? '0' : '') +
        myDate.getDate() + minute;
    } else {
      return source.slice(0, 16);
    }
  } else {
    return source
  }
}

//菜单去重
export function noRepeatMenu(arr) {
  var newArr=[]
  for(var i=0;i<arr.length;i++){
    var obj={}
    for(var key in arr[i]){
      if(key!="children"){
        obj[key]=arr[i][key]
      }
    }
    newArr.push(obj)
  }
  return newArr;
}

//将具有层级关系的数据转化为树形结构
export function item2Tree(array, ckey) {
  let menuData = [];
  let indexKeys = Array.isArray(array) ? array.map((e) => {return e.id}) : [];
  ckey = ckey || 'parent_id';
  array.forEach(function (e, i) {
    //一级菜单
    if (!e[ckey] || (e[ckey]===e.id)) {
      delete e[ckey];
      menuData.push(deepClone(e));
    }else if(Array.isArray(indexKeys)){
      //检测ckey有效性
      let parentIndex = indexKeys.findIndex(function(id){
        return id == e[ckey];
      });
      if(parentIndex===-1){
        menuData.push(e);
      }
    }
  });
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node);
            } else {
              parentNode.children = [node];
            }
          }
        });
        if (parentNode.children) {
          findChildren(parentNode.children);
        }
      });
    }
  };
  findChildren(menuData);
  return menuData;
}


//获取json长度
export function getJsonLen(obj){
  if(typeof(obj)!=="object")return 0;
  var n=0;
  for(var key in obj){
    n++;
  }
  return n
}
//数组去重
export function noRepeatArr (arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

//获取一个月的天数
export function getDayNum (time) {
  //console.log(time)  // 2018-06
  const year=time.split("-")[0];
  const month=time.split("-")[1];
  if(month.length!==2){
    console.log("日期格式不正确")
    return;
  }
  const day30=["04","06","09","11"];
  const day31=["01","03","05","07","08","10","12"];

  let dayNum=0;
  if(day30.indexOf(month)>-1){
    dayNum=30;
  }else if(day31.indexOf(month)>-1){
    dayNum=31;
  }else{
    dayNum=year%4 ? 28:29;
  }
  return dayNum;
}



// mock数据相关

//[{id:"d54fa34te",},]  //获取某id的对应索引
export function getIndexById(list,id,ckey){
  var index;
  var ckey = ckey || 'id  ';
  for(var i=0;i<list.length;i++){
    if(list[i][ckey]===id){
      index=i;
      break;
    }
  }
  return index;
}

//从数据中筛选出某条数据
export function getItemById(list,id,ckey){
  var ckey = ckey || 'id  ';
  var detail={};
  for(var i=0;i<list.length;i++){
    if(list[i][ckey]===id){
      detail=list[i];
      break;
    }
  }
  return detail;
}

// 当前时间转变成字符串以便表格命名
export function getNowToString() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  };
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  };
  if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
  };
  if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
  };
  if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
  };
  var currentdate = year  + month  + strDate  + hours  +  minutes  + seconds;
  return currentdate;
}

//排序函数
export function compare(x, y) {
  if (x < y) {
      return -1;
  } else if (x > y) {
      return 1;
  } else {
      return 0;
  }
}

