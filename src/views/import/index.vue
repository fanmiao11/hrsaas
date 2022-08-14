<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="excelSuccess" :onSuccess="onSuccess" />
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees

import { importEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择.xlsx文件')
        return false
      }
      return true
    },
    // 文件解析成功后
    async onSuccess({ header, results }) {
      // console.log(header);
      // console.log(results);
      // 路径映射
      //   const mapKeyPath = {
      //   入职日期: 'timeOfEntry',
      //   姓名: "name",
      //   工号: "workNumber",
      //   手机号: "mobile",
      //   转正日期: "correctionTime"
      // }
      const newArr = results.map((item) => {
        // const obj = {}
        // for(let key in importMapKeyPath){
        //   obj[importMapKeyPath[key]] = item[key]
        // }
        // return obj

        return Object.keys(importMapKeyPath).reduce((sum, key) => {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            date.setFullYear(date.getFullYear - 70)
            sum[importMapKeyPath[key]] = formatTime(date)
          } else {
            sum[importMapKeyPath[key]] = item[key]
          }
          return sum
        }, {})
      })

      // console.log(newArr)

      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
