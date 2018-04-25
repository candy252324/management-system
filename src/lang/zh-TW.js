const zhTW = {
  code:{
    //全局
    "0":"操作失敗 ！",
    "1":"操作成功 ！",
    "3":"存在關聯數據，請先處理關聯數據 ！",

    "1000":"賬號已存在 ！",  //账户管理
    "2000":"權限已存在 ！",  //权限管理
    //登陆
    "3000":"賬號不存在",
    "3004":"賬號或密碼錯誤",
    "3008":"當前賬號在其它客戶端登陸，您被迫下線 ！",
    "3012":"登陸過期，正在為您跳轉至登陸頁...",
  },
  sidebar:{
    dashboard:'首頁',
    workList:"工單查詢",
    maintainAndRepair:"維保",
    equipRepair:"設備維修",
    equipMaintain:"設備保養現況",
    db_maintain:"設備保養確認",
    maintainHistory:"設備保養記錄",
    repairHistory:"設備維修記錄",

    setting:"基礎設置",
    account:"賬戶管理",
    role:"權限管理",

    equipment:"設備",
    parts:"配件",
    partsModel:"配件型號",
    equipConfig:"設備配置",
    maintainWay:"保養條件設定",
    apply2equip:"保養方式應用",
    commonFault:"故障內容",
    shut:"強制停機",
  },
  toolbar:{
    info:"個人信息",
    changePsw:"修改密碼",
    logout:"安全退出",
  },
  table:{
    add:"新增",
    edit:"修改",
    del:"刪除",
    check:"查看",
    reset:"重置密碼",
    handleAll:"批處理",
    select:"已選中 1 項",
  },
  tabs:{
    close:"關閉",
    closeOthers:"關閉其它",
    closeAll:"關閉所有",
  },
  form:{
    add:"新增數據",
    edit:"修改數據",
    check:"查看數據",
    del:"確認刪除？",
    tip:"堤示",
    confirm:"保 存",
    ensure:"確 定",
    cancel:"取 消",
    going:"執行中",
    isNew:"已是最新數據 ！",
  },
  login:{
    login1:"登",
    login2:"陸",
    onLogin:"正在登陸",
    account:"請輸入賬號",
    psw:"請輸入密碼",
    valid:"密碼長度在6-12位",
    fail:"登陸失敗，請重新嘗試",
  },
  dashboard:{
    toRepair:"待維修",
    toMaintain:"今日待保養",
    message:"通蜘消息",
  },
  //工单查询
  workList:{

  },
  //设备维修
  equipRepair:{
    history:"歷史記錄",
  }
}
export default zhTW
