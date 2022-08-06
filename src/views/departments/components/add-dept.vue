<template>
  <el-dialog
    title="添加部门"
    :visible="visible"
    @close="$emit('update:visible',false)"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择负责人"
        >
          <el-option
          v-for="item in employees"
          :key = "item.id"
          :label="item.username" :value="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          :rows="4"
          placeholder="1-300个字符"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible',false)">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getDepartments , addDepartments} from '@/api/departments'
import {getEmployeesApi} from '@/api/employees'
export default {
  data() {
    // 校验部门名称是否重复
    const checkDeptName = (rule, value, callback) => {
      if(!this.currentNode.children) return callback()
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value
      )

      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    // 校验部门编码是否重复
    const checkDeptCode = async (rule, value, callback)=>{
      const {depts} = await getDepartments()
      console.log(depts)
      const isRepeat = depts.some((item) => item.code===value)

      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }



    return {
      employees:[],
      formData: {
        name: '', //部门名称
        code: '', //部门编码
        manager: '', //部门负责人
        introduce: '' //部门介绍
      },
      // 1 model:   2.rules
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          // { validator: (rule,value,callback) => {
          //   // 自定义校验的逻辑分析
          //   // 1.判断value 是否 和添加的同级部门是否重复（获取到同级部门）
          //   // 2.如果重复了调用callback（new Error("部门重复")）
          //   // 3.如果没有重复直接调用callback
          //   console.log(this.currentNode);

          // } }
          { validator: checkDeptName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { validator:checkDeptCode,trigger:'blur'}
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
          // { type: '', message: '' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' }
          // { type: '', message: '' }
        ]
      },

    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },

  created() {
    this.getEmployees()
  },

  methods: {
    handleClose(done) {
      done()
      // this.$confirm('确认关闭？')
      //   .then((_) => {
      //     done()
      //   })
      //   .catch((_) => {})
    },
    async getEmployees(){
      this.employees = await getEmployeesApi()
      // console.log(this.employees);

    },
    // 点击添加确定
    async onSave(){
      // 先校验表单都通过
      await this.$refs.form.validate()
      this.formData.pid=this.currentNode.id
      console.log(this.formData);
      try{
        await addDepartments(this.formData)
        this.$message.success('新增部门成功')
        this.$emit('update:visible',false)
        this.$emit('add-success')
        
      }catch(e){
        this.$message.error('新增部门失败')

      }
    }
  }
}
</script>

<style scoped></style>
