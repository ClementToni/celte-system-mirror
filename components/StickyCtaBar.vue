<template>
  <Transition name="slide-down">
    <div v-if="showBar" class="sticky-cta-bar fixed top-0 left-0 right-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-[#00D9FF]/20 shadow-[0_4px_20px_rgba(0,217,255,0.15)]">
      <div class="content max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <span class="text text-white font-semibold text-lg">
          Interested in Celte?
        </span>
        <div class="actions flex gap-4">
          <a
            href="https://zcal.co/clement-toni/30min"
            class="btn-small bg-gradient-to-r from-[#00D9FF] to-[#0084FF] text-[#0A0E1A] px-6 py-2 rounded-full font-bold hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all"
          >
            Book a demo
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBar = ref(false)
let scrollThreshold = 800 // Show after scrolling 800px

const handleScroll = () => {
  showBar.value = window.scrollY > scrollThreshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.sticky-cta-bar {
  backdrop-filter: blur(10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .actions {
    width: 100%;
    justify-content: center;
  }
}
</style>


