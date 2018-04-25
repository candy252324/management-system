<template>
  <div>
    <div class="navbar">
      <div class="left">
        <hamburger  class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
      </div>
      <div class="right">
        <!--<timer class="timer"></timer>-->
        <!--<lang-select class="lang navbar-item"></lang-select>-->
        <screenfull class="screenfull navbar-item"></screenfull>
        <color-picker class="navbar-item"></color-picker>

        <el-button v-if="isGuest" type="primary" size="mini" class="navbar-item" @click="login">登陆</el-button>
        <el-dropdown v-else class="navbar-item" @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <img :src="avatar">&ensp;
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">{{$t('toolbar.info')}}</el-dropdown-item>
            <el-dropdown-item command="2">{{$t('toolbar.changePsw')}}</el-dropdown-item>
            <el-dropdown-item divided command="3">{{$t('toolbar.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      width="800px"
      append-to-body
      :visible.sync="showInfo"
      :close-on-click-modal=false>
      <information ref="InfoForm"></information>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showInfo = false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="changeInfo">{{$t('form.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="500px"
      append-to-body
      :visible.sync="showPsw"
      :close-on-click-modal=false>
      <change-psw-dialog  ref="PswForm"></change-psw-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showPsw = false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="changePsw">{{$t('form.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>

  import Hamburger from '@/components/Hamburger'
  import Breadcrumb from '@/components/Breadcrumb'
  import LangSelect from '@/components/LangSelect'
  import Screenfull from '@/components/Screenfull'
  import ColorPicker from '@/components/colorPicker'
  import Information from '@/views/personal/Information'
  import ChangePswDialog from '@/views/personal/changePsw'

  //import {changePsw} from '@/api/account' //引入api中的方法，导致其它页面空白，故而提交操作都dispatch到store中处理
  import {encrypt} from '@/utils/crypto'

  export default {
    data(){
      return{
        showInfo:false,   //个人信息
        showPsw:false,   //修改密码
        formLabelWidth:80,
      }
    },
    computed:{
      isGuest(){
        var grade=this.$store.getters.roleGrade
        return !(typeof(grade)==="number" && grade>=0);
      },
      sidebar(){
        return this.$store.getters.sidebar;
      },
      userName(){
        return this.$store.getters.userInfo.NickName||this.$store.getters.userInfo.WorkId;
      },
      avatar(){
        return this.$store.getters.userInfo.Avatar||this.$store.getters.defaultAvatar;
      }
    },
    methods:{
      login(){
        this.$router.replace("/login");
      },
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      handleCommand(command){
        switch (command){
          case "1":
            this.showInfo=true;
            this.$nextTick(() => {
              this.$refs.InfoForm.setFormData();
            });
            break;
          case "2":
            this.showPsw=true;
            this.$nextTick(() => {
              this.$refs.PswForm.setFormData();
            });
            break;
          case "3":
            this.$confirm("确认退出吗？","提示",{type:"warning"}).then(()=>{
              this.$store.dispatch('LogOut').then(() => {
                location.reload()   //防止路由重复挂载
              })
            }).catch(()=>{})
            break;
        }
      },
      changePsw(){
        if(!this.$refs.PswForm.validate()) return;
        var Password=encrypt(this.$refs.PswForm.formData.psw);
        var NewPassword=encrypt(this.$refs.PswForm.formData.psw1);
        var obj={ Password,NewPassword}
        this.$store.dispatch("ChangePsw",obj).then(()=>{
          this.showPsw=false;
          this.$store.dispatch('FedLogOut').then(() => {
            this.$router.replace("/login")
          })
        }).catch(err=>{
          console.log(err)
        })
      },
      changeInfo(){
        if(!this.$refs.InfoForm.validate()) return;
        var formData=this.$refs.InfoForm.formData;
        formData.Avatar=this.$refs.InfoForm.imageUrl;
        this.$store.dispatch("ChangeInfo",formData).then(()=>{
          this.showInfo=false;
          this.$store.dispatch("getUserInfo",formData).then(()=>{

          })
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    components:{
      Hamburger,
      Breadcrumb,
      LangSelect,
      Screenfull,
      ColorPicker,
      Information,
      ChangePswDialog,
    }
  }
</script>
<style lang="scss" scoped>
  .navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .left{
      display: flex;
      align-items: center;
      margin-left:15px;
    }
    .right{
      display: flex;
      align-items: center;
      .timer{
        margin-right:30px;
      }
      .navbar-item{
        margin:0 10px;
        .el-dropdown-link{
          display: flex;
          align-items: center;
        }
      }
      .lang{
        width:auto;
      }
      img{
        width:40px;
        height: 40px;
        border-radius: 5px;
      }
    }
  }
</style>
