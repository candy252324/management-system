import Mock from 'mockjs'
import { param2Obj,getIndexById } from "@/utils"

var list=[];
var count=80;
for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    F_ID:"@guid",
    Account:"@cname",
    Password:"eZmnlZbNOGu+je9Ok9KLOA==",
    RealName:"@cname",
    NickName:"@last",
    WorkId:"A-"+"@increment",
    Gender:Math.random()>0.5?1:0,
    DepartmentId:"@guid",
    DutyId:"@guid",
    'RoleId|1':["111","222","333","444"],
    Mobile:'@integer(10000000000, 19999999999)',

    F_CreateTime:"@datetime",
    'F_EnableMark|1':[true,false],
    F_Description:"@csentence(5, 10)",

    Email:"@email",
    Avatar:"",
    Birthday:"@date",
    'F_CreateUserId|1':["111","222","333","444"],
    F_ModifyTime:"@datetime",
    'F_ModifyUserId|1':["111","222","333","444"],
    F_DeleteTime:"@datetime",
    'F_DeleteUserId|1':["111","222","333","444"],
    'F_DeleteMark|':[true,false],
  }))
}

var Info=list[0];

export default {
  getList:config=>{
    const { page, limit, prop ,order,searchWord } = param2Obj(config.url)
    let mockList=list;
    if (order === 'descending') {
      mockList = list.reverse()
    }
    if(searchWord){
      mockList=mockList.filter((item)=>{
        return item.Account.indexOf(searchWord)>-1
              ||item.RealName.indexOf(searchWord)>-1;
      })
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    var obj={list:pageList,total:mockList.length}
    return JSON.stringify(obj);
  },
  submitForm:config=>{
    var item=JSON.parse(config.body)
    Info=item;
    if(!item.F_ID){
      item.F_ID=Mock.mock("@guid");
      item.F_CreateTime=Mock.mock('@now')
      list.push(item)
    }else{
      var index=getIndexById(list,item.F_ID,"F_ID");
      if(index!==undefined){
        list.splice(index,1,item)
      }
    }
    return JSON.stringify({code:1,message:"操作成功！"});
  },
  delItem:config=>{
    var {F_ID}=JSON.parse(config.body);
    var index=getIndexById(list,F_ID,"F_ID");
    if(index!==undefined){
      list.splice(index,1)
    }
    return JSON.stringify({code:1,message:"操作成功！"});
  },
  getDetail:config=>{
    const { F_ID,num } = param2Obj(config.url)
    return list[0];
  },
  changePsw:config=>{
    var {Password,NewPassword}=JSON.parse(config.body);
    return JSON.stringify({code:1,message:"操作成功！"});
  },
  getTreeOptions:config=>{
    var child1=[
      {
        value:"111",
        label:"小牛",
      },
      {
        value:"222",
        label:"花花",
      },
      {
        value:"333",
        label:"美美",
      },
    ]
    var child2=[
      {
        value:"444",
        label:"豆豆",
      },
      {
        value:"555",
        label:"天天",
      },
    ]

    let list=[
      {
        value:"222",
        label:"技术员",
        children:JSON.stringify(child1)
      },
      {
        value:"333",
        label:"班长",
        children:JSON.stringify(child2)
      },
    ]
    return JSON.stringify(list);
  },







  //登陆相关
  login: config => {
    const { Account,Password } = JSON.parse(config.body);
    var obj={
      code:1,
      token:"@guid",
    }
    return JSON.stringify(obj);
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)

    var detail={
      RoleGrade: 0 ,
      Info:JSON.stringify(Info)
    };
    //detail.resources=JSON.stringify(detail.resources);
    return JSON.stringify(detail);
  },
  logout: config => {
    const { token } = JSON.parse(config.body);
    return;
  },
}
