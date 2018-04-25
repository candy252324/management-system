<template>
  <div>
    <table-toolbar :startAction.sync="startAction">
      <div slot="plain" class="plain-ct">
        <div class="search-box">
          <el-input
            placeholder="按钮名称"
            prefix-icon="el-icon-search"
            v-model="searchWord">
          </el-input>
        </div>
        <el-button-group>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog(0)">新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="getList"></el-button>
        </el-button-group>
      </div>
      <p slot="action" class="action-ct">
        <span>{{$t('table.select')}}&emsp;</span>
        <el-button type="text" @click="showDialog(1)"><i class="el-icon-edit"></i>{{$t('table.edit')}}</el-button>
        <el-button type="text" @click="showDialog(2)"><i class="el-icon-zoom-in"></i>{{$t('table.check')}}</el-button>
        <el-button type="text" @click="del"><i class="el-icon-delete"></i>{{$t('table.del')}}</el-button>
      </p>
    </table-toolbar>
    <div>
      <el-table
        :data="list"
        @row-click="handleRowClick"
        style="width: 100%"
        :height="315"
        fit highlight-current-row
      >
        <el-table-column prop="name" label="名称" width="120"></el-table-column>
        <el-table-column prop="method" label="请求方法" width="120"></el-table-column>
        <el-table-column prop="url" label="请求地址"></el-table-column>
      </el-table>
    </div>
    <el-dialog  width="35%" :title="dialogTitle" :visible.sync="innerVisible" append-to-body>
      <button-manage-form  ref="ButtonManageForm"></button-manage-form>
      <div slot="footer" class="dialog-footer" v-if="actionType!==2">
        <el-button @click="innerVisible=false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="confirm" :loading="btnLoading">{{btnLoading?"提交中":"确 定"}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TableToolbar from '@/components/TableToolbar'
  import ButtonManageForm from './ButtonManageForm'
  import { getList, submitForm,delItem } from '@/api/buttonManage'
  export default {
    name:"ButtonManage",
    props:["menuId"],
    data() {
      return {
        startAction:false,      //控制table-toolbar状态
        actionType:undefined,           //0新增按钮 1修改按钮 2查看按钮
        dialogTitle:"",
        innerVisible:false,
        btnLoading:false,
        list:[],                //所有数据
        total:0,                //数据条数
        rowId:undefined,       //当前编辑的按钮Id
        searchWord:"",

      }
    },
    methods:{
      getList(){
        this.loading=true;
        getList({id:this.menuId}).then((res)=>{
          this.list=JSON.parse(res.data)
          this.loading=false
          console.log(this.list)
        })
      },
      handleRowClick(row, event, column){
        this.startAction=true;
        this.rowId=row.id;
      },
      showDialog(i){
        this.actionType=i;
        switch(i){
          case 0:
            this.dialogTitle="新增按钮";
            this.innerVisible=true;
            break;
          case 1:
            if(!this.rowId) return;
            this.dialogTitle="修改按钮";
            this.innerVisible=true;
            this.$nextTick(() => {
              this.$refs.ButtonManageForm.getDetail(this.rowId);
            });
            break;
          case 2:
            if(!this.rowId) return;
            this.dialogTitle="查看按钮";
            this.innerVisible=true;
            this.$nextTick(() => {
              this.$refs.ButtonManageForm.getDetail(this.rowId);
            });
            break;
        }
      },
      del(){
        if(!this.rowId) return;
        this.$confirm(this.$t('form.del'),this.$t('form.tip'),{ type:'warning',closeOnClickModal:false,beforeClose:(action, instance, done)=>{
            if(action==="confirm"){
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = this.$t('form.going');
              delItem({id:this.rowId}).then(res=>{
                done();
                instance.confirmButtonLoading = false;
                if(res.data.status===1){
                  this.reset();
                }
              })
            }else{
              done();
            }
          }})
      },
      confirm(){
        this.btnLoading=true;
        var formData=this.$refs.ButtonManageForm.formData;
        if(!formData.menuId){
          formData.menuId=this.menuId;
        }
        submitForm(formData).then(res=>{
          if(res.data.status===1){
            this.reset();
            this.clearForm();
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      reset(){
        this.btnLoading=false;
        this.rowId=undefined;
        this.innerVisible=false;
        this.getList();
        this.showSuccess();
      },
      hideAction(){
        this.startAction=false;
        this.rowId=undefined;
      },
    },
    watch:{
      "innerVisible"(val){
        if(!val && this.$refs.ButtonManageForm){
          this.$refs.ButtonManageForm.clearForm();
        }
      }
    },
    components:{
      TableToolbar,
      ButtonManageForm
    }
  }
</script>

<style lang="scss" scoped>

</style>
