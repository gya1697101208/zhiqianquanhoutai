<template>
<div class="entirety">
  <div class="container">
    <div class="login">
      <div class="title">
        <h2>用户登陆</h2>
      </div>
      
      <div class="container-nav">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
      <div class="log">
        <el-form-item prop="name">
        <el-input class="username" v-model="ruleForm.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
      </div>
      <div class="pas">
        <el-form-item prop="password">
        <el-input show-password class="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
      </div>
      <div class="code">
        <el-form-item prop="verifycode">
          <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码" class="verifycode"></el-input>
          <div class="identifybox" @click="refreshCode">
              <identify :identifyCode="identifyCode"></identify>
            </div>
          </el-form-item>
        </div>
      </el-form>
      </div>


      <div class="btn">
        <el-button class="btnLog" type="warning" @click="btnlogin()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</el-button>
        <el-button class="btnRes" type="warning" @click="btnRes()" plain>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </div>
      <div class="divider">
        <el-divider content-position="left"><span>其他方式登陆</span></el-divider>
      </div>
      <div class="other">
        
      </div>
    </div>
    </div>
  
</div>
</template>
<script>
import  identify  from  '@/components/identify.vue'
export default {
  name: "search",
  components: {
    identify
  },
  data() {
    //避免全局变量的污染
    return {
      fontstyle:{

      },
      ruleForm:{
        name:"",
        password:"",
        verifycode:"",
      },
      identifyCodes:'1234567890',
      identifyCode:'',
      rules:{
        name:[
          { required:true, message:'请输入用户名',trigger:'blur'},
          { min:2, max:11, message:'长度在2-11个字符',trigger:'blur'}
        ],
        password:[
           { required:true, message:'请输入密码',trigger:'blur'},
          { min:6, max:15, message:'长度在6-15个字符',trigger:'blur'}
        ],
        verifycode:[
          { required:true, message:'请输入验证码',trigger:'blur'},
          { min:4, max:4, message:'长度为4个字符',trigger:'blur'}
        ]
      }
    };
  },
  create(){

  },
  //验证码初始化
  mounted(){
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
  
    btnlogin() {
      if(this.ruleForm.name===""||this.ruleForm.password===""){
        this.$alert("用户名或者密码不能为空！")
      }else if(this.ruleForm.verifycode === ""){
        this.$alert("验证码不能为空！")
      }else if(this.ruleForm.verifycode !== this.identifyCode){
        this.$alert("验证码输入不正确，请重新输入！")
      }
      else{
      let params = this.$qs.stringify({
        userName: this.ruleForm.name,
        password: this.ruleForm.password,
      });
  
      this.$axios
        .post("http://localhost/api/admin/login", params)
        .then(response => {
            
          let result = response.data;
          alert(result.status)
          if (result.status == 200) {
       
            this.$router.push({ name: "home" ,query:{user:result.data}});
            localStorage.setItem('uid',result.data.userId);
            window.sessionStorage.setItem('userId',result.data.userId)
         
          } else if (result.status == 404) {
            this.$alert("用户名或密码错误","警告");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  
      }
    },
    //生成随机数
    randomNum(min,max){
      return Math.floor(Math.random()*(max-min)+min)
    },
    //切换验证码
    refreshCode(){
      this.identifyCode = ''
      this.makeCode(this.identifyCodes,4)
    },
    //生成四位随机验证码
    makeCode(o,l){
      for(let i = 0;i < l;i++){
        this.identifyCode += this.identifyCodes[
          this.randomNum(0,this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
    btnRes(){
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style scoped>
.entirety{
  position: relative;
  width:1520px;
  height:800px;
  /*display: table;*/
}
.entirety1{
  position: relative;
  background-color:#F5F5F5;
  width:1905px;
  height:957px;
  background-image: url("../assets/timg2.jpg")
}
.container{
  /*display: table-cell;
  vertical-align: middle;*/
  position: absolute;
  width:1520px;
  height:550px;
  /*background-color: #9370DB;*/
  margin:100px 0;
  padding-right:400px;
  background-image: url("../assets/background7.jpg")

}
.login {
  width: 400px;
  height:500px;
  border-radius: 6px;
  background-color: white;
  margin-top:25px ;
  float:right;
}
.title{
  color: #708090;
  padding-bottom: 5px;
  
}
.log{
  margin-top:15px;
  margin-bottom:5px;

}
.username {
  width: 350px;
}
.password {
  width: 350px;
}
.code{
  width:350px;
  padding-left:25px;
  padding-right:25px;
}
.verifycode{
  width:200px;
  float:left;
  margin-right:25px;
}
.identifybox{
  display: flex;
}
.textbtn{
  width:165px;
  float:right;
  margin-top:18px;
}
.btn{
  margin-top:10px;
}
.btnLog{
  margin-right: 80px;
}
.divider{
  color:#A9A9A9;
  margin-top: 45px;
}
.divider span{
  color:#A9A9A9;
  font-size: 14px;
}
.other{
  width:250px;
  height: 49px;
  margin: auto;

}
</style>