<template>
  <div class="dashboard-container" >
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <tree-tools
          @add="showAddDept"
          :isRoot="true"
          :treeNode="company"
        ></tree-tools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all v-loading="loading">
          <template v-slot="{ data }">
            <tree-tools
              @add="showAddDept"
              @remove="loadDepts"
              @edit="showEditDept"
              :treeNode="data"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹框 -->
    <add-dept ref="addDept" :visible.sync="dialogVisible" :currentNode='currentNode' @add-success="loadDepts" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { transLitToTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      company: { name: '传智教育', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false,

      treeData: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      currentNode:{},
      loading:false,
    }
  },
  components: {
    TreeTools,
    AddDept
  },

  created() {
    this.loadDepts()

    // console.log(this.transLitToTree(this.treeData, ''))
  },

  methods: {
    showAddDept(val) {
      this.dialogVisible = true
      // console.log('cuu',val);
      this.currentNode = val

    },
    showEditDept(val){
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },

    handleNodeClick(data) {
      console.log(data)
    },
    async loadDepts() {
      this.loading = true
      // console.log(111);
      const res = await getDepartments()
      // console.log(res)
      // this.treeData = res.depts
      this.treeData = transLitToTree(res.depts, '')
      // console.log(this.transLitToTree(this.treeData, ''))
      this.loading = false
    }

    // transLitToTree(data, pid) {
    //   const arr = []
    //   data.forEach((item) => {
    //     if (item.pid === pid) {
    //       const children = this.transLitToTree(data, item.id)
    //       if(children.length){
    //         item.children = children
    //       }
    //       arr.push(item)
    //     }
    //   })
    //   return arr
    // }
  }
}
</script>

<style scoped lang="less"></style>
