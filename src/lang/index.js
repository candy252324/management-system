import elementEn from 'element-ui/lib/locale/lang/en'
import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'
import elementZhTW from 'element-ui/lib/locale/lang/zh-TW'

import en from './en'
import zhCN from './zh-CN'
import zhTW from './zh-TW'


const lang = {
  en: {
    ...en,
    ...elementEn,
  },
  zhCN:{
    ...zhCN,
    ...elementZhCN

  },
  zhTW: {
    ...zhTW,
    ...elementZhTW

  },
}
export default lang;


