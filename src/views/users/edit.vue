<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改用户</h3>
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="昵称:" prop="name">
              <component
                is="YInput"
                v-model="userForm.name"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号:" prop="account">
              <component
                is="YInput"
                v-model="userForm.account"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码:" prop="password">
              <component
                is="YInput"
                v-model="userForm.password"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色" prop="roleName">
              <component
                is="YInput"
                v-model="userForm.roleName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">
              <component
                is="YInput"
                v-model="userForm.roleName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <component
                is="YInput"
                v-model="userForm.roleName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobile">
              <component
                is="YInput"
                v-model="userForm.roleName"
              />
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('userForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { putUser, getUser } from '../../api/user'

export default {

  data() {
    return {
      userForm: {},
      rules: {}
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      const res = await getUser(this.$route.query.id)
      this.userForm = res.data
    },

    async api() {
      const res = await putUser(this.$route.query.id, this.userForm)
      this.$router.push({ path: '/users' })

      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    async submit(userForm) {
      this.$refs.userForm.validate(valid => {
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
