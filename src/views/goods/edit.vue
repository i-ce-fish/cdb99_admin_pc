<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改信息</h3>
      <el-form
        ref="goodForm"
        :model="goodForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="商品名称:" prop="name">
              <component
                is="YInput"
                v-model="goodForm.name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="缩略图" prop="thumbnail">
              <component
                is="YInput"
                v-model="goodForm.thumbnail"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="总销量:" prop="totalSale">
              <component
                is="YInput"
                v-model="goodForm.totalSale"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品描述:" prop="description">
              <component
                is="YInput"
                v-model="goodForm.description"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="原价:" prop="originPrice">
              <component
                is="YInput"
                v-model="goodForm.originPrice"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="当前价:" prop="currentPrice">
              <component
                is="YInput"
                v-model="goodForm.currentPrice"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="库存:" prop="inventory">
              <component
                is="YInput"
                v-model="goodForm.inventory"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('goodForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

  import { getGood, putGood } from '../../api/goods'

  export default {

    data() {
      return {
        goodForm: {},
        rules: {}
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.get()
      },

      async get() {
        // const response = await getGood(this.id ? this.id : this.$route.query.id)
        const response = await getGood(this.$route.query.id)
        this.goodForm = response.data
        // 先后顺序
      },

      async api() {
        const res = await putGood(this.$route.query.id, this.goodForm)
        this.$router.push({ path: '/goods' })

        this.$message({
          message: '修改成功',
          type: 'success'
        })
      },

      async submit(goodForm) {
        this.$refs.goodForm.validate(valid => {
          if (valid) {
            this.api()
          } else {
            return false
          }
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
