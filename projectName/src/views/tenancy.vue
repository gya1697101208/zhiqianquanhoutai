<template>
<div>
 <el-table
      :data="list"
      style="width: 100%">
     
      <el-table-column
        prop="userId"
        label="用户ID"
        width="90">
      </el-table-column>
            <el-table-column
        prop="tenancyType"
        label="求租类型">
      </el-table-column>
      <el-table-column
        prop="tenancy_Requestsex"
        label="合租性别要求">
      </el-table-column>
    <el-table-column
        prop="tenancyPrice"
        label="期望价格">
      </el-table-column>
            <el-table-column
        prop="tenancyPhone"
        label="联系方式">
      </el-table-column>
    <el-table-column
        prop="tenancyLabel"
        label="公司标签">
      </el-table-column>
     <el-table-column
        prop="tenancyStatus"
        label="状态">
      </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="130">
      <template slot-scope="scope" >
        <el-button type="text" @click=open(scope.$index); size="small">查看</el-button>
        <el-button type="text"  @click=deletes(scope.$index); size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

<el-dialog title="求租消息" :visible.sync="dialogFormVisible">
  <el-form :model="this.tenancy">
        <el-form-item label="求租类型" >
      <el-input v-model="this.tenancy.tenancyType" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="合租性别要求" >
    <el-select v-model="this.tenancy.tenancy_Requestsex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
        <el-form-item label="期望价格" >
      <el-input v-model="this.tenancy.tenancyPrice" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="联系方式" >
      <el-input v-model="this.tenancy.tenancyPhone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="求租城市" >
      <el-input v-model="this.tenancy.tenancyCity" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="求租区域" >
      <el-input v-model="this.tenancy.tenancyRegion" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="求租地点" >
      <el-input v-model="this.tenancy.tenancyPosition" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="入住时间" >
      <el-input v-model="this.tenancy.tenancyCity" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="公司标签" >
      <el-input v-model="this.tenancy.tenancyLabel" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="入住时间" >
      <el-input v-model="this.tenancy.tenancyLivetime" :value="tenancy.tenancyLivetime" autocomplete="off"></el-input>
    </el-form-item>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

<el-dialog
  title="提示"
  :visible.sync="dialogVisiblesss"
  width="30%"
  :before-close="handleClose">
  <span>确定删除吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisiblesss = false">取 消</el-button>
    <el-button type="primary" @click=deletetenancy()>确 定</el-button>
  </span>
</el-dialog>
 <div class="clearfix">
       <el-pagination
      small
      :page-count="pages"
      layout="prev, pager, next"
      @current-change="chanindexpage"
    ></el-pagination>
    </div>
</div>

</template>


<script >
var web="http://localhost:80"
export default{
name:'tenancy',
data(){
  return{
  list:"",
 dialogFormVisible:false,
 tenancy:"",
 dialogVisiblesss:false,
 tenancyIdd:"",
 indexx:"",
 pages:""
  }
},
created(){
this.selectalltenancy();
},
methods:{
     deletetenancy(){
              var self=this
           
         this.$axios.get(web+"/api/tenancy/deletetenancy",{
            params:{
                tenancyId:self.tenancyIdd,
                userId:self.list[self.indexx].userId
            }
            }).then(response=>{
      
                        let  result =response.data;
                        if(result.status=="200"){
                        self.dialogVisiblesss=false;
                         self.list.splice(self.indexx,1)
                       
                        }
                }).catch(error=>{

                })

    },
   selectaonetenancy(index){
     
         this.$axios.get(web+"/api/tenancy/selecttenancyID",{
            params:{
                tenancyId:this.list[index].tenancyId
            }
            }).then(response=>{
      
                        let  result =response.data;
                        if(result.status=="200"){
                        this.tenancy=result.data;
                       
                        }
                }).catch(error=>{

                })

    },
 selectalltenancy(){
 
        this.$axios.get(web+"/api/tenancy/findall",{
            params:{

            }
            }).then(response=>{
                
                        let  result =response.data;
                        if(result.status=="200"){
                            this.list=result.data.list;
                            this.pages=result.data.pages;
                    
                        }
                }).catch(error=>{

                })

    },
    open(index){
      this.dialogFormVisible=true;
      this.selectaonetenancy(index);
    },
    deletes(index){
      
      this.dialogVisiblesss=true;
      this.tenancyIdd=this.list[index].tenancyId;
      this.indexx=index;
    },
       chanindexpage(val) {
      this.pageNum = val;
      this.init();
    },

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



