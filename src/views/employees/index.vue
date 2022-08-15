<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning" @click="importFn"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportFn"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addEmployees"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees" border>
          <el-table-column label="序号" type="index" sortable />
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="头像" sortable>
            <template slot-scope="scope">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                :src="scope.row.staffPhoto"
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column
            label="聘用形式"
            :formatter="formatEmployment"
            sortable
            prop="formOfEmployment"
          >
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="scope">
              {{ scope.row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/'+row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="removeEmployees(row.id)"
                >删除</el-button
              >
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
          <el-pagination
            :page-size="pages.size"
            :total="total"
            @current-change="currentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加员工组件 -->
    <add-employees
      @add-success="getEmployeeList"
      :visible.sync="showAddEmployees"
    ></add-employees>
  </div>
</template>

<script>
import { getEmployeeListApi, delEmployeeApi } from '@/api/employees'
import AddEmployees from './components/add-employees.vue'
import employees from '@/constant/employees'
const {hireType, exportExcelMapPath } = employees
export default {
  components: {
    AddEmployees
  },
  data() {
    return {
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      showAddEmployees: false
    }
  },

  created() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      const res = await getEmployeeListApi(this.pages)
      // console.log(res);
      this.employees = res.rows
      this.total = res.total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      // if (cellValue === 1) {
      //   return '正式'
      // }
      // if (cellValue === 2) {
      //   return '非正式'
      // }
      // return '未知'
      // 不仅要查找 还要拿到这一项  用find
      const findItem = employees.hireType.find((item) => {
        item.id === cellValue
      })
      return findItem ? findItem.value : '未知'
    },
    // 删除员工
    async removeEmployees(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        const res = await delEmployeeApi(id)
        console.log(res)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 新增员工
    addEmployees() {
      this.showAddEmployees = true
    },
    importFn() {
      this.$router.push('/import')
    },
    async exportFn() {
      const header = Object.keys(exportExcelMapPath)
      // console.log(header)
      const { rows } = await getEmployeeListApi({
        page: 1,
        size: this.total
      })
      // console.log(rows);
      const data = rows.map((item) => {
        return header.map((h) => {
          if(h==='聘用形式'){
           const findItem= hireType.find(hire => {
              return hire.id=== item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          }else{
            return item[exportExcelMapPath[h]]
          }
        })
      })
      // console.log(data);
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
