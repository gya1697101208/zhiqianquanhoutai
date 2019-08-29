<template>
  <div>
    <template>
        <div class="clearfix">
            <el-input placeholder="精确搜索群ID" v-model="group_id" style="width:200px" clearable></el-input>
            <el-input placeholder="模糊搜索群名" v-model="group_name" style="width:200px" clearable></el-input>
            <el-button type="primary" plain @click="lalal">搜索</el-button>
        </div>
        <br/>
      <el-table :data="list" style="width: 100%">
        <el-table-column label="社区图片" prop="groupImage">
          <template slot-scope="scope">
            <img :src="web_static+scope.row.groupImage" alt height="50px" />
          </template>
        </el-table-column>
        <el-table-column label="社区名字" prop="groupName"></el-table-column>
        <el-table-column label="社区人数" prop="number"></el-table-column>
        <el-table-column label="社区描述" prop="groupCooment"></el-table-column>
        <el-table-column prop label="查看其他信息" width="120">
          <template slot-scope="scope">
            <el-popover placement="right" width="400" trigger="click">
              <p>社区ID：{{scope.row.groupId}}</p>
              <h3>创建人信息</h3>
              <p>
                创建人图片：
                <img :src="web_static+usermagess.userImage" alt height="50px" />
              </p>
              <p>创建人姓名：{{usermagess.userName}}</p>
              <p>创建人性别：{{usermagess.userSex}}</p>
              <p>创建人微信：{{usermagess.userVx}}</p>
              <p>创建人邮箱：{{usermagess.userEmail}}</p>
              <p>创建人毕业院校：{{usermagess.userSchool}}</p>
              <p>创建人公司：{{usermagess.userCompany}}</p>
              <p>创建人职位：{{usermagess.userPost}}</p>
              <p>
                创建人职位照片：
                <img :src="web_static+usermagess.userPostImage" alt height="50px" />
              </p>
              <p>创建人状态：{{usermagess.userStatus}}</p>
              <br />
              <el-button type="danger" @click="deletegroup(scope.row.groupId)">删除</el-button>
              <el-button
                slot="reference"
                icon="el-icon-s-order"
                type="info"
                @click="lookfounderUser(scope.row.founderUser)"
                plain
              ></el-button>
            </el-popover>
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
    </template>

  </div>
</template>
<script>
var url = "http://localhost:80";
export default {
  data() {
    return {
      web_static: "http://localhost:80/static/",
      groupName: "",
      pageNum: "",
      list: "",
      usermagess: "",
      pages:"",
      group_id:"",
      group_name:"",
      total:""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var self = this;
      this.$axios
        .get(url + "/api/group/query", {
          params: {
            groupName: self.group_name,
            groupId:self.group_id,
            pageNum: self.pageNum,
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.list = result.data.list;
            self.pageNum = result.data.pageNum;
            self.pages = result.data.pages;
            self.total = result.data.total;
          }
        })
        .catch(error =>this.$message.error(error));
    },
    lookfounderUser(founderUser) {
      var self = this;
      this.$axios
        .get(url + "/api/user/queryuserbyuserid", {
          params: {
            userId: founderUser
          }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            self.usermagess = result.data;
          }
        })
        .catch(error =>this.$message.error(error));
    },
    deletegroup(groupId) {
      var self = this;
      this.$axios
        .get(url + "/api/delete/group", {
          params: {
            groupId: groupId
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
         var self = this;
      if (self.pageNum > 1) {
       
        self.pageNum = parseInt(self.pageNum) - 1;
        self.lalal();
      } else {
          this.$message({
          message: '已经是第一页',
          type: 'warning'
        });
      }
    },
    down() {
          var self = this;
      if (self.pageNum < self.pages) {
        self.pageNum = parseInt(self.pageNum) + 1;
        self.init();
      } else {
           this.$message({
          message: '已经是最后一页',
          type: 'warning'
        });

      }
    },
    lalal(){
         var self = this;
      this.$axios
        .get(url + "/api/group/query", {
          params: {
            groupId:self.group_id,
            groupName:self.group_name
           
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
        .catch(error => this.$message.error(error));
    },
     chanindexpage(val) {
      this.pageNum = val;
      this.init();
    },
  }
};
</script>
<style scoped>
#div {
  display: flex;
  justify-content: center;
  align-content: center;
}
.clearfix{
    display: flex;
    justify-content: center;
    align-content: center;
}

</style>