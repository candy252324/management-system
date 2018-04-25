//用于翻译状态码
import store from '@/store'
import lang from '@/lang'

export default function (param) {
  var curLang=store.getters.language;
  var msg=lang[curLang].code[param]||lang[curLang].code["0"];
  return msg;
}
