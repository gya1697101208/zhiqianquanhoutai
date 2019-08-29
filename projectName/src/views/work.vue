<template>
  <div>

     
  <div slot="header" class="clearfix">
    <el-select v-model="type" clearable  placeholder="请输入领域">
            <el-option v-for="item in types"  :key="item.workType" :label="item.workType" :value="item.workType">
            </el-option>
        </el-select>
        <el-select v-model="posttype" clearable  placeholder="请输入工作类别">
            <el-option v-for="item in posttypes"  :key="item.workPostType" :label="item.workPostType" :value="item.workPostType">
            </el-option>
        </el-select>
          <el-select v-model="city" clearable  placeholder="请输入实习所在城市">
            <el-option v-for="item in citys"  :key="item.workCity" :label="item.workCity" :value="item.workCity">
            </el-option>
        </el-select>
       <el-input placeholder="模糊搜索公司" v-model="company" style="width:200px" clearable></el-input>
       <el-button type="primary" plain @click="init">搜索</el-button>
  </div>
<br/>
    <el-table :data="list" height="450" style="width: 100%">
      <el-table-column prop label="查看其他信息" width="120">
        <template slot-scope="scope">
          <el-popover placement="right" width="400" trigger="click">
            <p>
              招聘信息id：{{workid.workId}}
              <br />
              发布人id：{{workid.userId}}
              <br />
              发布时间：{{workid.workData}}
              <br />
              邮箱：{{workid.workEmail}}
              <br />
              简历：{{workid.workResume}}
            </p>
            <el-button type="danger" @click="deletework(scope.row.workId)">删除</el-button>
            <el-button
              slot="reference"
              icon="el-icon-s-order"
              type="info"
              @click="workId(scope.row.workId)"
              plain
            ></el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="workType" label="所属领域" width="90"></el-table-column>
      <el-table-column prop="workImage" label="图片" width="90">
        <template slot-scope="scope">
          <img :src="web_static+scope.row.workImage" alt height="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="workCompanyName" label="公司名" width="90"></el-table-column>
      <el-table-column prop="workPostName" label="职位名称" width="90"></el-table-column>
      <el-table-column prop="workPostType" label="职位类型" width="90"></el-table-column>
      <el-table-column prop="workCity" label="实习所在城市" width="120"></el-table-column>
      <el-table-column prop="workEntry" label="是否尽快入职" width="120">
            <template slot-scope="scope">
            <div v-if="scope.row.workEntry==1">是</div>
            <div v-if="scope.row.workEntry==0">否</div>
          </template>
      </el-table-column>
      <el-table-column prop="workCycle" label="实习周期" width="90"></el-table-column>
      <el-table-column prop="workAddress" label="住址" width="120"></el-table-column>
      <el-table-column prop="workDesride" label="描述" width="150"></el-table-column>
      <el-table-column prop="workStatus" label="状态" width="90">
            <template slot-scope="scope">
            <div v-if="scope.row.workStatus==1">有效</div>
            <div v-if="scope.row.workStatus==0">无效</div>
          </template>
      </el-table-column>
    </el-table>
    <div id="div">
      <el-pagination
      small
      :page-count="pages"
      layout="prev, pager, next"
      @current-change="chanindexpage"
    ></el-pagination>
    </div>


     <!-- <div class="header">
          
     </div> -->
    
    
  </div>
</template>
<script>
var url = "http://localhost:80";
export default {
  data() {
    return {
      pageNum: "",
      list: "",
      web_static: "http://localhost:80/static/",
      workid: "",
      pages: "",
      types:"",
      type:"",
      posttypes:"",
      posttype:"",
      citys:"",
      city:"",
      company:""
    };
  },
  created() {
    this.init();
    this.querytypes();
    this.queryposttypes();
    this.querycitys()
  },
  methods: {
    init() {
      var self = this;
      this.$axios
        .get(url + "/api/work/queryvague", {
          params: {
            pageNum: self.pageNum,
            worktype:self.type,
          workposttype: self. posttype,
           workcity: self.city,
            company:self.company
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.list = result.data.list;
            self.pageNum = result.data.pageNum;
            self.pages = result.data.pages;
          }
        })
        .catch(error =>this.$message.error(error));
    },
    workId(workId) {
      var self = this;
      this.$axios
        .get(url + "/api/work/ById", {
          params: {
            workid: workId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.workid = result.data[0];
          }
        })
        .catch(error => this.$message.error(error));
    },
    deletework(workId) {
      var self = this;
      this.$axios
        .get(url + "/delete/work/release", {
          params: {
            workid: workId
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.init();
          }
        })
        .catch(error => this.$message.error(error));
    },
    up() {
      if (this.pageNum > 1) {
        this.pageNum = parseInt(this.pageNum) - 1;
        // this.inputnum = parseInt(this.inputnum) - 1;
        this.init();
      } else {
         this.$message({
          message: '已经是第一页',
          type: 'warning'
        });
      }
    },
    down() {
      if (this.pageNum < this.pages) {
        this.pageNum = parseInt(this.pageNum) + 1;
        //this.inputnum = parseInt(this.inputnum) + 1;
        this.init();
      } else {
          this.$message({
          message: '已经是最后一页',
          type: 'warning'
        });
      }
    },
     querytypes() {
      var self = this;
      this.$axios
        .get(url + "/api/work/type", {
          params: {
            
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.types=result.data;
          }
        })
        .catch(error =>this.$message.error(error));
    }, 
    queryposttypes() {
      var self = this;
      this.$axios
        .get(url + "/api/work/posttype", {
          params: {
            
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.posttypes=result.data;
          }
        })
        .catch(error => this.$message.error(error));
    },
    querycitys() {
      var self = this;
      this.$axios
        .get(url + "/api/work/city", {
          params: {
            
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.citys=result.data;
          }
        })
        .catch(error =>this.$message.error(error));
    }, chanindexpage(val) {
      this.pageNum = val;
      this.init();
    },

  }
};
</script>
<style scoped>
.header{
    display: flex;
    justify-content: center;
    align-items: center;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
.clearfix{
    display: flex;
    justify-content: center;
    align-content: center;
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
   min-height: 800px;
  }
#div {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>