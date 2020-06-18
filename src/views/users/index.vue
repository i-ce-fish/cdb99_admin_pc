<template>
  <div class="app-container">
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="userRules"
      inline
    >
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="success" @click="add">新用户</el-button>
        </el-form-item>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col>

          <el-form-item label="用户名">
            <YInput
              v-model="userForm.username"
            />
          </el-form-item>
          <el-form-item label="手机">
            <YInput
              v-model="userForm.mobile"
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <YInput
              v-model="userForm.email"
            />
          </el-form-item>
          <el-form-item label="名字">
            <YInput
              v-model="userForm.name"
            />
          </el-form-item>

          <el-form-item label="角色">
            <YSelect
              v-model="userForm.role_id"
              :options="roleOptions"
            />
          </el-form-item>

        </el-col>

        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>

    </el-form>
    <y-table :table-data="tableData" :pagination="pagination" @sortBy="sortBy" @changePage4List="getList">
      <template>

        <el-table-column prop="username" label="用户名" sortable="custom" />
        <el-table-column prop="mobile" label="手机" sortable="custom" />
        <el-table-column prop="email" label="邮箱" sortable="custom" />
        <el-table-column prop="name" label="名字" sortable="custom" />
        <el-table-column prop="role_name" label="角色" />
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
import { getUsers, delUser } from "@/api/user"
import yTable from "@/components/yTable"

export default {
  components: { yTable },
  data() {
    return {
      userForm: {},
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      userRules: {},
      roleOptions: [
        { value: "0", label: "管理员" },
        {
          value: "1", label: "普通用户"
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(param) {
      const response = await getUsers(
        {
          ...param,
          page: this.pagination.pageNumber,
          pagesize: this.pagination.pageSize
        }
      )
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
          delUser(id).then(response => {
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
    },
    onSearch(sort) {
      this.getList({ ...this.userForm, ...sort })
    },
    sortBy(e) {
      this.onSearch(e)
    },
    reset() {
      this.userForm = {}
      this.getList()
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
