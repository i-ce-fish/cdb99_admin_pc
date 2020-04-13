<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新订单</h3>
      <el-form
        ref="orderForm"
        :model="orderForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="顾客:" prop="guest">
              <component
                is="YInput"
                v-model="orderForm.guest"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <component
                is="YInput"
                v-model="orderForm.address"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="卡券:" prop="coupon">
              <component
                is="YInput"
                v-model="orderForm.coupon"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态:" prop="status">
              <component
                is="YInput"
                v-model="orderForm.status"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="留言:" prop="message">
              <component
                is="YInput"
                v-model="orderForm.message"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="总金额:" prop="totalAmount">
              <component
                is="YInput"
                v-model="orderForm.totalAmount"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="配送费:" prop="deliveryFee">
              <component
                is="YInput"
                v-model="orderForm.deliveryFee"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠活动:" prop="activity">
              <component
                is="YInput"
                v-model="orderForm.activity"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总数量:" prop="num">
              <component
                is="YInput"
                v-model="orderForm.num"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单项:" prop="orderItems">
              <component
                is="YInput"
                v-model="orderForm.orderItems"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('orderForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { addOrder } from '../../api/order'

export default {

  data() {
    return {
      orderForm: {},
      rules: {}
    }
  },
  methods: {

    async api() {
      const res = await addOrder(this.orderForm)
      this.$router.push({ path: '/orders' })

      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    async submit(orderForm) {
      this.$refs.orderForm.validate(valid => {
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
