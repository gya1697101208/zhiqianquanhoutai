<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="职言详情">
              <span>{{ props.row.chatroomComment }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.chatroomData }}</span>
            </el-form-item>
            <el-form-item label="用户名称">
              <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="用户学校">
              <span>{{ props.row.userSchool }}</span>
            </el-form-item>
            <el-form-item label="所有评论">
              <template>
                <el-popover
                  placement="top-start"
                  width="600"
                  trigger="hover"
                  @show="queryalldisscuss(props.row.chatroomId)"
                >
                  <el-table :data="tableData1" style="width: 100%">
                    <el-table-column prop="discussData" label="日期" width="250"></el-table-column>
                    <el-table-column prop="discussComment" label="评论内容" width="180"></el-table-column>
                    <el-table-column  label="评论状态" width="100">
                      <template slot-scope="scope">
                        <div v-if="scope.row.discussStatus==0">弃用</div>
                        <div v-if="scope.row.discussStatus==1">存在</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button slot="reference">评论</el-button>
                </el-popover>
              </template>
            </el-form-item>
            <el-form-item label="用户公司">
              <span>{{ props.row.userCompany }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="100" label="职言类型" prop="chatroomType">
        <template slot-scope="scope">
          <div v-if="scope.row.chatroomType==0">弃用</div>
          <div v-if="scope.row.chatroomType==''">职言</div>
          <div v-if="scope.row.chatroomType==1">简历</div>
        </template>
      </el-table-column>
      <el-table-column width="100" label="被赞数">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="100"
            trigger="hover"
            @show="queryzanbyid( scope.row.chatroomId)"
          >
            <p>被赞{{zancount}}次</p>
            <el-button slot="reference">👍</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="650" label="职言内容" prop="chatroomComment"></el-table-column>
      <el-table-column label="职言状态" prop="chatroomStatus">
        <template slot-scope="scope">
          <div v-if="scope.row.chatroomStatus==0">弃用</div>
          <div v-if="scope.row.chatroomStatus==1">可用</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row.chatroomId,tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
    <el-pagination
      :page-size="10"
      :pager-count="pagercount"
      layout="prev, pager, next"
      :total="total"
      @current-change="chanindexpage"
    ></el-pagination>
    </div>
  </div>
</template>

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
  width: 50%;
}
.pages{
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>

<script>
var url = "http://localhost:80";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 7,
      tableData: "",
      total: "",
      pagercount: "",
      zancount: "",
      tableData1: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var self = this;
      this.$axios
        .get(url + "/api/message/selectchatroomall", {
          params: {
            pageNum: self.pageNum,
            pageSize: self.pageSize
          }
        })
        .then(response => {
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
    chanindexpage(val) {
      this.pageNum = val;
      this.init();
    },
    deleteRow(index, rowchatroomId, rows) {
      var self = this;
      this.$axios
        .get(url + "/api/message/delchatroombyId", {
          params: { chatroomId: rowchatroomId }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            rows.splice(index, 1);
          }
        })
        .catch(error => alert(error));
    },
    queryzanbyid(rowchatroomId) {
      console.log("sdfs");
      var self = this;
      this.$axios
        .get(url + "/api/message/selectchatlikenumbyId", {
          params: { chatroomId: rowchatroomId }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.zancount = result.data;
          }
        })
        .catch(error => alert(error));
    },
    queryalldisscuss(rowchatroomId) {
      var self = this;
      this.$axios
        .get(url + "/api/message/selectdiscussbyId", {
          params: { chatroomId: rowchatroomId }
        })
        .then(response => {
          let result = response.data;
          if (result.status == 200) {
            this.tableData1 = result.data;            
          }
        })
        .catch(error => alert(error));
    }
  }
};
</script>
