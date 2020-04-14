<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改用户</h3>
      <el-form
        ref="customerForm"
        :model="customerForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="昵称:" prop="name">
              <component
                is="YInput"
                v-model="customerForm.name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号:" prop="account">
              <component
                is="YInput"
                v-model="customerForm.account"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码:" prop="password">
              <component
                is="YInput"
                v-model="customerForm.password"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色" prop="roleName">
              <component
                is="YInput"
                v-model="customerForm.roleName"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会员等级:" prop="memberLev">
              <component
                is="YInput"
                v-model="customerForm.memberLev"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="积分:" prop="integral">
              <component
                is="YInput"
                v-model="customerForm.integral"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="余额:" prop="balance">
              <component
                is="YInput"
                v-model="customerForm.balance"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="微信id:" prop="wechatId">
              <component
                is="YInput"
                v-model="customerForm.wechatId"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机:" prop="mobile">
              <component
                is="YInput"
                v-model="customerForm.mobile"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="头像:" prop="avatar">
              <component
                is="YInput"
                v-model="customerForm.avatar"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二维码:" prop="qrcodeUrl">
              <component
                is="YInput"
                v-model="customerForm.qrcodeUrl"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员码:" prop="memberUrl">
              <component
                is="YInput"
                v-model="customerForm.memberUrl"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市:" prop="city">
              <component
                is="YInput"
                v-model="customerForm.city"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="sex">
              <component
                is="YInput"
                v-model="customerForm.sex"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日:" prop="birth">
              <component
                is="YInput"
                v-model="customerForm.birth"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('customerForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { putCustomer, getCustomer } from '../../api/customer'

export default {

  data() {
    return {
      customerForm: {},
      rules: {}
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      const res = await getCustomer(this.$route.query.id)
      this.customerForm = res.data
    },

    async api() {
      const res = await putCustomer(this.$route.query.id, this.customerForm)
      this.$router.push({ path: '/customers' })

      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    async submit(customerForm) {
      this.$refs.customerForm.validate(valid => {
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
