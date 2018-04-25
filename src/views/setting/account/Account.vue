<template>
  <div class="table-wrap">
    <el-popover
      ref="popover"
      placement="left"
      :title="$t('form.tip')"
      width="230"
      trigger="hover"
      :content="$t('account.addTip')+`${originPassword}`">
    </el-popover>
    <table-toolbar :startAction.sync="startAction">
      <div slot="plain" class="plain-ct" >
        <div class="search-box" >
          <div class="search-item">
            <el-input clearable
              :placeholder="$t('account.search')"
              v-model.trim="listQuery.searchWord"
              @keyup.enter.native="search"
              prefix-icon="el-icon-search">
            </el-input>
          </div>
        </div>
        <el-button-group>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog(0)" v-has="'add'" v-popover:popover>{{$t('table.add')}}</el-button>
          <!--<el-button type="primary" size="small" icon="el-icon-upload2">导入</el-button>-->
          <!--<el-button type="primary" size="small" icon="el-icon-download">导出</el-button>-->
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="refresh"></el-button>
        </el-button-group>
      </div>

      <p slot="action" class="action-ct">
        <span>{{$t('table.select')}}&emsp;</span>
        <el-button type="text"  @click="showDialog(1)" v-has="'edit'"><i class="el-icon-edit"></i>{{$t('table.edit')}}</el-button>
        <el-button type="text"  @click="showDialog(2)"><i class="el-icon-zoom-in"></i>{{$t('table.check')}}</el-button>
        <el-button type="text"  @click="del" v-has="'del'"><i class="el-icon-delete"></i>{{$t('table.del')}}</el-button>
        <span class="c-split">|</span>
        <el-button type="text"  @click="pswDialogVisible=true" v-has="'edit'"><i class="el-icon-view"></i>{{$t('table.reset')}}</el-button>
      </p>

    </table-toolbar>

    <el-table
      :data="list"
      :default-sort = "{prop: 'createDate', order: 'descending'}"
      @row-click="handleRowClick"
      @sort-change="handleSortChange"
      v-loading="loading"
      fit highlight-current-row
    >
      <el-table-column type="index"  width="50"></el-table-column>
      <el-table-column prop="Account" :label="$t('account.Account')" width="140"></el-table-column>
      <!--<el-table-column prop="WorkId" :label="$t('account.WorkId')" width="140" sortable="custom"></el-table-column>-->
      <el-table-column prop="RealName" :label="$t('account.RealName')" width="140" sortable="custom"></el-table-column>
      <el-table-column prop="NickName" :label="$t('account.NickName')" width="140" sortable="custom"></el-table-column>
      <el-table-column prop="Gender" :label="$t('account.Gender')" width="80" sortable="custom">
        <template slot-scope="scope">
          {{scope.row.Gender?$t("account.male"):$t("account.female")}}
        </template>
      </el-table-column>
      <el-table-column prop="RoleId" :label="$t('account.RoleId')" width="150" sortable>
        <template slot-scope="scope">
          {{formatClientData("role",scope.row.RoleId)}}
        </template>
      </el-table-column>
      <!--<el-table-column prop="departmentId" label="部门" width="100" sortable></el-table-column>-->
      <el-table-column prop="Mobile" :label="$t('account.Mobile')" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="Email" :label="$t('account.Email')" width="220" sortable="custom" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="dutyId" label="岗位" width="100"></el-table-column>-->
      <el-table-column prop="Birthday" :label="$t('account.Birthday')" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="F_Description" :label="$t('account.F_Description')" sortable="custom" show-overflow-tooltip></el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="pageSizes"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog width="40%" :title="dialogTitle" :visible.sync="dialogVisible"  :close-on-click-modal="false">
      <dialog-form
        ref="Form"
        :actionType="actionType"
      ></dialog-form>
      <div slot="footer" class="dialog-footer" v-if="actionType!==2">
        <el-button @click="dialogVisible=false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('form.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" :title="$t('table.reset')" :visible.sync="pswDialogVisible"  :close-on-click-modal="false">
      <psw-form ref="PswForm"></psw-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pswDialogVisible=false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="confirm(1)">{{$t('form.reset')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DialogForm from './Form'
  import PswForm from './PswForm'
  import { tableCommon,tableEdit }  from '@/mixin/table'
  import { getList,submitForm,delItem } from '@/api/account'
  import { ID2NAME } from '@/utils/id2name'
  import {encrypt} from '@/utils/crypto'
  import { deepClone } from "@/utils"

  export default {
    name:"account",
    mixins: [tableCommon,tableEdit],
    components:{ DialogForm, PswForm },
    data() {
      return {
        pswDialogVisible:false,
        originPassword:"123456",
        listQuery: {
          page: 1,
          limit: 20,
          prop:"",  //排序字段
          order:"",  //ascending升序,descending降序
          searchWord:"",
        },
      }
    },
    created(){
      this.getList();
    },
    methods: {
      getList(r){
        this.loading=true;
        getList(this.listQuery).then((res)=>{
          var d=JSON.parse(res.data);
          this.list=d.list;
          this.total=d.total;
          this.loading=false;
          if(r==="refresh"){
            var msg=this.$t('form.isNew')
            this.$message.success(msg)
          }
        })
      },
      confirm(type){
        var formData;
        if(type==1){
          if(!this.$refs.PswForm.validate()) return;
          var NewPassword=encrypt(this.$refs.PswForm.formData.psw1);
          formData=deepClone(this.rowData);
          formData.Password=NewPassword
        }else{
          if(!this.$refs.Form.validate()) return;
          formData=deepClone(this.$refs.Form.formData);
          formData.Train=formData.Train?1:0;
          formData.Independent=formData.Independent?1:0;
          formData.Instructor=formData.Instructor?1:0;
          formData.Trainer=formData.Trainer?1:0;
          //赋予初始密码
          if(!this.$refs.Form.Password){
            formData.Password=encrypt(this.originPassword);
          }
        }
        submitForm(formData).then(res=>{
          var d=JSON.parse(res.data)
          if(d.code===1){
            this.rowData={};
            this.dialogVisible=false;
            this.pswDialogVisible=false;
            this.getList();
            ID2NAME();
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      del(){
        if(!this.rowData.F_ID) return;
        this.$confirm(this.$t('form.del'),this.$t('form.tip'),{ type:'warning',closeOnClickModal:false,beforeClose:(action, instance, done)=>{
            if(action==="confirm"){
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = this.$t('form.going');
              delItem({F_ID:this.rowData.F_ID}).then(res=>{
                var d=JSON.parse(res.data)
                done();
                instance.confirmButtonLoading = false;
                if(d.code===1){
                  this.rowData={};
                  this.getList();
                  ID2NAME();
                }
              })
            }else{
              done();
            }
          }})
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cell .yes{
    display: inline-block;
    width:22px;
    height: 22px;
    border-radius: 50%;
    background: radial-gradient(50% 50%, #fff,$g-success);
  }
  .cell .no{
    display: inline-block;
    width:22px;
    height: 22px;
    border-radius: 50%;
    background: #eee;
  }
</style>
