<template>
  <div class="app-root">
    <div class="mouse-glow" :style="glowStyle" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const LERP = 0.08

const target = reactive({ x: 0.5, y: 0.5 })
const current = reactive({ x: 0.5, y: 0.5 })

let raf: number

function onMouseMove(e: MouseEvent) {
  target.x = e.clientX / window.innerWidth
  target.y = e.clientY / window.innerHeight
}

function tick() {
  current.x += (target.x - current.x) * LERP
  current.y += (target.y - current.y) * LERP
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(raf)
})

const glowStyle = computed(() => ({
  '--gx': `${current.x * 100}%`,
  '--gy': `${current.y * 100}%`,
}))
</script>

<style>
.app-root {
  position: relative;
  isolation: isolate;
}

.mouse-glow {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    800px circle at var(--gx, 50%) var(--gy, 50%),
    rgba(128, 224, 199, 0.045),
    transparent 70%
  );
  will-change: background;
}
</style>
