<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import awsPrices from '~/data/prices-aws.json';

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
]);

// Trier les données par nombre de vCPUs
const sortedData = [...awsPrices].sort((a, b) => a.vCPUs - b.vCPUs);

const chartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: (params: any) => {
      const data = params[0].data;
      const instance = sortedData[params[0].dataIndex];
      return `
        <div class="font-semibold">${instance.instance}</div>
        <div>vCPUs: ${instance.vCPUs}</div>
        <div>Memory: ${instance.memoryGiB} GiB</div>
        <div>Price per hour: $${instance.pricePerHourUSD.toFixed(4)}</div>
        // todo: make a calculation for the price per vCPU/hour
        <div>Price per vCPU/hour: $${(instance.pricePerHourUSD / instance.vCPUs).toFixed(4)}</div>
      `;
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: sortedData.map(item => item.instance),
    axisLabel: {
      interval: 0,
      rotate: 45
    }
  },
  yAxis: [
    {
      type: 'value',
      name: 'Price per Hour ($)',
      position: 'left',
      axisLabel: {
        formatter: (value: number) => `$${value.toFixed(2)}`
      }
    },
    {
      type: 'value',
      name: 'vCPUs',
      position: 'right',
      splitLine: {
        show: false
      }
    }
  ],
  dataZoom: [
    {
      type: 'slider',
      show: true,
      bottom: 0,
      height: 20
    }
  ],
  series: [
    {
      name: 'Price per Hour',
      type: 'bar',
      data: sortedData.map(item => item.pricePerHourUSD),
      itemStyle: {
        color: '#3b82f6' // blue-500
      }
    },
    {
      name: 'vCPUs',
      type: 'line',
      yAxisIndex: 1,
      data: sortedData.map(item => item.vCPUs),
      itemStyle: {
        color: '#ef4444' // red-500
      },
      lineStyle: {
        width: 2
      }
    }
  ]
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        AWS Instance Price Comparison
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Comparing instance sizes, vCPUs, and hourly pricing
      </p>
      <div class="h-[500px]">
        <v-chart class="chart" :option="chartOption" autoresize />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>