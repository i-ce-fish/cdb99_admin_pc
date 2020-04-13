<template>
  <div class="app-container">
    <el-button @click="add">添加商品分类</el-button>
    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>

        <el-table-column prop="name" label="名称" />

        <el-table-column prop="startDate" label="开始日期" />

        <el-table-column prop="endDate" label="结束日期" />
        <el-table-column prop="rule" label="优惠规则" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="description" label="描述" />

        <!--        <el-table-column prop="id" label="品类编码" />-->

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
import yTable from '@/components/yTable'
import { getActivities, delActivity } from '../../api/activity'

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
      const response = await getActivities({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      })
      // this.tableData = response.data.list
      // this.pagination.total = parseInt(response.data.pagination.total)
      this.tableData = response.data.list
      this.pagination.total = response.data.length
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
          delActivity(id).then(response => {
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
