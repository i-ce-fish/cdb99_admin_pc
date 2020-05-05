<template>
  <div class="app-container">
    <el-form
      ref="articleForm"
      :model="articleForm"
      :rules="articleRules"
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
              v-model="articleForm.author"
            />
          </el-form-item>
          <el-form-item label="标题">
            <YInput
              v-model="articleForm.title"
            />
          </el-form-item>  <el-form-item label="栏目编号">
            <YInput
              v-model="articleForm.catalog_id"
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

        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="150" />
        <el-table-column prop="catalog_id" label="栏目编号" width="100"/>
        <el-table-column prop="is_header" label="首页头条" sortable="custom" width="100">
          <template slot-scope="scope">
            <i :class="scope.row.is_header? 'el-icon-check':'el-icon-close'" />
          </template>

        </el-table-column>
        <el-table-column prop="is_col_header" label="栏目头条" sortable="custom" width="100">
          <template slot-scope="scope">
            <i :class="scope.row.is_col_header? 'el-icon-check':'el-icon-close'" />
          </template>
        </el-table-column>
<!--        <el-table-column prop="body" label="图文" :show-overflow-tooltip="true">-->
<!--          <template slot-scope="scope">-->
<!--            <span v-html="scope.row.body" />-->
<!--          </template>-->
<!--        </el-table-column>-->
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
import { getArticles, delArticle } from '@/api/articles'
import yTable from '@/components/yTable'

export default {
  components: { yTable },
  data() {
    return {
      articleForm: {},
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      articleRules: {},
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
      const response = await getArticles(
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
          delArticle(id).then(response => {
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
      this.getList({ ...this.articleForm, ...sort })
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
