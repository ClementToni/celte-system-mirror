<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { comparisonData } from '~/data/awsPricing';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const costChartData = {
  labels: ['Monthly Cost'],
  datasets: [
    {
      label: '10 instances m5.xlarge',
      backgroundColor: '#36A2EB',
      data: [comparisonData.smallInstances.totalPricePerMonth]
    },
    {
      label: '1 instance m5.10xlarge',
      backgroundColor: '#FF6384',
      data: [comparisonData.largeInstance.totalPricePerMonth]
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(tickValue: number | string) {
          const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
          return `$${value.toLocaleString()}`;
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Cost Comparison'
    }
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="h-[300px]">
        <Bar
          :data="costChartData"
          :options="chartOptions"
        />
      </div>
    </div>
  </div>
</template>