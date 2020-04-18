<template>
  <div class="app-container">
    <el-form
      ref="categoryForm"
      :model="categoryForm"
      :rules="categoryRules"
      inline
    >
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="success" @click="add">新商品分类</el-button>
        </el-form-item>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col>

          <el-form-item label="商品分类名">
            <YInput
              v-model="categoryForm.name"
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
    <y-table
      :table-data="tableData"
      :pagination="pagination"
      @sortBy="sortBy"
      @changePage4List="getList"
    >
      <template>
        <el-table-column prop="id" width="100px" label="编号" sortable="custom" />
        <el-table-column prop="name" label="商品分类名" sortable="custom" />
        <el-table-column prop="parent_name" label="父级分类" sortable="custom" />
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
import { getCategories, delCategory } from '@/api/category'
import yTable from '@/components/yTable'

export default {
  components: { yTable },
  data() {
    return {
      categoryForm: {},
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10,
        layout: 'total'
      },
      categoryRules: {},
      parentOptions: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(param) {
      const response = await getCategories(param)

      this.tableData = response.data.list

      // this.tableData = this.tableData.map(item => {
      //   let parent = { name: '一级分类' }
      //   if (item.parent_id !== '0') {
      //     parent = this.tableData.find(value => {
      //       return value.id === item.parent_id
      //     })
      //   }
      //   return {
      //     parent_name: parent.name,
      //     ...item
      //   }
      // })
      // })

      // 过滤parent_id = 0 ，并初始化子数组
      const parentList = this.tableData
        .filter(item => (item.parent_id === '0'))
        .map(item => ({ item, children: [] }))

      const childList = this.tableData.filter(item => (
        item.parent_id !== '0'
      ))

      //遍历，将son放进father
      childList.forEach(child => {
        const parent = parentList.find(father => (
          child.parent_id === father.item.id
        ))
        if (parent) {
          parentList[parentList.indexOf(parent)].children.push(child)
        }
      })

      this.tableData = parentList

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
          delCategory(id).then(response => {
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
      this.getList({ ...this.categoryForm, ...sort })
    },
    sortBy(e) {
      this.onSearch(e)
    },
    reset() {
      this.categoryForm = {}
      this.getList()
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
