<template>
    <div>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="所在城市">
                    <span>{{ props.row.user.userName }}</span>
                </el-form-item>
                <el-form-item label="所在城市">
                    <span>{{ props.row.houseAtcity }}</span>
                </el-form-item>
                <el-form-item label="区域">
                    <span>{{ props.row.houseRegion }}</span>
                </el-form-item>
                <el-form-item label="房源详情">
                    <el-popover
                      placement="top-start"
                      width="300"
                      trigger="hover">
                      <span>{{ props.row.houseDescribe }}</span>
                      <el-button slot="reference">详情内容</el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-popover
                      placement="top-start"
                      width="300"
                      trigger="hover">
                      <span>{{ props.row.housePost }}</span>
                      <el-button slot="reference">地址内容</el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item label="房源图片">
                        <img :src="web_static+props.row.chart.imageName" alt height="50px" />
                </el-form-item>
                 
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="房源标题"
            prop="houseTitle">
            </el-table-column>
            <el-table-column
            label="房源类型"
            prop="housePeople">
            </el-table-column>
            <el-table-column
            label="房源户型"
            prop="houseType">
            </el-table-column>
            <el-table-column
            label="房源价格"
            prop="housePrice">
            </el-table-column>
            
            <el-table-column
            label="操作">
            <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle 
            @click.native.prevent="deleterow(scope.$index,scope.row.houseId,list)"
            ></el-button>
             </template>
            </el-table-column>
            
        </el-table>
        <el-pagination
        layout="prev, pager, next"
        :total="total"
         @current-change="handleCurrentChange">
        </el-pagination>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        web_static: "http://10.96.116.67:8081/static/",
        pageNum:'',
        pageSize:'',
        size:'',
        pages:'',
        total:'',
        list:''
      }
    },
    props:{},
    created(){
      this.once();
  },
  methods:{
      once(){
          this.$axios.get("http://localhost/api/house/list",{
              params:{
                pageNum:this.pageNum,
                pageSize:7
              }
          }).then(response=>{
              let result=response.data;
              if(result.status=="200"){
                  this.list=result.data.list
                  this.total=result.data.total
                  this.pageNum=result.data.pageNum
              }
          })
      },
      handleCurrentChange(val){
            this.pageNum=val;
            this.once();
      },
      deleterow(index,houseID,list){
        this.$axios.get("http://localhost/api/house/admin/delete",{
          params:{
            houseId:houseID
          }
        }).then(response=>{
          let result=response.data;
          if(result.status=="200"){                   
            list.splice(index,1);
          }
        })
      }
  }

  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
    
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>