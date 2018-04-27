import Mock from 'mockjs'
import { param2Obj,getIndexById } from "@/utils"

const list=[
  {
    _id:"111",
    name:"普通员工",
    grade:3,
    // menus:'[{"id":2,"name":"现况","parentId":0,"route":"/situation","children":[{"id":5,"name":"产量现况","parentId":2,"route":"/situation/real"},{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"}]},{"id":5,"name":"产量现况","parentId":2,"route":"/situation/real"},{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"},{"id":13,"name":"仓储","parentId":0,"route":"/storage"},{"id":15,"name":"物料","parentId":0,"route":"/stuff","children":[{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]},{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]',
    // resources:[
    //   {id:"315",menuId:33,name:"新增角色",url:"/role/add",method:"post"},
    //   {id:"316",menuId:33,name:"修改角色",url:"/role/edit",method:"post"},
    //
    //   {id:"319",menuId:35,name:"增加账户",url:"/user/add",method:"post"},
    //   {id:"320",menuId:35,name:"修改账户",url:"/user/edit",method:"post"},
    //
    //   {id:"323",menuId:156,name:"增加菜单",url:"/menu/add",method:"post"},
    //   {id:"324",menuId:156,name:"修改菜单",url:"/menu/edit",method:"post"},
    // ],
    createTime:Mock.mock("@datetime"),
    createUserId:"111",
    modifyTime:Mock.mock("@datetime"),
    modifyUserId:"222",
    extra:Mock.mock("@csentence(3,5)")
  },
  {
    _id:"222",
    name:"技术员",
    grade:2,
    // menus:'[{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"},{"id":13,"name":"仓储","parentId":0,"route":"/storage"},{"id":15,"name":"物料","parentId":0,"route":"/stuff","children":[{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]},{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"},{"id":30,"name":"组织架构","parentId":1,"route":"/setting/organize"},{"id":31,"name":"区域管理","parentId":1,"route":"/setting/area"},{"id":32,"name":"岗位管理","parentId":1,"route":"/setting/duty"},{"id":33,"name":"角色管理","parentId":1,"route":"/setting/role"},{"id":35,"name":"用户管理","parentId":1,"route":"/setting/user"},{"id":156,"name":"系统菜单","parentId":1,"route":"/setting/menu"},{"id":37,"name":"设备结构","parentId":36,"route":"/setting/equip/structure"},{"id":38,"name":"配件型号","parentId":36,"route":"/setting/equip/model"}]',
    // resources:[
    //   {id:"318",menuId:33,name:"查看角色",url:"/role/detail",method:"get"},
    //   {id:"321",menuId:35,name:"查询账户",url:"/user/detail",method:"get"},
    //   {id:"325",menuId:156,name:"查看菜单",url:"/menu/detail",method:"get"},
    // ],
    createTime:Mock.mock("@datetime"),
    createUserId:"333",
    modifyTime:Mock.mock("@datetime"),
    modifyUserId:"111",
    extra:Mock.mock("@csentence(3, 5)")
  },
  {
    _id:"333",
    name:"班长",
    grade:1,
    // menus:'[{"id":6,"name":"品质现况","parentId":2,"route":"/situation/move"},{"id":11,"name":"嫁动现况","parentId":2,"route":"/situation/quality"},{"id":12,"name":"收率现况","parentId":2,"route":"/situation/get"},{"id":13,"name":"仓储","parentId":0,"route":"/storage"},{"id":15,"name":"物料","parentId":0,"route":"/stuff","children":[{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"}]},{"id":16,"name":"投料","parentId":15,"route":"/stuff/bulk"},{"id":17,"name":"资材","parentId":15,"route":"/stuff/material"},{"id":18,"name":"投料异常","parentId":15,"route":"/stuff/bulk-abnormal"},{"id":19,"name":"资材异常","parentId":15,"route":"/stuff/material-abnormal"},{"id":20,"name":"现场物料","parentId":15,"route":"/stuff/real"},{"id":30,"name":"组织架构","parentId":1,"route":"/setting/organize"},{"id":31,"name":"区域管理","parentId":1,"route":"/setting/area"},{"id":32,"name":"岗位管理","parentId":1,"route":"/setting/duty"},{"id":33,"name":"角色管理","parentId":1,"route":"/setting/role"},{"id":35,"name":"用户管理","parentId":1,"route":"/setting/user"},{"id":156,"name":"系统菜单","parentId":1,"route":"/setting/menu"},{"id":37,"name":"设备结构","parentId":36,"route":"/setting/equip/structure"},{"id":38,"name":"配件型号","parentId":36,"route":"/setting/equip/model"}]',
    // resources:[
    //   {id:"318",menuId:33,name:"查看角色",url:"/role/detail",method:"get"},
    //   {id:"321",menuId:35,name:"查询账户",url:"/user/detail",method:"get"},
    //   {id:"325",menuId:156,name:"查看菜单",url:"/menu/detail",method:"get"},
    // ],
    createTime:Mock.mock("@datetime"),
    createUserId:"444",
    modifyTime:Mock.mock("@datetime"),
    modifyUserId:"222",
    extra:Mock.mock("@csentence(3, 8)")
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
        return item.name.indexOf(searchWord)>-1
      })
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    var obj={list:pageList,total:mockList.length}
    return {code:0,result:obj};
  },
  submitForm:config=>{
    var item=JSON.parse(config.body)
    if(!item._id){
      item._id=Mock.mock("@guid");
      item.createTime=Mock.mock("@now");
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
    return { code:0 }
  },
  getOptions:config=>{
    let list= [
      {value:"111",label:"普通员工" },
      {value:"222",label:"技术员" },
      {value:"333",label:"班长" }
    ]
    return list;
  },
}
