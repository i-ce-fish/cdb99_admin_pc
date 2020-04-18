<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新增商品分类</h3>
      <el-form
        ref="categoryForm"
        :model="categoryForm"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品分类名:" prop="name">
              <YInput
                v-model="categoryForm.name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="父级分类">
              <y-select v-model="categoryForm.parent_id" :options="parentOptions" />

            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('categoryForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { addCategory, getCategories } from '../../api/category'

export default {

  data() {
    return {
      categoryForm: {},
      rules: {},
      parentOptions: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getParentOptions()
    },

    async api() {
      const res = await addCategory(this.categoryForm)
      this.$router.push({ path: '/categories' })

      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    async submit(categoryForm) {
      this.$refs.categoryForm.validate(valid => {
        if (valid) {
          this.api()
        } else {
          return false
        }
      })
    },

    async getParentOptions() {
      const res = await getCategories({ parent_id: 0 })
      this.parentOptions = res.data.list.map(item => ({
        value: item.id,
        label: item.name
      }))
      this.parentOptions.splice(0, 0, {
        value: '0',
        label: '一级分类'
      })
    }
  }

}
</script>
<style lang='scss' scope>
  .card-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: 100vh;

    .box-card {

    }
  }
</style>
