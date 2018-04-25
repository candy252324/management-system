<template>
  <div class="information">
    <pan-thumb :image="imageUrl" @changeAvatar="changeAvatar"></pan-thumb>
    <el-form  v-if="!isAdmin" :model="formData" ref="formData" :rules="rules" :label-width="formLabelWidth">
      <el-form-item >
        <el-col :span="11">
          <el-form-item :label="$t('account.Account')" prop="WorkId">
            <el-input v-model="formData.WorkId"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.RealName')" prop="RealName">
            <el-input v-model="formData.RealName"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item :label="$t('account.Gender')" prop="Gender">
            <el-radio-group v-model="formData.Gender">
              <el-radio :label="1">{{$t('account.male')}}</el-radio>
              <el-radio :label="0">{{$t('account.female')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.RoleId')">
            <el-input :value="formatClientData('role',formData.RoleId)" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item :label="$t('account.NickName')">
            <el-input v-model="formData.NickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.Birthday')">
            <el-date-picker
              v-model="formData.Birthday"
              type="date"
              format="yyyy - MM - dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item :label="$t('account.Mobile')">
            <el-input v-model="formData.Mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.Email')">
            <el-input v-model="formData.Email"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <div v-else class="admin">
      {{$t('account.isAdmin')}}
    </div>
  </div>
</template>
<script>

  import PanThumb from '@/components/PanThumb'
  import {deepClone} from '@/utils'

  export default{
    name:"InfoForm",
    data(){
      return {
        imageUrl:"",
        formData:{},
        rules:{
          // Account: [{  required: true, message: '请输入账号', trigger: 'blur' }],
          WorkId: [{  required: true, message: '请输入账号', trigger: 'blur' }],
          RealName: [{  required: true, message: '请输入姓名', trigger: 'blur' }],
          Gender: [{  required: true, message: '请选择性别', trigger: 'change' }],
        },
        formLabelWidth:"100px",
      }
    },
    computed:{
      isAdmin(){
        return !this.$store.getters.roleGrade;
      },
    },
    methods:{
      setFormData(){
        if(!this.isAdmin){
          this.$refs.formData.resetFields();
        }
        this.formData=deepClone(this.$store.getters.userInfo);
        this.imageUrl=this.formData.Avatar||this.$store.getters.defaultAvatar;
      },
      changeAvatar(base64){
        this.imageUrl=base64;
      },
      validate(){
        if(this.isAdmin){return true;}
        var v;
        this.$refs.formData.validate((valid) => {
          v=valid;
        });
        return v;
      }
    },
    components: { PanThumb },
  }
</script>

<style lang="scss" scoped>
  .information{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px 0 100px;
    .el-form{
      margin-top:100px;
      margin-bottom:30px;
    }
    .admin{
      font-size: 16px;
      margin-top:60px;
    }
  }
</style>
