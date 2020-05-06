<template>
  <el-upload
    class="yupload-uploader"
    :action="url"
    :on-success="handleAvatarSuccess"
    :show-file-list="type === 'file'?true:false"
  >
    <div v-if="type === 'file'" class="file">
      <el-button size="small" type="primary">点击上传</el-button>
    </div>
    <div v-if="type === 'img'" class="img">
      <img v-if="imgUrl" :src="imgUrl" class="yupload">
      <i v-else class="el-icon-plus yupload-uploader-icon" />
    </div>
  </el-upload>
</template>
<script>
export default {
  props: {
    value: { String },
    url: { type: String, default: () => "http://shop.cdb99.com:8088/api/upload" },
    showUrl: { String, default: () => "http://shop.cdb99.com" },
    //* 类型：图片上传/文件上传
    // file/img
    type: { type: String, default: () => "file" }
  },
  data() {
    return { imgUrl: this.value }
  },
  watch: {
    value(val) {
      this.imgUrl = val
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
      //  todo file List??
      console.log(this.showUrl + res.data)
      this.$emit("input", this.showUrl + res.data)
    }
  }
}
</script>

<style lang="scss">
  .yupload-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .yupload-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .yupload-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .yupload {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
