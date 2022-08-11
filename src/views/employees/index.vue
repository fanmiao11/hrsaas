<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data='employees' border>
          <el-table-column label="序号" type="index" sortable />
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="头像" sortable >
            <!-- <template slot-scope="scope">
              <img width="100px" :src="scope.row.staffPhoto"/>
            </template> -->
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" sortable />
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable />
          <el-table-column label="账户状态" sortable />
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination @current-change="currentChange" layout="prev, pager, next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeListApi } from '@/api/employees'
export default {
  data() {
    return {
      employees:[],
      total:0,
      pages:{
        page:1,
        size:5,
      }
      
    }
  },

  created() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList(){
      const res = await getEmployeeListApi(this.pages)
      // console.log(res);
      this.employees = res.rows
      this.total = res.total
    },
    currentChange(val){
      this.pages.page = val
      this.getEmployeeList()
}
  }
}
</script>

<style scoped lang="less"></style>
