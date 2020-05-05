<template>
  <div class="app-container">
    <el-form
      ref="goodForm"
      :model="goodForm"
      :rules="goodRules"
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
          <el-form-item label="作者">
            <YInput
              v-model="goodForm.author"
            />
          </el-form-item>
          <el-form-item label="标题">
            <YInput
              v-model="goodForm.title"
            />
          </el-form-item>  <el-form-item label="栏目编号">
          <YInput
            v-model="goodForm.catalog_id"
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
        <el-table-column prop="name" label="商品名称" />

        <el-table-column prop="thumbnail" label="缩略图" />

        <el-table-column prop="totalSale" label="总销量" />

        <el-table-column prop="description" label="商品描述" />

        <el-table-column prop="originPrice" label="原价" />

        <el-table-column prop="currentPrice" label="现价" />

        <el-table-column prop="inventory" label="库存" />

        <el-table-column prop="categroy" label="分类" />

        <el-table-column prop="sort" label="排序" />

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
  import { getGoods, delGood } from '@/api/goods'
  import yTable from '@/components/yTable'

  export default {
    components: { yTable },
    data() {
      return {
        goodForm: {},
        tableData: [],
        pagination: {
          pageNumber: 1,
          pageSize: 10
        },
        goodRules: {},
        roleOptions: [
          { value: '0', label: '管理员' },
          {
            value: '1', label: '普通图文'
          }
        ]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList(param) {
        const response = await getGoods(
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
            delGood(id).then(response => {
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
        this.getList({ ...this.goodForm, ...sort })
      },
      sortBy(e) {
        this.onSearch(e)
      },
      reset() {
        this.goodForm = {}
        this.getList()
      },
      handleClose(e){
        console.log(e)
      }
    }
  }
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
