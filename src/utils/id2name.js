import { id2name } from '@/api/id2name'
import store from '@/store'

export function ID2NAME() {
  id2name().then(res=>{
    store.dispatch('id2name', JSON.parse(res.data)).then(()=>{

    }).catch(err=>{
      console.error("id转名字失败")
    })
  })
}
