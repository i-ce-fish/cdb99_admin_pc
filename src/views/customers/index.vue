<template>
  <div class="app-container">
    <el-button @click="add">新用户</el-button>
    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>
        <el-table-column prop="name" label="昵称" />

        <el-table-column prop="username" label="账号" />

        <el-table-column prop="password" label="密码" />

        <el-table-column prop="roleName" label="角色" />

        <el-table-column prop="memberLev" label="会员等级" />

        <el-table-column prop="integral" label="积分" />

        <el-table-column prop="balance" label="余额" />

        <el-table-column prop="wechatId" label="微信id" />

        <el-table-column prop="mobile" label="手机" />

        <el-table-column prop="avatar" label="头像" />
        <el-table-column prop="qrcodeUrl" label="二维码" />
        <el-table-column prop="memberUrl" label="会员码" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="birth" label="生日" />

        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="edit(row.id)">修改</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>
<script>
import { getCustomers, delCustomer } from "@/api/customer"
import yTable from "@/components/yTable"

export default {
  components: { yTable },
  data() {
    return {
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const response = await getCustomers({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      })
      this.tableData = response.data.list
      this.pagination.total = parseInt(response.data.pagination.total)
    },

    add() {
      this.$router.push({ path: "add" })
    },
    edit(id) {
      this.$router.push({ path: "edit", query: { id: id }})
    },
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCustomer(id).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
