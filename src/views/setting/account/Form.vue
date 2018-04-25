<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form" :label-width="formLabelWidth">
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('account.Account')" prop="WorkId">
            <el-input v-model="formData.Account" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.RoleId')" prop="RoleId">
            <el-select :disabled="actionType===2" v-model="formData.RoleId" clearable>
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
          <el-form-item :label="$t('account.RealName')" prop="RealName">
            <el-input v-model="formData.RealName" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.Gender')" prop="Gender">
            <el-radio-group v-model="formData.Gender" :disabled="actionType===2">
              <el-radio :label="1">{{$t("account.male")}}</el-radio>
              <el-radio :label="0">{{$t("account.female")}}</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-col>
      </el-form-item>

      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('account.Mobile')">
            <el-input v-model="formData.Mobile" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">

          <el-form-item :label="$t('account.Birthday')">
            <el-date-picker :clearable="actionType!==2" :disabled="actionType===2"
              v-model="formData.Birthday"
              type="date"
              format="yyyy - MM - dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>


      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('account.NickName')">
            <el-input v-model="formData.NickName" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.Email')">
            <el-input v-model="formData.Email" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item v-if="actionType===2" label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('account.F_CreateUserId')">
            <el-input :value="formatClientData('user',formData.F_CreateUserId)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.F_CreateTime')">
            <el-input v-model="formData.F_CreateTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item v-if="actionType===2" label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('account.F_ModifyUserId')">
            <el-input :value="formatClientData('user',formData.F_ModifyUserId)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('account.F_ModifyTime')">
            <el-input v-model="formData.F_ModifyTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('account.F_Description')">
        <el-input type="textarea" :rows="3" v-model="formData.F_Description" :disabled="actionType===2"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { deepClone }from '@/utils'
  import * as roleAPI from '@/api/role'

  export default {
    name:"Form",
    props:["actionType"],
    data() {
      return {
        formData:{},
        roles:[],
        rules: {
          // Account: [
          //   { required: true, message: '请输入账号', trigger: 'blur' },
          // ],
          RealName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          Gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          WorkId: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          RoleId: [
            { required: true, message: '请设置权限', trigger: 'change' }
          ],
        },
        formLabelWidth: '100px',
      }
    },
    methods:{
      getRoleOptions(){
        roleAPI.getOptions().then(res=>{
          this.roles=JSON.parse(res.data);
        })
      },
      setFormData(obj){
        this.getRoleOptions()
        this.$refs.form.resetFields();
        this.formData=deepClone(obj);
        this.formData.Train=!!this.formData.Train;
        this.formData.Independent=!!this.formData.Independent;
        this.formData.Instructor=!!this.formData.Instructor;
        this.formData.Trainer=!!this.formData.Trainer;

        //判断该用户的角色是否被删除了
        var role=this.formatClientData("role",this.formData.RoleId)
        if(!role && this.actionType!==0){this.formData.RoleId=""};
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


