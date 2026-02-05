<template>
  <Transition name="slide-down">
    <div v-if="showBar" class="sticky-cta-bar fixed top-0 left-0 right-0 z-50 bg-[#0047FF] shadow-lg">
      <div class="content max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <span class="text text-white font-semibold text-lg">
          Interested in Celte?
        </span>
        <div class="actions flex gap-4">
          <!-- <a
            href="mailto:celte.system@gmail.com?subject=Investor Inquiry"
            class="btn-small bg-white text-[#0047FF] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-all"
          >
            Investor Deck
          </a>
          <a
            href="mailto:celte.system@gmail.com?subject=Beta Program Inquiry"
            class="btn-small-outline border-2 border-white text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-[#0047FF] transition-all"
          >
            Join Beta
          </a> -->
          <a
            href="https://zcal.co/clement-toni/30min"
            class="btn-small bg-white text-[#0047FF] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-all"
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


