import axios from 'axios'
export default{
  state: {
    num:1,
    msg:"",
  },
  mutations: {
    increment(state,payload){
      state.num+=payload;
    },
    getUsers(){
      axios.get("/mock/goos").then((res)=>{
        console.log(res.data)
     })
    }
  },
  actions:{

  },
  getters:{

  }

}
