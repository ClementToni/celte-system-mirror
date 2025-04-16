<script setup lang="ts">
import { ref, computed } from 'vue';
import { awsInstances } from '~/data/awsPricing';

const selectedCategory = ref<string>('all');
const searchQuery = ref('');
const sortBy = ref<string>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

const categories = ['all', 'General Purpose', 'Compute Optimized', 'Memory Optimized'];

const filteredInstances = computed(() => {
  let instances = [...awsInstances];

  // Filter by category
  if (selectedCategory.value !== 'all') {
    instances = instances.filter(instance => instance.category === selectedCategory.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    instances = instances.filter(instance =>
      instance.name.toLowerCase().includes(query) ||
      instance.category.toLowerCase().includes(query)
    );
  }

  // Sort instances
  instances.sort((a, b) => {
    const aValue = a[sortBy.value as keyof typeof a];
    const bValue = b[sortBy.value as keyof typeof b];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return instances;
});

const toggleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
};

const formatPrice = (price: number) => {
  return `$${price.toFixed(4)}`;
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">AWS Instance Pricing Comparison</h2>

    <!-- Filters -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search instances..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="flex gap-2">
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in ['name', 'vCPU', 'memory', 'storage', 'network', 'pricePerHour']"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="toggleSort(header)"
            >
              <div class="flex items-center gap-1">
                {{ header }}
                <span v-if="sortBy === header" class="text-blue-500">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="instance in filteredInstances"
            :key="instance.name"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ instance.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ instance.vCPU }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ instance.memory }} GB
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ instance.storage }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ instance.network }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatPrice(instance.pricePerHour) }}/hour
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Monthly Cost Estimate -->
    <div class="mt-8 bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Monthly Cost Estimate</h3>
      <p class="text-gray-600">
        Monthly cost is calculated based on 730 hours (average hours in a month)
      </p>
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="instance in filteredInstances"
          :key="instance.name"
          class="p-4 border border-gray-200 rounded-lg"
        >
          <div class="font-medium text-gray-900">{{ instance.name }}</div>
          <div class="text-gray-500">
            Monthly Cost: {{ formatPrice(instance.pricePerHour * 730) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>