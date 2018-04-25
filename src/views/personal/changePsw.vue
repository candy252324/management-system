<template>
  <div>
    <el-form :model="formData" ref="formData" :rules="rules" status-icon>
      <el-form-item :label="$t('toolbar.oldPsw')" :label-width="formLabelWidth" prop="psw">
        <el-input v-model.trim="formData.psw" type="password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('toolbar.newPsw')" :label-width="formLabelWidth" prop="psw1">
        <el-input v-model.trim="formData.psw1" type="password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('toolbar.confirmPsw')" :label-width="formLabelWidth" prop="psw2">
        <el-input v-model.trim="formData.psw2" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  export default{
    name:"PswForm",
    data(){
      var validatePsw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('toolbar.plsOldPsw')));
        }else{
          callback();
        }
      };
      var validatePsw1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('toolbar.plsNewPsw')));
        }else if(value.length<6||value.length>12){
          callback(new Error(this.$t('toolbar.pswLimit')));
        } else {
          if (this.formData.psw2 !== '') {
            this.$refs.formData.validateField('psw2');
          }
          callback();
        }
      };
      var validatePsw2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('toolbar.plsNewPswAgain')));
        } else if (value !== this.formData.psw1) {
          callback(new Error(this.$t('toolbar.notSame')));
        }else {
          callback();
        }
      };
      return {
        formData:{
          psw:"",
          psw1:"",
          psw2:"",
        },
        rules:{
          psw: [{  validator: validatePsw, trigger: 'blur' }],
          psw1: [{  validator: validatePsw1, trigger: 'blur' }],
          psw2: [{  validator: validatePsw2, trigger: 'blur' }],
        },
        formLabelWidth:"100px",
      }
    },
    methods:{
      setFormData(){
        this.$refs.formData.resetFields();
        this.formData.psw="";
        this.formData.psw1="";
        this.formData.psw2="";
      },
      validate(){
        var v;
        this.$refs.formData.validate((valid) => {
          v=valid;
        });
        return v;
      }
    }
  }
</script>

