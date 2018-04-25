<template>
  <div class="table-wrap">
    <table-toolbar :startAction.sync="startAction">
      <div slot="plain" class="plain-ct" >
        <div class="search-box" >
          <div class="search-item">
            <el-input clearable
              :placeholder="$t('role.F_FullName')"
              v-model.trim="listQuery.searchWord"
              @keyup.enter.native="search"
              prefix-icon="el-icon-search">
            </el-input>
          </div>
        </div>
        <el-button-group>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog(0)" v-has="'add'">{{$t('table.add')}}</el-button>
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="refresh"></el-button>
        </el-button-group>
      </div>
      <p slot="action" class="action-ct">
        <span>{{$t('table.select')}}&emsp;</span>
        <el-button type="text"  @click="showDialog(1)" v-has="'edit'"><i class="el-icon-edit"></i>{{$t('table.edit')}}</el-button>
        <el-button type="text"  @click="showDialog(2)"><i class="el-icon-zoom-in"></i>{{$t('table.check')}}</el-button>
        <el-button type="text"  @click="del"  v-has="'del'"><i class="el-icon-delete"></i>{{$t('table.del')}}</el-button>
      </p>

    </table-toolbar>

    <el-table
      :data="list"
      @row-click="handleRowClick"
      @sort-change="handleSortChange"
      v-loading="loading"
      fit highlight-current-row
    >
      <el-table-column type="index"  width="50"></el-table-column>
      <el-table-column prop="F_FullName" :label="$t('role.F_FullName')" width="180" sortable="custom"></el-table-column>
      <el-table-column prop="RoleGrade" :label="$t('role.RoleGrade')" width="140" sortable="custom">
        <template slot-scope="scope">
          <el-tag :type='scope.row.RoleGrade==1?"danger":scope.row.RoleGrade==2?"success":"primary"'>
            {{scope.row.RoleGrade==1?"高级":scope.row.RoleGrade==2?"中级":"初级"}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="F_Description" :label="$t('role.F_Description')" sortable="custom" show-overflow-tooltip></el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="pageSizes"
        :page-size.sync="listQuery.limit"
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
  </div>
</template>

<script>
  import DialogForm from './Form'
  import { tableCommon,tableEdit }  from '@/mixin/table'
  import { getList,submitForm,delItem} from '@/api/role'
  import { ID2NAME } from '@/utils/id2name'
  import { deepClone }from '@/utils'

  export default {
    name:"role",
    mixins: [tableCommon,tableEdit],
    components:{ DialogForm },
    data() {
      return {
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
      confirm(){
        if(!this.$refs.Form.validate()) return;
        var formData=deepClone(this.$refs.Form.formData);
        submitForm(formData).then(res=>{
          var d=JSON.parse(res.data)
          if(d.code===1){
            this.rowData={};
            this.dialogVisible=false;
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






