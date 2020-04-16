<template>
  <div class="app-container">
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="userRules"
      inline
    >
      <el-row>

        <el-form-item label="名称">
          <component
            is="YInput"
            v-model="userForm.name"
          />
        </el-form-item>
        <el-form-item label="名称">
          <component
            is="YInput"
            v-model="userForm.name"
          />
        </el-form-item>
        <el-form-item label="名称">
          <component
            is="YInput"
            v-model="userForm.name"
          />
        </el-form-item>
        <el-form-item label="名称">
          <component
            is="YInput"
            v-model="userForm.name"
          />
        </el-form-item>

      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="null">
          <el-form-item>
            <el-button type="primary" @click="test">查询</el-button>
            <el-button @click="test">重置</el-button>
            <el-button type="success" @click="add">新用户</el-button>

          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>
        <el-table-column prop="name" label="昵称" />

        <el-table-column prop="username" label="账号" />

        <el-table-column prop="password" label="密码" />

        <el-table-column prop="roleName" label="角色" />
        <el-table-column prop="avatar" label="头像" />
        <el-table-column prop="mobile" label="手机" />
        <el-table-column prop="email" label="邮箱" />

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
import { getUsers, delUser } from '@/api/user'
import yTable from '@/components/yTable'

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
      userRules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const response = await getUsers({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      })
      this.tableData = response.data.list
      this.pagination.total = parseInt(response.data.pagination.total)
    },

    add() {
      this.$router.push({ path: 'add' })
    },
    edit(id) {
      this.$router.push({ path: 'edit', query: { id: id }})
    },
    del(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser(id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
