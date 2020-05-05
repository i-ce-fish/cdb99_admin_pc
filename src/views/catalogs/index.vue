<template>
  <div class="app-container">
    <el-form
      ref="catalogForm"
      :model="catalogForm"
      :rules="catalogRules"
      inline
    >
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="success" @click="add">新增图文</el-button>
        </el-form-item>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col>
          <el-form-item label="目录名">
            <YInput
              v-model="catalogForm.catalog_name"
            />
          </el-form-item>
          <el-form-item label="描述">
            <YInput
              v-model="catalogForm.description"
            />
          </el-form-item>
          <el-form-item label="父级编号">
            <YInput
              v-model="catalogForm.parent_id"
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

        <el-table-column prop="id" label="编号" sortable="custom" width="100" />
        <el-table-column prop="catalog_name" label="目录名"  />

        <el-table-column prop="description" label="描述"  />

        <el-table-column prop="parent_id" label="父级编号"  />

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
import { getCatalogs, delCatalog } from '@/api/catalog'
import yTable from '@/components/yTable'

export default {
  components: { yTable },
  data() {
    return {
      catalogForm: {},
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      catalogRules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(param) {
      const response = await getCatalogs(
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
          delCatalog(id).then(response => {
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
    },
    onSearch(sort) {
      this.getList({ ...this.catalogForm, ...sort })
    },
    sortBy(e) {
      this.onSearch(e)
    },
    reset() {
      this.articleForm = {}
      this.getList()
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
