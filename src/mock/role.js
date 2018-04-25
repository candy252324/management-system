import Mock from 'mockjs'
import { param2Obj,getIndexById } from "@/utils"

const list=[
  {
    F_ID:"111",
    F_FullName:"普通员工",
    RoleGrade:3,
    // menus:'[{"id":2,"name":"现况","parentId":0,"route":"/situation","children":[{"id":5,"name":"产量现况","parentId":2,"route":"/situation/real"},{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"}]},{"id":5,"name":"产量现况","parentId":2,"route":"/situation/real"},{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"},{"id":13,"name":"仓储","parentId":0,"route":"/storage"},{"id":15,"name":"物料","parentId":0,"route":"/stuff","children":[{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]},{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]',
    // resources:[
    //   {id:"315",menuId:33,name:"新增角色",url:"/role/add",method:"post"},
    //   {id:"316",menuId:33,name:"修改角色",url:"/role/edit",method:"post"},
    //
    //   {id:"319",menuId:35,name:"增加账户",url:"/account/add",method:"post"},
    //   {id:"320",menuId:35,name:"修改账户",url:"/account/edit",method:"post"},
    //
    //   {id:"323",menuId:156,name:"增加菜单",url:"/menu/add",method:"post"},
    //   {id:"324",menuId:156,name:"修改菜单",url:"/menu/edit",method:"post"},
    // ],
    F_CreateTime:Mock.mock("@datetime"),
    F_CreateUserId:"111",
    F_ModifyTime:Mock.mock("@datetime"),
    F_ModifyUserId:"222",
    F_DeleteTime:Mock.mock("@datetime"),
    F_DeleteUserId:"333",
    F_Description:"",
  },
  {
    F_ID:"222",
    F_FullName:"技术员",
    RoleGrade:2,
    // menus:'[{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"},{"id":13,"name":"仓储","parentId":0,"route":"/storage"},{"id":15,"name":"物料","parentId":0,"route":"/stuff","children":[{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]},{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"},{"id":30,"name":"组织架构","parentId":1,"route":"/setting/organize"},{"id":31,"name":"区域管理","parentId":1,"route":"/setting/area"},{"id":32,"name":"岗位管理","parentId":1,"route":"/setting/duty"},{"id":33,"name":"角色管理","parentId":1,"route":"/setting/role"},{"id":35,"name":"用户管理","parentId":1,"route":"/setting/account"},{"id":156,"name":"系统菜单","parentId":1,"route":"/setting/menu"},{"id":37,"name":"设备结构","parentId":36,"route":"/setting/equip/structure"},{"id":38,"name":"配件型号","parentId":36,"route":"/setting/equip/model"}]',
    // resources:[
    //   {id:"318",menuId:33,name:"查看角色",url:"/role/detail",method:"get"},
    //   {id:"321",menuId:35,name:"查询账户",url:"/account/detail",method:"get"},
    //   {id:"325",menuId:156,name:"查看菜单",url:"/menu/detail",method:"get"},
    // ],
    F_CreateTime:Mock.mock("@datetime"),
    F_CreateUserId:"333",
    F_ModifyTime:Mock.mock("@datetime"),
    F_ModifyUserId:"222",
    F_DeleteTime:Mock.mock("@datetime"),
    F_DeleteUserId:"333",
    F_Description:"",
  },
  {
    F_ID:"333",
    F_FullName:"班长",
    RoleGrade:1,
    // menus:'[{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"},{"id":13,"name":"仓储","parentId":0,"route":"/storage"},{"id":15,"name":"物料","parentId":0,"route":"/stuff","children":[{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]},{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"},{"id":30,"name":"组织架构","parentId":1,"route":"/setting/organize"},{"id":31,"name":"区域管理","parentId":1,"route":"/setting/area"},{"id":32,"name":"岗位管理","parentId":1,"route":"/setting/duty"},{"id":33,"name":"角色管理","parentId":1,"route":"/setting/role"},{"id":35,"name":"用户管理","parentId":1,"route":"/setting/account"},{"id":156,"name":"系统菜单","parentId":1,"route":"/setting/menu"},{"id":37,"name":"设备结构","parentId":36,"route":"/setting/equip/structure"},{"id":38,"name":"配件型号","parentId":36,"route":"/setting/equip/model"}]',
    // resources:[
    //   {id:"318",menuId:33,name:"查看角色",url:"/role/detail",method:"get"},
    //   {id:"321",menuId:35,name:"查询账户",url:"/account/detail",method:"get"},
    //   {id:"325",menuId:156,name:"查看菜单",url:"/menu/detail",method:"get"},
    // ],
    F_CreateTime:Mock.mock("@datetime"),
    F_CreateUserId:"222",
    F_ModifyTime:Mock.mock("@datetime"),
    F_ModifyUserId:"222",
    F_DeleteTime:Mock.mock("@datetime"),
    F_DeleteUserId:"333",
    F_Description:"",
  }
]


export default {
  getList:config=>{
    const { page, limit, prop ,order,searchWord } = param2Obj(config.url)
    let mockList=list;
    if (order === 'descending') {
      mockList = list.reverse()
    }
    if(searchWord){
      mockList=mockList.filter((item)=>{
        return item.F_FullName.indexOf(searchWord)>-1
      })
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    var obj={list:pageList,total:mockList.length}
    return JSON.stringify(obj);
  },
  submitForm:config=>{
    var item=JSON.parse(config.body)
    if(!item.F_ID){
      item.F_ID=Mock.mock("@guid");
      item.F_CreateTime=Mock.mock("@now");
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
  getOptions:config=>{
    let list= [
      {value:"111",label:"普通员工" },
      {value:"222",label:"技术员" },
      {value:"333",label:"班长" }
    ]
    return JSON.stringify(list);
  },
}
