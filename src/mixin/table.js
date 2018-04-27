
export const tableCommon = {
  data(){
    return {
      list:[],   //表格数据
      total:0,   //数据条数
      loading:false,
      pageSizes:[10, 20, 30, 50],
    }
  },
  methods: {
    search(){
      this.listQuery.page===1?this.getList():this.listQuery.page=1;
    },
    refresh(){
      this.getList("refresh");
    },
    //表格排序
    handleSortChange({column, prop, order}){
      this.listQuery.page = 1;
      this.listQuery.prop=prop;
      this.listQuery.order=order;
      this.getList()
    },
    //更改每页显示数据条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.listQuery.page=1;
      this.getList();
    },
    //更改当前页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
  }
}


import TableToolbar from '@/components/TableToolbar'
export const tableEdit = {
  components:{ TableToolbar },
  data(){
    return {
      startAction:false,      //控制table-toolbar状态
      actionType:undefined,   //0新增 1修改 2查看
      dialogTitle:"",
      dialogVisible:false,
      rowData:{},
    }
  },
  methods:{
    handleRowClick(row, event, column){
      this.startAction=true;
      this.rowData=row;
    },
    showDialog(i){
      this.actionType=i;
      switch(i){
        case 0:
          this.rowData={};
          this.dialogTitle=this.$t('form.add');
          break;
        case 1:
          if(!Object.keys(this.rowData).length) return;
          this.dialogTitle=this.$t('form.edit');
          break;
        case 2:
          if(!Object.keys(this.rowData).length) return;
          this.dialogTitle=this.$t('form.check');
          break;
      }
      this.dialogVisible=true;
      this.$nextTick(() => {
        this.$refs.Form.setFormData(this.rowData);
      });
    },
  },

}

export const tableDisplay = {
  components:{ TableToolbar },
  data(){
    return {
      dialogTitle:"",
      dialogVisible:false,
    }
  },
  methods:{
    handleDbClick(row, event, column){
      this.dialogVisible=true;
      this.$nextTick(() => {
        this.$refs.Form.setFormData(row);
      });
    },
  }
}
