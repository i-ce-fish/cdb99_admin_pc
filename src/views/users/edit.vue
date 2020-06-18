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
            <el-form-item label="用户名:" prop="username">
              <YInput
                v-model="userForm.username"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机" prop="mobile">
              <YInput
                v-model="userForm.mobile"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <YInput
                v-model="userForm.email"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="密码:" prop="password">
              <YInput
                v-model="userForm.password"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="名字:" prop="name">
              <YInput
                v-model="userForm.name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色">
              <YSelect
                v-model="userForm.role_id"
                :options="roleOptions"
              />

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">

              <el-radio-group v-model="userForm.avatar" style="display: flex;">
                <el-radio
                  v-for="item of avatarOptions"
                  :key="item.value"
                  style="display: flex; justify-content: space-between;align-items: center"
                  :label="item.value"
                >
                  <el-image
                    style=" width: 100px; height: 100px"
                    :src="item.url"
                    fit="contain"
                  />

                </el-radio>
              </el-radio-group>

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

import { putUser, getUser } from "../../api/user"

export default {

  data() {
    return {
      userForm: {},
      rules: {},
      avatarOptions: [
        {
          value: "0",
          label: "男",
          url: "http://dingyue.ws.126.net/2020/0308/873f5f66j00q6u73h001bd200u000k0g009c0068.jpg"
        },
        {
          value: "1",
          label: "女",
          url: "http://pic.51yuansu.com/pic3/cover/00/82/39/58c86eac2ef89_610.jpg"
        }],
      roleOptions: [
        { value: "0", label: "管理员" },
        {
          value: "1", label: "普通用户"
        }
      ]
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
      this.$router.push({ path: "/users" })

      this.$message({
        message: "添加成功",
        type: "success"
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
