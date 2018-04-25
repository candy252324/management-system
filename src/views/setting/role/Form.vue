<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form"  :label-width="formLabelWidth">
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('role.F_FullName')" prop="F_FullName">
            <el-input v-model.trim="formData.F_FullName" :disabled="actionType===2"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('role.RoleGrade')" prop="RoleGrade">
            <el-select :disabled="actionType===2" v-model="formData.RoleGrade"  clearable>
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-popover trigger="hover" placement="left" width="350" :title="$t('form.tip')">
            <p>{{$t('role.tip1')}}</p>
            <p>{{$t('role.tip2')}}</p>
            <p>{{$t('role.tip3')}}</p>
            <div slot="reference" class="name-wrapper">
              <i class="el-icon-question"></i>
            </div>
          </el-popover>
        </el-col>
      </el-form-item>
      <el-form-item v-if="actionType===2" label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('role.F_CreateUserId')">
            <el-input :value="formatClientData('user',formData.F_CreateUserId)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('role.F_CreateTime')">
            <el-input v-model="formData.F_CreateTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item v-if="actionType===2" label-width="0">
        <el-col :span="11">
          <el-form-item :label="$t('role.F_ModifyUserId')">
            <el-input :value="formatClientData('user',formData.F_ModifyUserId)" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="c-space" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item :label="$t('role.F_ModifyTime')">
            <el-input v-model="formData.F_ModifyTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('role.F_Description')">
        <el-input type="textarea" :rows="3" v-model.trim="formData.F_Description" :disabled="actionType===2"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { deepClone }from '@/utils'

  export default {
    name:"Form",
    props:["actionType"],
    data() {
      return {
        formData:{},
        rules: {
          F_FullName: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
          ],
          RoleGrade: [
            { required: true, message: '请设置权限等级', trigger: 'change' }
          ],
        },
        gradeOptions: [
         {
            value: 3,
            label: this.$t("role.primary")
          }, {
            value: 2,
            label: this.$t("role.medium")
          }, {
            value: 1,
            label: this.$t("role.senior")
         }
        ],
        formLabelWidth: '100px',
      }
    },
    methods:{
      setFormData(obj){
        this.$refs.form.resetFields();
        this.formData=deepClone(obj);
      },
      validate(){
        var v;
        this.$refs.form.validate((valid) => {
          v=valid;
        });
        return v;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .el-popover p{
    line-height: 25px;
  }
  .el-icon-question{
    font-size: 18px;
    color:$g-info;
    margin-left: 5px;
  }
</style>
