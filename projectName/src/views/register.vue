<template>
<div class="background" :style="background">

  <div class="userlogin" >
<div class="user-login loginscreen bg-white container" >
     <div class="login-title text-center">
    <h1 style="color:red">用户注册</h1>
  </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
       
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input type="password" v-model="ruleForm.checkpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telphone">
          <el-input v-model="ruleForm.telphone"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="商店名称" prop="shopname">
          <el-input v-model="ruleForm.shopname"></el-input>
        </el-form-item>

        <el-form-item  label="验证码" prop="smscode" class="inventoryRecord">
            <el-input class="log-input" v-model="ruleForm.smscode" placeholder="请输入验证码" style="width:240px;float:left">

            </el-input>
            <div @click="changeCode()" style="float:right;margin-right:0px">
              <identify :identifyCode="identifyCode"></identify>
            </div>

          </el-form-item>
        <h6 style="margin-top:-20px;margin-right:-325px">看不清?点击图片换下一张</h6>
      </el-form>
    
       <el-row>  
         
         <el-button  @click="submitForm('ruleForm')">注册</el-button>
         <el-button @click="resetForm('ruleForm')">重置</el-button>
         <p class="login" @click="gotoLogin">已有账号？立即登录</p>
      </el-row>
   
  </div>
  </div>
    </div>
</template>

<script>

import identify from './indentify.vue'
export default {
    name:"inventoryRecord",
    components:{identify},
  data() {
    //用户名验证
    var checkUsername = function(rule, value, callback) {
         var regExp=/^[\u4e00-\u9fa5]{2,4}$/;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if(regExp.test(value) === false){
        callback(new Error('请按格式输入用户名'))
      }
      
      else {
        callback();
      }
    };
    //电话验证
    var checkTelphone = function(rule, value, callback) {
         var regExp = /^1[3|5|8|7][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话不能为空"));
      }else if (regExp.test(value) === false) {
      callback(new Error('请输入正确手机号码'))
    } 
      
      else {
        callback();
      }
    };
       //  <!--验证码是正确-->
     var validateCode =(rule,value,callback) =>{
       if(value==""){
          return callback(new Error("验证码不能为空"));
       }
       else if(this.identifyCode!==value){
        this.ruleForm.smscode = ''
          this.changeCode()
        callback(new Error('请输入正确的验证码'))
      }else{
        callback()
      }
    }

    //商店名称验证
    var checkShopname = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("商店名称不能为空"));
      } else {
        callback();
      }
    };

    //地址验证
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地址不能为空"));
      } else {
        callback();
      }
    };
    //密码一次验证
    var validatePass = (rule, value, callback) => {
         var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } 
      
      else if (regExp.test(value) === false) {
        callback(new Error('8-16字母和数字组成，不能是纯数字或纯英文'))}
        else {
        if (this.ruleForm.checkpassword !== "") {
          this.$refs.ruleForm.validateField("checkpassword");
        }
        callback();
      }
    };
    //密码二次验证
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };


    //

    return {
         background: {
        backgroundImage:'url(' + require('../assets/gg.gif') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'
         },


        identifyCode:'1234',
        identifyCodes:'1234567890',
        ruleForm: {
        username: "",
        password: "",
        checkpassword: "",
        address: "",
        telphone: "",
        shopname: "",
        smscode: "",
        
      },


      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
        shopname: [{ validator: checkShopname, trigger: "blur" }],
        telphone: [{ validator: checkTelphone, trigger: "blur" }],
         
        address: [{ validator: checkAddress, trigger: "blur" }],
        smscode: [{ validator: validateCode, trigger: 'blur' }],
      },
        checked:false,
    };
  },

  methods: {
            changeCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
        // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum (min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode (data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
      
    },

    //注册方法
    register() {
     this.$axios({
        method: "POST",
        url: "http://www.wxhwg.com:8080/mock/api/user/add",
        data: this.$qs.stringify({
          userUserName: this.ruleForm.username,
          userPassword: this.ruleForm.password,
          userTelphone: this.ruleForm.telphone,
          userAddress: this.ruleForm.address,
          userShopName: this.ruleForm.shopname
        })
      })
        .then(function(response) {
       console.log(response);
          alert(response.data.message);
        })
        .catch(function(error) {
           console.log(error);
          alert(response.data.message);
        });
    },
 submitForm(formName){
              this.$refs[formName].validate(valid => {
        if (valid) {
            this.register();
        } else {
          alert("请按照正确格式填写信息")
          return false;
        }
          });
    },
// 注册成功跳转页面
     gotoLogin() {
      this.$router.push({
        path: "/userlogin"
      });
    },
       
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    created(){
        this.changeCode()
      },

}
}

</script>
<style scoped>
.background{height: 850px}
.container {
    padding-right: 30px;
    padding-left: 30px;
    margin-right: auto;
    margin-left: auto;
    
}
.bg-white{
    background-color: #0cf0b7;
    background-size: 500px 500px;
    opacity: 0.8;
}
.user-login{
    max-width: 450px;
   
    margin-top: 60px;
    z-index: 108;
    margin: 0 auto;
    padding-bottom: 50px;
  
}
.loginscreen .user-login{
    width: 100px;
}

.login-title{
	height:60px;
	padding:30px;
	font-weight:bold;
}
.login-header{
  height:300px;
}
.login-logo{
	margin-top:100px;
}




</style>


