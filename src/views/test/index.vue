<template>
  <div class="card-container">

    <el-row type="flex" :gutter="10">
      <el-col :span="1">
        <div v-for="(item,index) in goodForm.carousels" :key="index" class="">
          <y-input v-model="item.url" disabled />
        </div>
      </el-col>
      <el-col :span="6">
        <y-upload-mutiple
          v-model="goodForm.carousels"
          :multiple="true"
          type="img"
        />
      </el-col>
    </el-row>

    ------
    <el-row type="flex" :gutter="10">
      <el-col>
        <y-input v-model="articleForm.front_pic" placeholder="请点击上传图片" :disabled="true" />
      </el-col>
      <el-col :span="6">
        <YUpload
          v-model="articleForm.front_pic"
          type="img"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import yUploadMutiple from "@/components/yComponent/yUploadMutiple"

export default {
  components: { yUploadMutiple },
  data() {
    return {
      fileList: [{
        name: "food.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      }, {
        name: "food2.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      }],
      articleForm: {},
      goodForm: {}
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}</script>
<style lang='scss' scope>
  .card-container {

  }
</style>
