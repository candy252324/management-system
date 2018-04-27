import Mock from 'mockjs'
import { param2Obj,getIndexById,item2Tree,deepClone } from "@/utils"

const list=[
  {
    id: "2",
    name: '现况',
    parentId: "0",
    parentName:'根节点',
    route: "/situation",
  },
  {
    id: "5",
    name: '产量现况',
    parentId:"2",
    parentName:'现况',
    route:"/situation/real",
  },
  {
    id: "6",
    name: '品质现况',
    parentId:"2",
    parentName:'现况',
    route:"/situation/move",
  },
  {
    id: "11",
    name: '嫁动现况',
    parentId:"2",
    parentName:'现况',
    route:"/situation/quality",
  },
  {
    id: "12",
    name: '收率现况',
    parentId:"2",
    parentName:'现况',
    route:"/situation/get",
  },
  {
    id: "13",
    name: '仓储',
    parentId:"0",
    parentName:'根节点',
    route:"/storage"
  },
  {
    id: "15",
    name: '物料',
    parentId: "0",
    parentName:'根节点',
    route: "/stuff",
  },
  {
    id: "16",
    name: '投料',
    parentId:"15",
    parentName:'物料',
    route:"/stuff/bulk",
  },
  {
    id: "17",
    name: '资材',
    parentId:"15",
    parentName:'物料',
    route:"/stuff/material",
  },
  {
    id: "18",
    name: '投料异常',
    parentId:"15",
    parentName:'物料',
    route:"/stuff/bulk-abnormal",
  },
  {
    id: "19",
    name: '资材异常',
    parentId:"15",
    parentName:'物料',
    route:"/stuff/material-abnormal",
  },
  {
    id: "20",
    name: '现场物料',
    parentId:"15",
    parentName:'物料',
    route:"/stuff/real",
  },
  {
    id: "1",
    name: '基础设置',
    parentId: "0",
    parentName:'根节点',
    route: "/setting",
  },
  {
    id: "30",
    name: '组织架构',
    parentId:"1",
    parentName:'基础设置',
    route:"/setting/organize",
  },
  {
    id: "31",
    name: '区域管理',
    parentId:"1",
    parentName:'基础设置',
    route:"/setting/area",
  },
  {
    id: "32",
    name: '岗位管理',
    parentId:"1",
    parentName:'基础设置',
    route:"/setting/duty",
  },
  {
    id: "33",
    name: '角色管理',
    parentId:"1",
    parentName:'基础设置',
    route:"/setting/role",
  },
  {
    id: "35",
    name: '用户管理',
    parentId:"1",
    parentName:'基础设置',
    route:"/setting/user",
  },
  {
    id: "156",
    name: '系统菜单',
    parentId:"1",
    parentName:'基础设置',
    route:"/setting/menu",
  },
  {
    id: "36",
    name: '设备',
    parentId: "1",
    parentName:'基础设置',
    route: "/setting/equip",
  },
  {
    id: "37",
    name: '设备结构',
    parentId:"36",
    parentName:'设备',
    route:"/setting/equip/structure",
  },
  {
    id: "38",
    name: '配件型号',
    parentId:"36",
    parentName:'设备',
    route:"/setting/equip/model",
  },
  {
    id: "39",
    name: '设备信息',
    parentId:"36",
    parentName:'设备',
    route:"/setting/equip/equipInfo",
  },
]


export default {
  getList:config=>{
    var _list=deepClone(list)
    var menuTree=item2Tree(_list,"parentId")
    return JSON.stringify(menuTree);
  },
  submitForm:config=>{
    var item=JSON.parse(config.body)
    if(!item.id){
      item.id=Mock.mock("@guid");
      list.push(item)
    }else{
      var index=getIndexById(list,item.id);
      if(index!==undefined){
        list.splice(index,1,item)
      }
    }
    return {status:1};
  },
  getDetail:config=>{
    var {id}=param2Obj(config.url)
    var detail=getItemById(list,id,"F_ID")
    return JSON.stringify(detail)
  },
  delItem:config=>{
    var {id}=JSON.parse(config.body);
    for(var i=0;i<list.length;i++){
      if(list[i].parentId===id){
        return {status:2,msg:"该项目下存在子项目，请先处理子项目"}
      }
    }
    var index=getIndexById(list,id);
    if(index!==undefined){
      list.splice(index,1)
      return {status:1}
    }
  },
}
