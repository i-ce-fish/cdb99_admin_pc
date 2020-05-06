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
          <el-form-item label="商品编号">
            <YInput
              v-model="goodForm.product_sn"
            />
          </el-form-item>
          <el-form-item label="商品名称">
            <YInput
              v-model="goodForm.product_name"
            />
          </el-form-item>
          <el-form-item label="款式编号">
            <YInput
              v-model="goodForm.type_sn"
            />
          </el-form-item>
          <el-form-item label="性别">
            <YInput
              v-model="goodForm.gender"
            />
          </el-form-item>
          <el-form-item label="材质">
            <YInput
              v-model="goodForm.material"
            />
          </el-form-item>
          <el-form-item label="吊牌价格">
            <YInput
              v-model="goodForm.original_price"
            />
          </el-form-item>
          <el-form-item label="优惠价格">
            <YInput
              v-model="goodForm.onsale_price"
            />
          </el-form-item>
          <el-form-item label="VIP价格">
            <YInput
              v-model="goodForm.vip_price"
            />
          </el-form-item>  <el-form-item label="颜色">
            <YInput
              v-model="goodForm.colors"
            />
          </el-form-item><el-form-item label="尺码">
            <YInput
              v-model="goodForm.sizes"
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
        <el-table-column prop="product_sn" label="商品编号" />

        <el-table-column prop="product_name" label="商品名称" />

        <el-table-column prop="type_sn" label="款式编号" />

        <el-table-column prop="gender" label="适合性别" />

        <el-table-column prop="material" label="材质" />

        <el-table-column prop="original_price" label="吊牌价格" />

        <el-table-column prop="onsale_price" label="优惠价格" />

        <el-table-column prop="vip_price" label="VIP价格" />

        <el-table-column prop="colors" label="颜色" />

        <el-table-column prop="sizes" label="尺码" />

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
import { getGoods, delGood } from "@/api/goods"
import yTable from "@/components/yTable"

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

      goodRules: { }
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
          delGood(id).then(response => {
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
      this.getList({ ...this.goodForm, ...sort })
    },
    sortBy(e) {
      this.onSearch(e)
    },
    reset() {
      this.goodForm = {}
      this.getList()
    },
    handleClose(e) {
      console.log(e)
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
