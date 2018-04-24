import Mock from 'mockjs'

import userAPI from './base/user'
import roleAPI from './base/role'

//登陆
Mock.mock(/\/Login\/Login/, 'post', userAPI.login)
Mock.mock(/\/Login\/UserInfo/, 'get', userAPI.getUserInfo)
Mock.mock(/\/Login\/Logout/, 'post', userAPI.logout)


//用户管理
Mock.mock(/\/User\/Get\b/, 'get', userAPI.getList)
Mock.mock(/\/User\/SubmitForm/, 'post', userAPI.submitForm)
Mock.mock(/\/User\/Detail/, 'get', userAPI.getDetail)
Mock.mock(/\/User\/Delete/, 'post', userAPI.delItem)
Mock.mock(/\/User\/Password/, 'post', userAPI.changePsw)
Mock.mock(/\/User\/GetTreeOptions/, 'get', userAPI.getTreeOptions)

//权限管理
Mock.mock(/\/Role\/Get\b/, 'get', roleAPI.getList)
Mock.mock(/\/Role\/SubmitForm/, 'post', roleAPI.submitForm)
Mock.mock(/\/Role\/Delete/, 'post', roleAPI.delItem)
Mock.mock(/\/Role\/GetOptions/, 'get', roleAPI.getOptions)
