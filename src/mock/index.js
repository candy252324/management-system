import Mock from 'mockjs'

//id转名字
import id2nameAPI from './id2name'

//基础设置
import accountAPI from './account'
import roleAPI from './role'
import menuAPI from './menu'
import buttonAPI from './buttonManage'


//id转名字
Mock.mock(/\/ClientsData\/GetClientsDataJson/, 'get', id2nameAPI.getList)

//登陆
Mock.mock(/\/Login\/Login/, 'post', accountAPI.login)
Mock.mock(/\/Login\/UserInfo/, 'get', accountAPI.getUserInfo)
Mock.mock(/\/Login\/Logout/, 'post', accountAPI.logout)

//用户管理
Mock.mock(/\/User\/Get\b/, 'get', accountAPI.getList)
Mock.mock(/\/User\/SubmitForm/, 'post', accountAPI.submitForm)
Mock.mock(/\/User\/Detail/, 'get', accountAPI.getDetail)
Mock.mock(/\/User\/Delete/, 'post', accountAPI.delItem)
Mock.mock(/\/User\/Password/, 'post', accountAPI.changePsw)
Mock.mock(/\/User\/GetTreeOptions/, 'get', accountAPI.getTreeOptions)

Mock.mock(/\/Role\/Get\b/, 'get', roleAPI.getList)
Mock.mock(/\/Role\/SubmitForm/, 'post', roleAPI.submitForm)
Mock.mock(/\/Role\/Delete/, 'post', roleAPI.delItem)
Mock.mock(/\/Role\/GetOptions/, 'get', roleAPI.getOptions)

Mock.mock(/\/menu\/list/, 'get', menuAPI.getList)
Mock.mock(/\/menu\/detail/, 'get', menuAPI.getDetail)
Mock.mock(/\/menu\/submit/, 'post', menuAPI.submitForm)
Mock.mock(/\/menu\/del/, 'post', menuAPI.delItem)

Mock.mock(/\/buttonManage\/list/, 'get', buttonAPI.getList)
Mock.mock(/\/buttonManage\/detail/, 'get', buttonAPI.getDetail)
Mock.mock(/\/buttonManage\/submit/, 'post', buttonAPI.submitForm)
Mock.mock(/\/buttonManage\/del/, 'post', buttonAPI.delItem)
