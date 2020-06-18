<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改图文目录</h3>
      <el-form
        ref="catalogForm"
        :model="catalogForm"
        label-width="100px"
        :rules="catalogRules"
      >
        <el-row>

          <el-col :span="12">
            <el-form-item label="目录名:" prop="catalog_name">
              <component
                is="YInput"
                v-model="catalogForm.catalog_name"
              />

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="描述:" prop="description">
              <component
                is="YInput"
                v-model="catalogForm.description"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="父级分类">
              <y-select v-model="catalogForm.parent_id" :options="parentOptions" />

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
import { getCatalog, getCatalogs, putCatalog } from "@/api/catalog"

export default {
  components: {},
  data() {
    return {
      catalogForm: {},
      catalogRules: {},
      parentOptions: []

    }
  },
  created() {
    this.init()
    //    getApiList
  },
  mounted() {
  },
  methods: {
    init() {
      this.getParentOptions()
      this.get()
    },

    async get() {
      const response = await getCatalog(this.$route.query.id)
      this.catalogForm = response.data
    },

    async edit() {
      const res = await putCatalog(this.$route.query.id, this.catalogForm)

      this.$router.push({ path: "/catalogs" })
      this.$message({
        message: "添加成功",
        type: "success"
      })
    },

    async submit() {
      this.$refs.catalogForm.validate(valid => {
        if (valid) {
          this.edit()
        } else {
          return false
        }
      })
    },
    async getParentOptions() {
      const res = await getCatalogs({ parent_id: 0 })
      this.parentOptions = res.data.list.map(item => ({
        value: item.id,
        label: item.catalog_name
      }))
      this.parentOptions.splice(0, 0, {
        value: "0",
        label: "一级分类"
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
