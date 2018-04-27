<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form" :label-width="formLabelWidth">
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('user.account')" prop="account">
            <el-input v-model="formData.account" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.role')" prop="role">
            <el-select :disabled="actionType===2" v-model="formData.role" clearable>
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('user.name')" prop="name">
            <el-input v-model="formData.name" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.gender')" prop="gender">
            <el-radio-group v-model="formData.gender" :disabled="actionType===2">
              <el-radio :label="true">{{$t("user.male")}}</el-radio>
              <el-radio :label="false">{{$t("user.female")}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('user.mobile')">
            <el-input v-model="formData.mobile" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.email')">
            <el-input v-model="formData.email" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>


      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('user.birthday')">
            <el-date-picker :clearable="actionType!==2" :disabled="actionType===2"
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

      <el-form-item v-if="actionType===2" label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('user.createUserId')">
            <el-input :value="formatClientData('user',formData.createUserId)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.createTime')">
            <el-input v-model="formData.createTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item v-if="actionType===2" label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('user.modifyUserId')">
            <el-input :value="formatClientData('user',formData.modifyUserId)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('user.modifyTime')">
            <el-input v-model="formData.modifyTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('user.extra')">
        <el-input type="textarea" :rows="3" v-model="formData.extra" :disabled="actionType===2"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { deepClone }from '@/utils'
  import { getOptions } from '@/api/role'

  export default {
    name:"Form",
    props:["actionType"],
    data() {
      return {
        formData:{},
        roles:[],
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          role: [
            { required: true, message: '请设置权限', trigger: 'change' }
          ],
        },
        formLabelWidth: '100px',
      }
    },
    methods:{
      getRoleOptions(){
        getOptions().then(res=>{
          this.roles=res.data||[];
        })
      },
      setFormData(obj){
        this.getRoleOptions()
        this.$refs.form.resetFields();
        this.formData=deepClone(obj);
        //判断该用户的角色是否被删除了
        var role=this.formatClientData("role",this.formData.role)
        if(!role && this.actionType!==0){this.formData.role=""};
      },
      validate(){
        var v;
        this.$refs.form.validate((valid) => {
          v=valid;
        });
        return v;
      }
    },
  }
</script>


