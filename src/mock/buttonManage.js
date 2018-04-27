import Mock from 'mockjs'
import { param2Obj,getIndexById } from "@/utils"

const list=[
    {id:"315",menuId:33,name:"新增角色",url:"/role/form",method:"post"},
    {id:"316",menuId:33,name:"修改角色",url:"/role/edit",method:"post"},
    {id:"317",menuId:33,name:"删除角色",url:"/role/del",method:"post"},
    {id:"318",menuId:33,name:"查看角色",url:"/role/theDetails",method:"get"},

    {id:"319",menuId:35,name:"增加账户",url:"/user/form",method:"post"},
    {id:"320",menuId:35,name:"修改账户",url:"/user/edit",method:"post"},
    {id:"321",menuId:35,name:"查询账户",url:"/user/theDetails",method:"get"},
    {id:"322",menuId:35,name:"删除账户",url:"/user/del",method:"post"},

    {id:"323",menuId:156,name:"增加菜单",url:"/menu/form",method:"post"},
    {id:"324",menuId:156,name:"修改菜单",url:"/menu/edit",method:"post"},
    {id:"325",menuId:156,name:"查看菜单",url:"/menu/theDetails",method:"get"},
    {id:"326",menuId:156,name:"删除菜单",url:"/menu/del",method:"post"},
]


export default {
  getList:config=>{
    const { id } = param2Obj(config.url);
    var obj=list.filter(item=> item.menuId==id)
    return JSON.stringify(obj);
  },
  getDetail:config=>{
    var {id}=param2Obj(config.url)
    var detail=getItemById(list,id,"F_ID")
    return JSON.stringify(detail);
  },
  submitForm:config=>{
    var item=JSON.parse(config.body)
    if(!item.id){
      item.id=Mock.mock("@guid")
      list.push(item)
    }else{
      var index=getIndexById(list,item.id);
      if(index!==undefined){
        list.splice(index,1,item)
      }
    }
    return {status:1};
  },
  delItem:config=>{
    var {id}=JSON.parse(config.body);
    var index=getIndexById(list,id);
    if(index!==undefined){
      list.splice(index,1)
      return {status:1}
    }
  },
}
