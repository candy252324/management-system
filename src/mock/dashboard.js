import * as util from '@/utils'
const data={
  num:{
    repairNum:30,
    maintainNum:671,
    messageNum:124,
  },
}


export default {
  getList:config=>{
    // const { page, limit, prop ,order,searchWord } = util.param2Obj(config.url)
    return JSON.stringify(data);
  },
  // submitForm:config=>{
  //   var item=JSON.parse(config.body)
  //   if(!item.F_ID){
  //     item.F_ID=util.randomString();
  //     item.F_CreateTime=util.getCurTime();
  //     list.push(item)
  //   }else{
  //     var index=util.getIndexById(list,item.F_ID,"F_ID");
  //     if(index!==undefined){
  //       list.splice(index,1,item)
  //     }
  //   }
  //   return JSON.stringify({code:1,message:"操作成功！"});
  // },
  // delItem:config=>{
  //   var {F_ID}=JSON.parse(config.body);
  //   var index=util.getIndexById(list,F_ID,"F_ID");
  //   if(index!==undefined){
  //     list.splice(index,1)
  //   }
  //   return JSON.stringify({code:1,message:"操作成功！"});
  // },
  // getOptions:config=>{
  //   let list= [
  //     {value:"111",label:"普通员工" },
  //     {value:"222",label:"技术员" },
  //     {value:"333",label:"班长" }
  //   ]
  //   return JSON.stringify(list);
  // },
}
