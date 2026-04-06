<template>
  <header class="nav" :class="{ scrolled }">
    <div class="inner">
      <NuxtLink to="/" class="logo">
        <!-- <span class="mark" /> -->
        <img src="/celte-logo-white.png" alt="Celte logo" class="h-10 logo-light" />
        <span class="wordmark">CELTE</span>
      </NuxtLink>
      <nav class="links">
        <a href="/#product" class="link">Product</a>
        <NuxtLink to="/technology" class="link">Technology</NuxtLink>
        <!-- <a href="https://docs.celte.dev" target="_blank" rel="noopener" class="link">Docs</a> -->
        <NuxtLink to="/contact" class="cta">Contact Us →</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const scrolled = ref(false)

onMounted(() => {
  const handler = () => {
    scrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handler, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handler))
})
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  transition: background 0.4s, border-color 0.4s;
}

.nav.scrolled {
  background: rgba(3, 7, 5, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-color: var(--border);
}

.inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mark {
  width: 20px;
  height: 20px;
  background: var(--accent);
  border-radius: 4px;
  display: block;
  flex-shrink: 0;
}

.wordmark {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text);
}

.links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.link {
  font-size: 14px;
  font-weight: 300;
  color: var(--text);
  transition: color 0.2s;
}

.link:hover {
  color: var(--text);
}

.cta {
  font-size: 14px;
  font-weight: 400;
  color: var(--accent);
  border: 1px solid rgba(128, 224, 199, 0.25);
  padding: 8px 22px;
  border-radius: 6px;
  transition: background 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.cta:hover {
  background: rgba(128, 224, 199, 0.08);
  border-color: rgba(128, 224, 199, 0.6);
}

@media (max-width: 640px) {
  .links {
    gap: 1.25rem;
  }

  .link:not(:last-child):not(.cta) {
    display: none;
  }
}
</style>
