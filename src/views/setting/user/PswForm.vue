<template>
  <div>
    <el-form :model="formData" ref="form" :rules="rules">
      <el-form-item :label="$t('user.password')" :label-width="formLabelWidth" prop="psw1">
        <el-input v-model.trim="formData.psw1" type="password" required></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.pswConfirm')" :label-width="formLabelWidth" prop="psw2">
        <el-input v-model.trim="formData.psw2" type="password" required></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name:"PswForm",
    data() {
      var validatePsw1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formData.psw2 !== '') {
            this.$refs.form.validateField('psw2');
          }
          callback();
        }
      };
      var validatePsw2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.psw1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        formLabelWidth: '100px',
        formData:{
          psw1:"",
          psw2:"",
        },
        rules:{
          psw1: [{  validator: validatePsw1, trigger: 'blur' }],
          psw2: [{  validator: validatePsw2, trigger: 'blur' }],
        }
      }
    },
    methods:{
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

