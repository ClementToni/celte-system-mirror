<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { EChartsType } from 'echarts/core';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

// Generate data for 12 months
const months = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
const vmCost = 600; // Constant VM cost at 600€
const vmData = Array(12).fill(600);

// Static data points for Dynamic Server Meshing
const dsmData = [
  600, // Month 1
  520, // Month 2
  480, // Month 3
  530, // Month 4
  500, // Month 5
  450, // Month 6
  400, // Month 7
  580, // Month 8
  550, // Month 9
  600, // Month 10
  570, // Month 11
  620  // Month 12
];

const totalCostSM = dsmData.reduce((acc, curr) => acc + curr, 0);
const totalCostVM = vmData.reduce((acc, curr) => acc + curr, 0);

const totalCostSMPercentage = ((totalCostVM - totalCostSM) / totalCostVM) * 100;

const chartOption = {
  title: {
    text: 'Cost Comparison: Traditional VM vs Dynamic Server Meshing',
    left: 'center',
    top: 20,
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#ffffff'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params: any) => {
      const month = params[0].axisValue;
      const vmCost = params[0].data.toFixed(2);
      const dsmCost = params[1].data.toFixed(2);
      return `
        <div class="font-semibold">${month}</div>
        <div>VM Cost: €${vmCost}</div>
        <div>Dynamic Server Meshing: €${dsmCost}</div>
      `;
    }
  },
  legend: {
    data: ['Traditional VM', 'Dynamic Server Meshing'],
    bottom: 0,
    textStyle: {
      color: '#ffffff'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: months,
    name: 'Time',
    nameLocation: 'middle',
    nameGap: 30,
    axisLabel: {
      interval: 0,
      color: '#ffffff'
    },
    nameTextStyle: {
      color: '#ffffff'
    }
  },
  yAxis: {
    type: 'value',
    name: 'Cost (€)',
    nameLocation: 'middle',
    nameGap: 70,
    axisLabel: {
      formatter: (value: number) => `€${value.toFixed(2)}`,
      color: '#ffffff'
    },
    nameTextStyle: {
      color: '#ffffff'
    }
  },
  series: [
    {
      name: 'Traditional VM',
      type: 'line',
      data: vmData,
      itemStyle: {
        color: '#ef4444' // red-500
      },
      lineStyle: {
        width: 2
      },
      symbol: 'circle',
      symbolSize: 6
    },
    {
      name: 'Dynamic Server Meshing',
      type: 'line',
      data: dsmData,
      itemStyle: {
        color: '#10b981' // emerald-500
      },
      lineStyle: {
        width: 3
      },
      symbol: 'circle',
      symbolSize: 6,
      animationDuration: 5000, // Animation duration in milliseconds
      animationEasing: 'cubicInOut' // Animation easing function
    }
  ]
};

const chartRef = ref<InstanceType<typeof VChart> | null>(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isVisible.value && chartRef.value?.chart) {
        isVisible.value = true;
        const chart: EChartsType = chartRef.value.chart;
        chart.setOption({
          series: [
            {
              name: 'Traditional VM',
              type: 'line',
              data: [],
              itemStyle: {
                color: '#ef4444'
              }
            },
            {
              name: 'Dynamic Server Meshing',
              type: 'line',
              data: [],
              itemStyle: {
                color: '#10b981'
              }
            }
          ]
        });

        setTimeout(() => {
          chart.setOption({
            series: [
              {
                name: 'Traditional VM',
                data: vmData,
                animationDuration: 2000,
                animationEasing: 'cubicInOut'
              },
              {
                name: 'Dynamic Server Meshing',
                data: dsmData,
                animationDuration: 5000,
                animationEasing: 'cubicInOut'
              }
            ]
          });
        }, 100);
      }
    });
  }, {
    threshold: 1,
    rootMargin: '-200px 0px'
  });

  if (chartRef.value) {
    observer.observe(chartRef.value.$el);
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-7">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div class="h-[500px]">
        <v-chart ref="chartRef" class="chart" :option="chartOption" autoresize />
      </div>
    </div>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center -mt-7 mb-16">
    <div class="text-center">
      <!-- <h2 class="text-2xl font-bold mb-4">Cost Comparison: Traditional VM vs Dynamic Server Meshing</h2> -->
      <p class="">
        This chart shows the cost comparison between a traditional VM and Dynamic Server Meshing over a period of 12 months.

      </p>
      <p class="">
        Same game {{ totalCostSMPercentage.toFixed(0) }}% cheaper with Dynamic Server Meshing
      </p>
    </div>
    <!-- <div class>
      <h2 class="text-2xl font-bold mb-4">Total cost for 12 months</h2>
      <p class="text-gray-600 dark:text-gray-400">
        The total cost for 12 months of Traditional VM is {{ totalCostVM }}€.
      </p>
    </div>
    <div class>
      <h2 class="text-2xl font-bold mb-4">Total cost for 12 months</h2>
      <p class="text-gray-600 dark:text-gray-400">
        The total cost for 12 months of Dynamic Server Meshing is {{ totalCostSM }}€.
      </p>
    </div> -->
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>