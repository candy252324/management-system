

var user={
  "111":{name:"小牛"},
  "222":{name:"花花"},
  "333":{name:"美美"},
  "444":{name:"豆豆"},
  "555":{name:"天天"}
}
var role={
  "111":{name:"普通员工"},
  "222":{name:"技术员"},
  "333":{name:"班长"}
}


const list= {
  user,
  role,
}

export default {
  getList:config=>{
    return list;
  },
}
