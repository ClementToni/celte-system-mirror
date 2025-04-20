<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { comparisonData } from '~/data/awsPricing';

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

const chartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: (params: any) => {
      const value = params[0].value;
      return `${params[0].name}: $${value.toLocaleString()}`;
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Monthly Cost'],
    axisLabel: {
      interval: 0,
      rotate: 0
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => `$${value.toLocaleString()}`
    }
  },
  series: [
    {
      name: '10 instances m5.xlarge',
      type: 'bar',
      data: [comparisonData.smallInstances.totalPricePerMonth],
      itemStyle: {
        color: '#3b82f6' // blue-500
      }
    },
    {
      name: '1 instance m5.10xlarge',
      type: 'bar',
      data: [comparisonData.largeInstance.totalPricePerMonth],
      itemStyle: {
        color: '#ef4444' // red-500
      }
    }
  ]
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Monthly Cost Comparison
      </h3>
      <div class="h-[300px]">
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