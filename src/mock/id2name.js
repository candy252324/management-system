import * as util from '@/utils'

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
var part={
  "111":{name:"PLC"},
  "222":{name:"计策仪"},
  "333":{name:"CCD"}
}
var maintainWay={
  "111":{name:"周保养"},
  "222":{name:"月保养"},
  "333":{name:"季保养"},
  "444":{name:"年保养"}
}
var machine={
  "111":{name:"TP-01"},
  "222":{name:"TP-02"},
  "333":{name:"TP-03"},
  "444":{name:"TP-04"},
  "555":{name:"TP-05"},
  "666":{name:"TP-06"},
  "777":{name:"TP-07"},
  "888":{name:"TP-08"},
  "999":{name:"TP-09"},
  "1010":{name:"TP-10"},
}
var line={
  "111":{name:"lineA"},
  "222":{name:"lineB"},
  "333":{name:"lineC"},
  "444":{name:"lineD"}
}
var fault={
  "111":{name:"供料故障"},
  "222":{name:"检出故障"},
  "333":{name:"植入部故障"}
}
var structure={
  "111":{name:"供料部"},
  "222":{name:"检出部"},
  "333":{name:"植入部"}
}
var partType={
  "111":{name:"型号1/com1"},
  "222":{name:"型号2/com2"},
  "333":{name:"型号3/com3"},
  "444":{name:"型号4/com4"},
  "555":{name:"型号5/com5"},
  "666":{name:"型号6/com6"},
}

const list= {
  user,
  role,
  machine,  //设备
  line,
  part,     //配件
  partType,  //配件型号
  maintainWay,  //保养方式
  fault,    //故障
  structure,   //保养部位
}

export default {
  getList:config=>{
    return JSON.stringify(list);
  },
}
