<script setup lang="ts">
import { comparisonData } from '~/data/awsPricing';
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-xl font-semibold mb-4">Récapitulatif</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Configuration</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vCPU Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mémoire Totale</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût par heure</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût mensuel</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ comparisonData.smallInstances.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ comparisonData.smallInstances.totalVCPU }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ comparisonData.smallInstances.totalMemory }} GB
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ comparisonData.smallInstances.totalPricePerHour.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ comparisonData.smallInstances.totalPricePerMonth.toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ comparisonData.largeInstance.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ comparisonData.largeInstance.totalVCPU }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ comparisonData.largeInstance.totalMemory }} GB
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ comparisonData.largeInstance.totalPricePerHour.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ comparisonData.largeInstance.totalPricePerMonth.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>