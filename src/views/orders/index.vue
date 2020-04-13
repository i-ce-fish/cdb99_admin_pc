<template>
  <div class="app-container">
    <el-button @click="add">新订单</el-button>
    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>

        <el-table-column prop="id" label="编号" />

        <el-table-column prop="guest" label="顾客" />

        <el-table-column prop="address" label="地址" />

        <el-table-column prop="coupon" label="卡券" />

        <el-table-column prop="status" label="状态" />

        <el-table-column prop="message" label="留言" />

        <el-table-column prop="totalAmount" label="总金额" />

        <el-table-column prop="deliveryFee" label="配送费" />

        <el-table-column prop="activity" label="优惠活动" />

        <el-table-column prop="num" label="总数量" />

        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="detail(row.id)">详情</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>
<script>
import { getOrders, delOrder } from '@/api/order'
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
      const response = await getOrders({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      })
      this.tableData = response.data.list
      this.pagination.total = parseInt(response.data.pagination.total)
    },

    add() {
      this.$router.push({ path: 'add' })
    },
    detail(id) {
      this.$router.push({ path: 'detail', query: { id: id }})
    },
    del(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delOrder(id).then(response => {
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
