<template>
  <va-card>
    <va-card-title>24小时气温</va-card-title>

    <va-card-content>
      <div class="chart-wrapper">
        <div class="chart-wrapper-inner">
          <v-chart class="chart" :option="option" autoresize />
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>

<script setup>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart } from "echarts/charts"
import { GridComponent, LegendComponent } from "echarts/components"
import VChart from "vue-echarts"
import { toRefs, computed } from "vue"
import dayjs from "dayjs"
import iconDict from "../assets/iconDict.json"

use([CanvasRenderer, LineChart, GridComponent, LegendComponent])

const props = defineProps({
  dailyData: Array,
  historyData: Object,
})

const { dailyData, historyData } = toRefs(props)

const option = computed(() => {
  const axis = dailyData.value.map((item) => dayjs(item.fxTime).format("HH:00"))
  const weatherIcons = {}
  const iconIndex = [...new Set(dailyData.value.map((item) => item.icon))]
  iconIndex.forEach((icon) => {
    weatherIcons["i" + icon] = iconDict["i" + icon]
  })
  const data = {
    name: "今日气温",
    type: "line",
    label: {
      show: true,
      position: "top",
      formatter: "{b}: {c}",
    },

    smooth: true,
    data: dailyData.value.map((item) => ({
      name: item.text,
      value: item.temp,
      symbol: weatherIcons["i" + item.icon],
      symbolSize: 14,
      symbolOffset: [0, "70%"],
    })),
  }
  const historyIndoor = {
    name: "昨日室内",
    type: "line",
    label: {
      show: false,
    },
    smooth: true,
    data: historyData.value.indoorTemp,
  }
  const historyOutdoor = {
    name: "昨日室外",
    type: "line",
    label: {
      show: false,
    },
    smooth: true,
    data: historyData.value.outdoorTemp,
  }
  return {
    color: [
      "rgba(131,96,195,0.4)",
      "rgba(250,200,88,0.4)",
      "#2ebf91",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
    legend: {
      left: 20,
      top: 0,
      data: ["昨日室内", "昨日室外", "今日室外"],
    },
    xAxis: {
      type: "category",
      data: axis,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
      min: function (value) {
        return value.min - 5
      },
    },
    grid: {
      top: 25,
      bottom: 30,
      left: 30,
      right: 10,
    },
    series: [historyIndoor, historyOutdoor, data],
  }
})
</script>

<style scoped>
.chart {
  height: 20vh;
}
.chart-wrapper {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
.chart-wrapper-inner {
  width: 300vw;
}
</style>
