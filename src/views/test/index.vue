<template>
  <div class="card-container">
    <!--    <test-form ref="form" :form="form" @submit="submitAfter">-->
    <!--      <template slot="form">-->
    <!--        <el-form-item label="地址:" prop="address">-->
    <!--          <el-input v-model="form.address"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="啥:" prop="address">-->
    <!--          <el-input v-model="form.some"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--        </el-form-item>-->
    <!--      </template>-->
    <!--      <template slot="operate">-->
    <!--        <el-button @click="submit">提交</el-button>-->
    <!--        <el-button @click="back">返回1</el-button>-->
    <!--      </template>-->
    <!--    </test-form>-->
    <el-upload
      class="upload-demo"
      action="http://shop.cdb99.com:8088/api/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>    <div>__________</div>
    <!--    <Tinymce ref="editor" v-model="content" :height="400" />-->
    <!--    <select-year v-model="test" />-->
    <!--    <select-year />-->
  </div>
</template>

<script>

export default {
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}</script>
<style lang='scss' scope>
  .card-container {

  }
</style>
