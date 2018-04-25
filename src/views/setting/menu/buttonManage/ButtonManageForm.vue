<template>
  <div>
    <el-form :model="formData" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input  v-model="formData.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求方法" prop="method">
        <el-input  v-model="formData.method" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求地址" prop="method">
        <el-input  v-model="formData.url" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { getDetail } from '@/api/buttonManage'
  export default{
    name:"ButtonManageForm",
    props:[],
    data(){
      return{
        formData:{
          id:"",
          menuId:"",
          name: '',
          method: '',
          url:''
        },
        rules: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          method: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          url: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    methods:{
      getDetail(id){
        this.loading=true;
        getDetail({id:id}).then(res=>{
          this.formData=JSON.parse(res.data);
          this.loading=false;
        })
      },
      clearForm(){
        for(var key in this.formData){
          this.formData[key]="";
        }
      }
    }
  }
</script>
