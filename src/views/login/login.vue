<template>
  <div id="login">
    <div class="form-ct">
      <!--<div class="lang-ct">-->
        <!--<lang-select></lang-select>-->
      <!--</div>-->
      <!--<div class="action-btn" @click="actionType=!actionType">{{actionType?"没有账号？注册一个":"直接登陆"}}</div>-->
      <el-form v-if="actionType"  :model="formData" status-icon :rules="rules" ref="loginForm">

        <el-form-item  prop="account">
          <svg-icon icon-class="user" ></svg-icon>
          <el-input  v-model="formData.account" @focus="error=''" @keyup.enter.native="login()" autofocus></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <svg-icon icon-class="lock"></svg-icon>
          <el-input type="password" v-model="formData.password" @focus="error=''" @keyup.enter.native="login()"></el-input>
        </el-form-item>
        <el-form-item class="btn-ct">
          <el-button type="primary" @click="login()">
            <span v-if="onLogin"><i class="el-icon-loading"></i>&emsp;{{$t("login.onLogin")}}</span>
            <span v-else>{{$t("login.login1")}}&emsp;&emsp;{{$t("login.login2")}}</span>
          </el-button>
        </el-form-item>
      </el-form>

      <!--<el-form v-else :model="formData" status-icon :rules="rules" ref="loginForm">-->
      <!--<el-form-item  prop="account">-->
      <!--<el-input  v-model="formData.account" auto-complete="off" prefix-icon="el-icon-search"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item  prop="password">-->
      <!--<el-input type="password" v-model="formData.password" auto-complete="off" prefix-icon="el-icon-search"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item  prop="password">-->
      <!--<el-input type="password" v-model="formData.password" auto-complete="off" prefix-icon="el-icon-search"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="btn-ct">-->
      <!--<el-button type="primary" @click="login()">注&emsp;&emsp;册</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
    </div>
    <canvas id="loginBg"></canvas>
  </div>

</template>
<script>
  import LangSelect from '@/components/LangSelect'
  import {encrypt} from '@/utils/crypto'
  import $t from '@/utils/$t'

  export default{
    components: { LangSelect },
    data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t("login.account")));
        } else {
          if (this.formData.password !== '') {
            this.$refs.loginForm.validateField('password');
          }
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if(this.error){
          callback(new Error(this.error));
        }else{
          if (value === '') {
            callback(new Error(this.$t("login.psw")));
          } else{
            callback();
          }
        }
      };
      return {
        actionType:true,   //true 登陆 false 注册
        onLogin:false,
        error:'',
        formData:{
          account: '',
          assword: '',
        },
        rules: {
          account: [{  validator: validateAccount, trigger: 'blur' }],
          password: [{  validator: validatePassword, trigger: 'blur' }],
        },
      }
    },
    methods:{
      login(){
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.onLogin=true;
            var obj={}
            obj.account=this.formData.account;
            obj.password=encrypt(this.formData.password);
            this.$store.dispatch('Login', obj).then(()=>{
              this.$router.push({ path: '/' })
            })
            .catch(error=>{
              console.log(error)
              if(error.code===3000||error.code===3004){
                this.error=$t(error.code.toString());
              }else {
                this.error=this.$t("login.fail")
              }
              this.$refs.loginForm.validateField('password');
              this.onLogin=false;
            })
          }else{
            this.onLogin=false;
            return
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  #login{
    height: 100vh;
    background: #2d3a4b;
    display: flex;
    align-items: center;
    .lang-ct{
      position: relative;
      z-index: 999;
      margin-bottom: 40px;
      >div{
        position: absolute;
        width:30px;
        right: 0;
        .svg-icon{
          color:#fff;
          float: right;
        }
      }
    }
    .form-ct{
      width:500px;
      margin:0 auto;
      padding-bottom: 300px;
      .el-form{
        .el-form-item{
          position: relative;
          z-index:99;
          .svg-icon{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            margin-left:10px;
            z-index: 1;
          }
          .el-input input{
            display: inline-block;
            height: 50px;
            padding-left:40px;
          }
        }
        .btn-ct{
          button{
            width:100%;
          }
        }
      }
    }
  }
  #loginBg{
    position: absolute;
    z-index:0;
  }
</style>
