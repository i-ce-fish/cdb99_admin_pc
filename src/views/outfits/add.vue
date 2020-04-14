<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新用户</h3>
      <el-form
        ref="outfitForm"
        :model="outfitForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="昵称:" prop="name">
              <component
                is="YInput"
                v-model="outfitForm.name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号:" prop="account">
              <component
                is="YInput"
                v-model="outfitForm.account"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码:" prop="password">
              <component
                is="YInput"
                v-model="outfitForm.password"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色" prop="roleName">
              <component
                is="YInput"
                v-model="outfitForm.roleName"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会员等级:" prop="memberLev">
              <component
                is="YInput"
                v-model="outfitForm.memberLev"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="积分:" prop="integral">
              <component
                is="YInput"
                v-model="outfitForm.integral"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="余额:" prop="balance">
              <component
                is="YInput"
                v-model="outfitForm.balance"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="微信id:" prop="wechatId">
              <component
                is="YInput"
                v-model="outfitForm.wechatId"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机:" prop="mobile">
              <component
                is="YInput"
                v-model="outfitForm.mobile"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="头像:" prop="avatar">
              <component
                is="YInput"
                v-model="outfitForm.avatar"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二维码:" prop="qrcodeUrl">
              <component
                is="YInput"
                v-model="outfitForm.qrcodeUrl"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员码:" prop="memberUrl">
              <component
                is="YInput"
                v-model="outfitForm.memberUrl"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市:" prop="city">
              <component
                is="YInput"
                v-model="outfitForm.city"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="sex">
              <component
                is="YInput"
                v-model="outfitForm.sex"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日:" prop="birth">
              <component
                is="YInput"
                v-model="outfitForm.birth"
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
