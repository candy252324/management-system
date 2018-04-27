import Mock from 'mockjs'
import { param2Obj,getIndexById } from "@/utils"

var list=[];
var count=80;
for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    _id:"@guid",
    account:"@cname",
    password:"eZmnlZbNOGu+je9Ok9KLOA==",
    name:"@cname",
    gender:"@boolean",
    'role|1':["111","222","333","444"],
    mobile:'@integer(10000000000, 19999999999)',
    email:"@email",
    avatar:"",
    birthday:"@date",
    enable:"@boolean",

    'createUserId|1':["111","222","333","444"],
    createTime:"@datetime",
    'modifyUserId|1':["111","222","333","444"],
    modifyTime:"@datetime",
    extra:"@csentence(5, 10)",
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
    return {code:0,result:obj};
  },
  submitForm:config=>{
    var item=JSON.parse(config.body)
    Info=item;
    if(!item._id){
      item._id=Mock.mock("@guid");
      item.F_CreateTime=Mock.mock('@now')
      list.push(item)
    }else{
      var index=getIndexById(list,item._id,"_id");
      if(index!==undefined){
        list.splice(index,1,item)
      }
    }
    return { code:0 }
  },
  delItem:config=>{
    var {_id}=JSON.parse(config.body);
    var index=getIndexById(list,_id,"_id");
    if(index!==undefined){
      list.splice(index,1)
    }
    return { code:1 }
  },
  changePsw:config=>{
    var {Password,NewPassword}=JSON.parse(config.body);
    return { code:0 }
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
    const { account,password } = JSON.parse(config.body);
    var obj={
      code:0,
      result:{
        token: "11fetg1fa4sf55",
      }
    }
    return obj;
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    var obj={
      code:0,
      result:{
        roleGrade: 1 ,        // 权限等级, Number
        account: Mock.mock("@first") ,         // 账号
        name: Mock.mock("@cname"),            // 姓名
        gender : Mock.mock("@boolean"),          // 性别
        role: "111" ,            // 角色id
        avatar: "" ,          // 头像
        mobile: Mock.mock("@integer(13000000000,19999999999)"),
        email: Mock.mock("@email") ,
        birthday: Mock.mock("@date"),
      }
    }
    return obj;
  },
  logout: config => {
    const { token } = JSON.parse(config.body);
    return;
  },
}
