<template>
  <div class="home">
    <el-row>
      <el-col :span="6" v-for="item in [...Array(4).keys()]">
          <el-card class="box-card">
            <div class="box-content">
              <div class="icon" :style="{ background: initList[item].color }">
                <img :src="getImage(item)" style="width: 50%;">
              </div>
              <div class="content">
                <div class="data">{{ initData[item]?.value || 0 }}</div>
                <div class="title">{{ initList[item].title }}</div>
              </div>
            </div>
          </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-card style="margin: 20px;">
          <template #header>
              <div class="chartTitle">
                <el-icon size="20px" color="#d81f06"><PieChart /></el-icon>
                <span class="text">用户访问来源</span>
              </div>
          </template>
          <div id="pieChart" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card style="margin: 20px;">
            <template #header>
                <div class="chartTitle">
                  <el-icon size="20px" color="#d81f06"><TrendCharts /></el-icon>
                  <span class="text">每周用户活跃量</span>
                </div>
            </template>
            <div id="trendChart" class="chart"></div>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { useHomeStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import * as echarts from "echarts";

const homeStore = useHomeStore()

homeStore.getHomeInitData()

const { initData, pieChartData, trendChartData } =  storeToRefs(homeStore)

// 图标列表
const initList = ref(
  [
    {
      imgUrl: "../../../assets/image/add.svg",
      color: "#348eed",
      title: "新增用户"
    },
    {
      imgUrl: "../../../assets/image/view.svg",
      color: "#28bc6e",
      title: "累计访问"
    },
    {
      imgUrl: "../../../assets/image/question.svg",
      color: "#fd9827",
      title: "新增问答"
    },
    {
      imgUrl: "../../../assets/image/share.svg",
      color: "#ea4124",
      title: "分享统计"
    }
  ]
);

const getImage = (index: number): string => {
  return new URL(initList.value[index]?.imgUrl, import.meta.url).href
}
const init = () => {
  const pieChart = echarts.init(document.getElementById("pieChart"));
  const trendChart = echarts.init(document.getElementById("trendChart"));
  // 指定图表的配置项和数据
  const pieChartOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '10%',
      left: 'center'
    },
    series: [
      {
        name: '详情',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        center: ['50%', '55%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: pieChartData.value
      }
    ],
  };
  const trendChartOption = {
    color: "#348eed",
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: trendChartData.value.date
    },
    yAxis: {
      type: 'value'
    },
    label: {
      show: true,
      position: 'top',
      formatter: (params: any) => {
        if (params.value === Math.max(...trendChartData.value.value)) {
          return '最大值:' + params.value
        } else if(params.value === Math.min(...trendChartData.value.value)) {
          return '最小值:' + params.value
        }
        return ''
      },
      color: '#2a2e49',
      fontSize: "14px",
      fontWeight: "600"
    },
    series: [
      {
        data: trendChartData.value.value,
        type: 'bar',
      },

    ]
  };
  pieChart.setOption(pieChartOption);
  trendChart.setOption(trendChartOption);

  window.addEventListener("resize",  () => {
    pieChart.resize()
    trendChart.resize()
  })
}

onMounted(async () => {
  try {
    await homeStore.getPieChartData()
    await homeStore.getTrendChartData()
    init();
  } catch(error) {
    console.error("请求数据失败",error);
  }
})

</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  background-color: #fff;
  .box-card {
    margin: 30px 20px;
    .box-content {
      height: 130px;
      display: flex;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 25%;
      }
      .content {
        height: 100%;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--primary-color);
        .data {
          margin-top: 15px;
          font-size: 65px;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
  .chartTitle {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    font-size: 18px;
    font-weight: 600;
    .text {
      padding-left: 5px;
    }
  }
  .chart {
    height: 450px;
  }
}
:deep(.el-card) {
  border-radius: 10px;
}
:deep(.el-card__body) {
  padding: 0;
}
</style>