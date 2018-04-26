const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  themeColor: state => state.app.themeColor,
  clientData: state => state.app.clientData,   //id转名字
  intervalTime: state => state.app.intervalTime,   //数据刷新间隔时间

  token: state => state.user.token,
  roleGrade: state => state.user.roleGrade,
  account: state => state.user.account,
  avatar: state => state.user.avatar,
  defaultAvatar: state => state.user.defaultAvatar,

  allowedRouter: state => state.permission.allowedRouter,
  allRouter: state => state.permission.allRouter,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}
export default getters
