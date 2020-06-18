<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>添加店铺优惠活动</h3>
      <el-form
        ref="yForm"
        :model="activityForm"
        label-width="100px"
      >
        <el-row>

          <el-col :span="12">
            <el-form-item label="活动名称:" prop="name">
              <component
                is="YInput"
                v-model="activityForm.name"
              />

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开始日期:" prop="startDate">
              <component
                is="YInput"
                v-model="activityForm.startDate"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="结束日期:" prop="endDate">
              <component
                is="YInput"
                v-model="activityForm.endDate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠规则:" prop="rule">
              <component
                is="YInput"
                v-model="activityForm.rule"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:" prop="status">
              <component
                is="YInput"
                v-model="activityForm.status"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠描述:" prop="description">
              <component
                is="YInput"
                v-model="activityForm.description"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与活动的商品:" prop="products">
              <component
                is="YInput"
                v-model="activityForm.products"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('activityForm')">确定</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addActivity } from "@/api/activity"

export default {
  components: {},
  data() {
    return {
      activityForm: {},
      //  apiList

      rules: {}
    }
  },
  created() {
    //    getApiList

  },
  mounted() {
  },
  methods: {
    async api() {
      const res = await addActivity(this.activityForm)
      // if (res.code === '200') {
      this.$router.push({ path: "/activities" })
      // }
    },
    async submit(activityForm) {
      this.api()
      this.$message({
        message: "添加成功",
        type: "success"
      })

      // this.$refs.yForm.validate(valid => {
      //   if (valid) {
      //     this.api();
      //     this.$message({
      //       message: '添加成功',
      //       type: 'success'
      //     });
      //   } else {
      //     return false;
      //   }
      // });
    }
    //    getApiList

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
