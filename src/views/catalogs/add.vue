<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>添加商品分类</h3>
      <el-form
        ref="yForm"
        :model="catalogForm"
        label-width="100px"
      >
        <el-row>

          <el-col :span="12">
            <el-form-item label="名称:" prop="name">
              <component
                is="YInput"
                v-model="catalogForm.cnname"
              />

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上级ID:" prop="pid">
              <component
                is="YInput"
                v-model="catalogForm.pid"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="排序:" prop="sort">
              <component
                is="YInput"
                v-model="catalogForm.sort"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('catalogForm')">确定</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addCatalog } from '@/api/catalog'
import request from '../../utils/request'

export default {
  components: {},
  data() {
    return {
      catalogForm: {},
      //  apiList

      rules: {
        name: [
          {
            required: true,
            message: '请输入品类',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ],
        parent_id: [
          {
            required: true,
            message: '请输入上级ID',
            trigger: 'blur'
          }
        ],
        catalog_id: [
          {
            required: true,
            message: '请选择品类',
            trigger: 'blur'
          }
        ],
        depth: [

          {
            required: true,
            message: '请输入深度',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    //    getApiList

  },
  mounted() {
  },
  methods: {
    async api() {
      const res = await addCatalog(this.catalogForm)
      // if (res.code === '200') {
      this.$router.push({ path: '/catalogs' })
      // }
    },
    async submit(catalogForm) {
      this.api()
      this.$message({
        message: '添加成功',
        type: 'success'
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
    },
    //    getApiList

    back() {
      history.back()
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
