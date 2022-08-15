<template>
  <div>
    <el-upload
        v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="提示" :visible.sync="previewImgDialog">
      <img style="width: 100%" :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDjIcjbEcliX9WheNyMVR9ex2sRnCXeYFi',
  SecretKey: 'ILBnBLHzUnvsgGdmiPtAD2d195mGWaPz'
})
// console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ],
      previewImgDialog: false,
      imgUrl: '',
      loading:false,
    }
  },

  created() {},

  methods: {
    onRequest({file}) {
        this.loading=true
    //   console.log(111)
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341667' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
            // 传送成功或失败均进入该函数
          if(err || data.statusCode !== 200){
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess',{
            url:'https://'+data.Location
          })
        
        }
      )
      this.loading=false
    },
    onChange(file, fileList) {
    //   console.log(fileList)
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      //   限制上传的图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
