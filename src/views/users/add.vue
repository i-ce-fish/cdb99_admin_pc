<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新用户</h3>
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
            <el-form-item label="账号:" prop="username">
              <component
                is="YInput"
                v-model="userForm.username"
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

<!--          <el-col :span="12">-->
<!--            <el-form-item label="角色" prop="roleName">-->
<!--              <component-->
<!--                is="YInput"-->
<!--                v-model="userForm.roleName"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="12">
            <el-form-item label="角色">
              <component
                is="YSelect"
                v-model="userForm.roleId"
                :options="roleOptions"
              />

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">
              <!--              <component-->
              <!--                is="YRadio"-->
              <!--                v-model="userForm.avatar"-->
              <!--                :options="roleOptions"-->
              <!--              />-->

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
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <component
                is="YInput"
                v-model="userForm.email"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobile">
              <component
                is="YInput"
                v-model="userForm.mobile"
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

import { addUser } from '../../api/user'

export default {

  data() {
    return {
      userForm: {},
      rules: {},
      avatarOptions: [
        {
          value: '0',
          label: '男',
          url: 'http://dingyue.ws.126.net/2020/0308/873f5f66j00q6u73h001bd200u000k0g009c0068.jpg'
        },
        {
          value: '1',
          label: '女',
          url: 'http://dingyue.ws.126.net/2020/0308/873f5f66j00q6u73h001bd200u000k0g009c0068.jpg'
        }],
      roleOptions: [
        { value: '0', label: '管理员' },
        {
          value: '1', label: '普通用户'
        }
      ]
    }
  },
  methods: {

    async api() {
      // const res = await addUser(this.userForm)
      const res = await addUser(this.userForm)
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
