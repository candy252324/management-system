import Mock from 'mockjs'
Mock.setup({
  timeout: "2000-3000"
})

//id转名字
import id2nameAPI from './id2name'

//基础设置
import userAPI from './user'
import roleAPI from './role'
import menuAPI from './menu'
import buttonAPI from './buttonManage'


//id转名字
Mock.mock(/\/ClientsData\/GetClientsDataJson/, 'get', id2nameAPI.getList)

//登陆
Mock.mock(/\/login\/token/, 'post', userAPI.login)
Mock.mock(/\/login\/info/, 'get', userAPI.getUserInfo)
Mock.mock(/\/login\/logout/, 'post', userAPI.logout)

//用户管理
Mock.mock(/\/user\/list/, 'get', userAPI.getList)
Mock.mock(/\/user\/submit/, 'post', userAPI.submitForm)
Mock.mock(/\/user\/detail/, 'get', userAPI.getDetail)
Mock.mock(/\/user\/del/, 'post', userAPI.delItem)
Mock.mock(/\/user\/psw/, 'post', userAPI.changePsw)
Mock.mock(/\/user\/treeOptions/, 'get', userAPI.getTreeOptions)

Mock.mock(/\/role\/list/, 'get', roleAPI.getList)
Mock.mock(/\/role\/submit/, 'post', roleAPI.submitForm)
Mock.mock(/\/role\/del/, 'post', roleAPI.delItem)
Mock.mock(/\/role\/options/, 'get', roleAPI.getOptions)

Mock.mock(/\/menu\/list/, 'get', menuAPI.getList)
Mock.mock(/\/menu\/detail/, 'get', menuAPI.getDetail)
Mock.mock(/\/menu\/submit/, 'post', menuAPI.submitForm)
Mock.mock(/\/menu\/del/, 'post', menuAPI.delItem)

Mock.mock(/\/buttonManage\/list/, 'get', buttonAPI.getList)
Mock.mock(/\/buttonManage\/detail/, 'get', buttonAPI.getDetail)
Mock.mock(/\/buttonManage\/submit/, 'post', buttonAPI.submitForm)
Mock.mock(/\/buttonManage\/del/, 'post', buttonAPI.delItem)
