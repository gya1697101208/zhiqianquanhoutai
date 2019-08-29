<template>
<div>
<el-form :label-position="labelPosition" label-width="80px" :model="user">

  <el-form-item label="用户名">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
  <el-form-item label="用户密码">
    <el-input v-model="user.password"></el-input>
  </el-form-item>
    <el-form-item label="用户姓名">
    <el-input v-model="user.realname"></el-input>
  </el-form-item>
    <el-form-item label="用户年龄">
    <el-input v-model="user.age"></el-input>
  </el-form-item>
      <el-form-item label="用户爱好">
    <el-input v-model="user.hobby"></el-input>
  </el-form-item>
      <el-form-item label="用户微信">
    <el-input v-model="user.vx"></el-input>
  </el-form-item>
        <el-form-item label="用户备注">
    <el-input v-model="user.describe"></el-input>
  </el-form-item>
<el-button type="primary" @click=updateadminbyid()>确认修改</el-button>
</el-form>

</div>

</template>


<script >
var web="http://localhost"
export default{
name:'my',
data(){
  return{
  user:this.$route.query.user
  }
},
created(){

},
methods:{
     updateadminbyid(){
       alert("1")
       var self = this;     
      this.$axios
        .get("http://localhost/api/user/updateadminbyid", {
          params: {
              id:this.user.id,
              name:this.user.name,
              password:this.user.password,
              realname:this.user.realname,
              age:this.user.age,
              hobby:this.user.hobby,
              vx:this.user.vx,
              describe:this.user.describes
          }
        })
        .then(response => {
             alert("2")
          let result = response.data;
      
          if (result.status == 200) {
              alert("修改成功")
          }
        })
        .catch(error => alert(error));
           
     }

}
}

</script>
<style scoped>
.clearfix{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>



