<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改穿法</h3>
      <el-form
        ref="wearForm"
        :model="wearForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="名字:" prop="title">
              <component
                is="YInput"
                v-model="wearForm.title"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="名字:" prop="content">
              <component
                is="YInput"
                v-model="wearForm.content"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名字:" prop="status">
              <component
                is="YInput"
                v-model="wearForm.status"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名字:" prop="products">
              <component
                is="YInput"
                v-model="wearForm.products"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('wearForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { putWear, getWear } from "../../api/wear"

export default {

  data() {
    return {
      wearForm: {},
      rules: {}
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      const res = await getWear(this.$route.query.id)
      this.wearForm = res.data
    },

    async api() {
      const res = await putWear(this.$route.query.id, this.wearForm)
      this.$router.push({ path: "/wears" })

      this.$message({
        message: "添加成功",
        type: "success"
      })
    },

    async submit(wearForm) {
      this.$refs.wearForm.validate(valid => {
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
