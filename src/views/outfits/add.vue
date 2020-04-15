<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新搭配</h3>
      <el-form
        ref="outfitForm"
        :model="outfitForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="标题:" prop="title">
              <component
                is="YInput"
                v-model="outfitForm.title"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="主图:" prop="mainImg">
              <component
                is="YInput"
                v-model="outfitForm.mainImg"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品:" prop="products">
              <component
                is="YInput"
                v-model="outfitForm.products"
              />
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('outfitForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { addOutfit } from '../../api/outfit'

export default {

  data() {
    return {
      outfitForm: {},
      rules: {}
    }
  },
  methods: {

    async api() {
      const res = await addOutfit(this.outfitForm)
      this.$router.push({ path: '/outfits' })

      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    async submit(outfitForm) {
      this.$refs.outfitForm.validate(valid => {
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
