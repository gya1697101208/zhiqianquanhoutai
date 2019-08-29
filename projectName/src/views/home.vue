<template>

<el-container>

  <el-aside width="200px">
    
<router-link :to="{path:'/api/userlogin'}" > <el-button type="success"  icon="el-icon-thumb" circle style="float:left"></el-button></router-link>
<div id="a1">
   
  <br>   <br>  <br>  <br>   <br> <br>    
   <img src="../assets/img4.png" alt="tupian" height="100px" id="a2"/>
    <br> <br>  
  用户名：
  {{user.name}}
  <br>  <br>  
  用户密码：
  {{user.password}}
  <br> <br>  
  用户姓名：{{user.realname}}
  <br>  <br>  
  用户年龄：{{user.age}}
  <br>  <br>  
  用户爱好：{{user.hobby}}
  <br>  <br>  
  用户微信：{{user.vx}}
  <br>  <br>  
  用户备注：{{user.describe}}

</div>
  </el-aside>

  <el-container>
     
    <el-header>  
      <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#000000"
  collapse-transition =true
  text-color="#fff"
  active-text-color="#ffd04b"
  router=true>
  <el-menu-item route="/home/1"  @click=routes() index="1">我的中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>   
    <el-menu-item route="/home/2-1"  index="2-1">职位</el-menu-item>
    <el-menu-item route="/home/2-2" index="2-2">职言</el-menu-item>
    <el-menu-item route="/home/2-3" index="2-3">社区</el-menu-item>
    <el-submenu >
      <template slot="title">住房</template>
      <el-menu-item route="/home/2-4-1" index="2-4-1">房源</el-menu-item>
      <el-menu-item route="/home/2-4-2" index="2-4-2">求租</el-menu-item>     
    </el-submenu>
  </el-submenu>
  <el-menu-item  route="/home/3" index="3" >用户管理中心</el-menu-item>
 
</el-menu>
</el-header>
<el-card class="box-card" :body-style="{ padding: '1px' }" :shadow="always">
    <el-main>      
      <router-view/>
    </el-main>
</el-card>
  </el-container>
</el-container>

</template>



<script>
export default {
    data(){
        return{
           
   
            list: "",
            user:this.$route.query.user,
         
        }
    },
    created() {
  
    },
    methods: {
  routes(){
 this.$router.push({ name: "my" ,query:{user:this.user}});
  }
    },

}
</script>




<style scoped>

 .el-header, .el-footer {
    background-color: rgb(8, 8, 8);
    color: rgb(240, 245, 245);
    text-align: center;
    line-height: 60px;
   width: 1319px;
   float: left;
    
  }
  
  .el-aside {
    background-color: rgb(0, 0, 0);
    color: rgb(245, 245, 245);
    text-align: center;
    height:650px;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 588px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

    .B {
    width: 150px;
    height: 250px;
    float: left;
    margin-top: 100px;
    margin-right: 15px
  }

  .B li {
    width: 150px;
    height: 30px;
    text-align: left
  }
  #a1{
    text-align: left;
  }
#a2{
padding-left:40px;

}
</style>
