<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改图文</h3>
      <el-row type="flex" justify="space-between">
        <el-col :span="14">
          <el-form
            ref="articleForm"
            :model="articleForm"
            :rules="rules"
            label-width="100px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题" prop="title">
                  <YInput
                    v-model="articleForm.title"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="作者" prop="author">
                  <YInput
                    v-model="articleForm.author"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栏目编号" prop="catalog_id">
                  <YInput
                    v-model="articleForm.catalog_id"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="首页图片" prop="front_pic">
                  <el-row type="flex" gutter="10">
                    <el-col :span="16">
                      <y-input v-model="articleForm.front_pic" placeholder="请点击上传图片" :disabled="true" />
                    </el-col>
                    <el-col :span="6">
                      <YUpload
                        v-model="articleForm.front_pic"
                        type="img"
                      />
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="首页头条" prop="is_header">
                  <YRadio
                    v-model="articleForm.is_header"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栏目头条" prop="is_col_header">
                  <YRadio
                    v-model="articleForm.is_col_header"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="正文" prop="body">
                  <Tinymce ref="editor" v-model="articleForm.body" :height="400" />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item>
                  <el-button @click="submit('articleForm')">提交</el-button>
                  <el-button @click="back">返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-col>
        <el-col :span="8">
          <div class="preview-box-title">
            模拟小程序展示效果
          </div>
          <el-card class="preview-box">
            <div class="title">
              {{ articleForm.title }}
            </div>
            <div v-html="articleForm.body" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

import { putArticle, getArticle } from "../../api/articles"
import Tinymce from "@/components/Tinymce/tinymce"

export default {
  components: { Tinymce },
  data() {
    return {
      articleForm: {},
      rules: {}
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      const res = await getArticle(this.$route.query.id)
      this.articleForm = res.data
    },

    async api() {
      const res = await putArticle(this.$route.query.id, this.articleForm)
      this.$router.push({ path: "/articles" })

      this.$message({
        message: "添加成功",
        type: "success"
      })
    },

    async submit(articleForm) {
      this.$refs.articleForm.validate(valid => {
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

    .preview-box-title {
      font-size: 14px;
      font-weight: 700;
      color: #606266;
      line-height: 40px;

    }

    .preview-box {
      width: 375px;
      min-height: 667px;
      font-size: 16px;
      line-height: 25px;

      .el-card__body {
        padding: 15px;
      }

      .title {
        text-align: center;
        font-size: 18px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
