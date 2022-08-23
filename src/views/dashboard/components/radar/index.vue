<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      const radarOption = {
        backgroundColor: 'pink',
        title: {
          text: '人员绩效表',
          textStyle: {
            color: '#eee'
          }
        },
        legend: {
          data: ['张三', '李四'],
          bottom: 5,
          itemGap: 80,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          selectedMode: 'single'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug', max: 100 },
            { name: '迟到', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '早退', max: 100 },
            { name: '摸鱼', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [40, 30, 20, 35, 50, 18],
                name: '张三'
              },
              {
                value: [80, 30, 20, 35, 50, 18],
                name: '李四'
              }
            ]
          }
        ]
      }

      // 绘制图表
      myChart.setOption(radarOption)
    }
  }
}
</script>

<style scoped lang="scss">
#main {
  width: 700px;
  height: 500px;
}
</style>
