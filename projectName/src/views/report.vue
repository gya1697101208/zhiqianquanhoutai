<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="userId" label="用户ID" width="150"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="userVx" label="微信" width="120"></el-table-column>
      <el-table-column prop="userImage" label="用户头像" width="120">
          <template slot-scope="scope">
          <img :src="web_static+scope.row.userImage" alt height="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="userSchool" label="学校" width="200"></el-table-column>
      <el-table-column prop="userSex" label="性别" width="120"></el-table-column>
      <el-table-column prop="userPost" label="职位" width="120"></el-table-column>
      <el-table-column prop="userStatus" label="状态" width="120">
          <template slot-scope="scope">
          <div v-if="scope.row.userStatus==0">弃用</div>
          <div v-if="scope.row.userStatus==1">可用</div>
        </template>
      </el-table-column>
      
    </el-table>
    <div class="pages">
    <el-pagination
      :page-size="6"
      :pager-count="pagercount"
      layout="prev, pager, next"
      :total="total"
      @current-change="chanindexpage"
    ></el-pagination>
    </div>
  </div>
</template>

<script>
var url = "http://localhost:80";
export default {
  data() {
    return {
      web_static: "http://localhost:80/static/",
      tableData: "",
      pageNum: 1,
      pageSize: 6,
      tableData: "",
      total: "",
      pagercount: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var self = this;     
      this.$axios
        .get(url + "/api/user/queryalluser", {
          params: {
            pageNum: self.pageNum,
            pageSize: self.pageSize
          }
        })
        .then(response => {
            console.log("11111111");
          let result = response.data;
          if (result.status == 200) {
            self.tableData = result.data.list;
            self.total = result.data.total;
            self.pagercount = result.data.pages;
            console.log(self.total);
          }
        })
        .catch(error => alert(error));
    },
    handleClick(row) {
      console.log(row);
    },chanindexpage(val) {
      this.pageNum = val;
      this.init();
    }
  }
};
</script>
<style>
.pages{
        display: flex;
    justify-content: center;
    align-content: center;
}
</style>