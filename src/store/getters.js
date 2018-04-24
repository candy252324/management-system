const getters={
  sidebarStatus:state=>state.app.sidebarStatus,

  token: state => state.user.token,
  roleGrade: state => state.user.roleGrade,
  userInfo: state => state.user.userInfo,
  defaultAvatar: state => state.user.defaultAvatar,

  allowedRouter: state => state.permission.allowedRouter,
  allRouter: state => state.permission.allRouter,
}
export default getters
