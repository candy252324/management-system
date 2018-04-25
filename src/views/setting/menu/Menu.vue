<template>
  <div class="table-wrap">
    <table-toolbar :startAction.sync="startAction">
      <div slot="plain" class="plain-ct">
        <div class="search-box">
          <el-input
            placeholder="角色名称"
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
        <span class="c-split">|</span>
        <el-button type="text" @click="showDialog(3)"><i class="el-icon-setting"></i>按钮管理</el-button>
      </p>
    </table-toolbar>
    <div :style="`height:${tableH}px;`">
      <el-tree
        :data="list"
        default-expand-all
        :expand-on-click-node="false"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        @node-click="handleNodeClick">
      </el-tree>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  :close-on-click-modal="false">
      <menu-form
        v-if="actionType!==3"
        :tree="list"
        ref="DialogForm"></menu-form>
      <button-manage
        v-if="actionType===3"
        ref="ButtonManage"
        :menuId="rowId"
      ></button-manage>
      <div slot="footer" class="dialog-footer" v-if="actionType!==2 && actionType!==3">
        <el-button @click="dialogVisible=false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="confirm" :loading="btnLoading">{{btnLoading?"提交中":"确 定"}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import TableToolbar from '@/components/TableToolbar'
  import MenuForm from './MenuForm'
  import ButtonManage from './buttonManage/ButtonManage'

  import { getList,submitForm,delItem } from '@/api/menu'

  export default {
    data() {
      return{
        startAction:false,      //控制table-toolbar状态
        actionType:undefined,   //0新增菜单 1修改菜单 2查看菜单 3按钮管理
        dialogVisible: false,
        btnLoading:false,

        dialogTitle:"",
        list:[],
        rowId:undefined,
        searchWord:"",
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    created(){
      this.getList();
    },
    methods: {
      getList(){
        this.loading=true;
        getList(this.listQuery).then((res)=>{
          this.list=JSON.parse(res.data);
          this.loading=false;
          console.log(this.list)
        })
      },
      showDialog(i){
        this.actionType=i;
        switch(i){
          case 0:
            this.dialogTitle="新增菜单";
            this.dialogVisible=true;
            break;
          case 1:
            if(!this.rowId) return;
            this.dialogTitle="修改菜单";
            this.dialogVisible=true;
            this.$nextTick(() => {
              this.$refs.DialogForm.getDetail(this.rowId);
            });
            break;
          case 2:
            if(!this.rowId) return;
            this.dialogTitle="查看菜单";
            this.dialogVisible=true;
            this.$nextTick(() => {
              this.$refs.DialogForm.getDetail(this.rowId);
            });
            break;
          case 3:
            if(!this.rowId) return;
            this.dialogTitle="按钮管理";
            this.dialogVisible=true;
            this.$nextTick(() => {
              this.$refs.ButtonManage.getList();
            });
            break;
        }
      },
      handleNodeClick(data){
        this.startAction=true;
        this.rowId=data.id
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
              }else if(res.data.status===2){
                this.$message.warning(res.data.msg)
              }
            })
          }else{
            done();
          }
        }})
      },
      confirm(){
        this.btnLoading=true;
        if(this.actionType!==3){
          var formData=this.$refs.DialogForm.formData;
          console.log(formData)
          submitForm(formData).then(res=>{
            if(res.data.status===1){
              this.reset();
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{

        }
      },
      hideAction(){
        this.startAction=false;
        this.rowId=undefined;
      },
      reset(){
        this.btnLoading=false;
        this.rowId=undefined;
        this.dialogVisible=false;
        this.getList();
        this.showSuccess();
      }
    },
    watch:{
      //清空表单数据
      "dialogVisible"(val){
        if(!val && this.$refs.DialogForm){
          this.$refs.DialogForm.clearForm();
        }
      }
    },
    components:{
      TableToolbar,
      MenuForm,
      ButtonManage,
    }
  }
</script>

