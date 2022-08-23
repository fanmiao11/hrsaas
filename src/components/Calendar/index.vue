<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select @change="updateCalendar" v-model="currentYear">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMonth">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          <!-- {{date.getDate()}} -->

          {{ date.getDate() }}

          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: 0,
      currentMonth: 0,
      years: [],
      currentDate: new Date()
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => {
          return item + index
        })
      // this.years = Array(11).fill(this.currentYear-5).reduce((pre,curr,index,array)=>{
      //     console.log(pre,curr);
      //     // console.log(index,array);
      //     // return pre.push(curr+index)
      // },[])
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
      // console.log(this.currentDate);
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none;
  }
  .el-calendar-table .el-calendar-day {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
  .cell-box {
    color: pink;
  }
  .prev .cell-box,
  .next .cell-box {
    color: skyblue !important;
  }
}
</style>
