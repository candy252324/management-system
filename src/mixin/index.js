
export const formatTagStyle={
  methods: {
    formatTagStyle: function (rowCycle) {
      let cycle = this.formatClientData("maintainWay",rowCycle);
      let type="";
      if(cycle==="周保养"){
        type="primary";
      }else if(cycle==="月保养"){
        type="success";
      }else if(cycle==="季保养"){
        type="warning";
      }else{
        type="info";
      }
      return type;
    },
  }
}
