<template>
  <div class="app-container">
    <el-button @click="add">新穿法</el-button>
    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="content" label="富文本" />
        <el-table-column prop="products" label="参与活动商品" />

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
import { getWears, delWear } from '@/api/wear'
import yTable from '@/components/yTable'

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
      const response = await getWears({
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
          delWear(id).then(response => {
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
