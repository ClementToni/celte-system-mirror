<template>
  <div class="bg-primary-200 px-6 py-8 rounded-lg flex flex-col min-h-[300px] w-full"
       :class="[centerContent ? 'justify-center' : '']">
    <div :class="[centerContent ? 'text-center' : 'text-center flex-grow']">
      <h2 class="text-black text-xl md:text-2xl lg:text-3xl font-semibold mb-6">{{ title }}</h2>
      <img v-if="icon" :src="icon" :alt="title" class="w-16 h-16 mx-auto mb-6 mt-2">
      <div class="relative w-full">
        <p class="text-black/80 text-sm md:text-base">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    fixWidth: {
      type: Boolean,
      default: false
    },
    centerContent: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
/* Styles pour l'animation de transition */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
