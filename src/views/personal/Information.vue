<template>
  <div class="information">
    <pan-thumb :image="imageUrl" @changeAvatar="changeAvatar"></pan-thumb>
    <el-form  v-if="!isAdmin" :model="formData" ref="formData" :rules="rules" :label-width="formLabelWidth">
      <el-form-item >
        <el-col :span="11">
          <el-form-item :label="$t('user.account')" prop="account">
            <el-input v-model="formData.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.name')" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item :label="$t('user.gender')" prop="gender">
            <el-radio-group v-model="formData.gender">
              <el-radio :label="true">{{$t('user.male')}}</el-radio>
              <el-radio :label="false">{{$t('user.female')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.role')">
            <el-input :value="formatClientData('role',formData.role)" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-form-item :label="$t('user.mobile')">
            <el-input v-model="formData.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.email')">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-form-item :label="$t('user.birthday')">
            <el-date-picker
              v-model="formData.birthday"
              type="date"
              format="yyyy - MM - dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">

        </el-col>
      </el-form-item>
    </el-form>
    <div v-else class="admin">
      {{$t('user.isAdmin')}}
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
          account: [{  required: true, message: '请输入账号', trigger: 'blur' }],
          name: [{  required: true, message: '请输入姓名', trigger: 'blur' }],
          gender: [{  required: true, message: '请选择性别', trigger: 'change' }],
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
        this.imageUrl=this.formData.avatar||this.$store.getters.defaultAvatar;
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
