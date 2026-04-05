<template>
  <footer class="footer">
    <div class="inner">
      <div class="brand">
        <span class="mark" />
        <span class="wordmark">CELTE</span>
      </div>
      <p class="tagline">Dynamic server meshing for every game studio.</p>
      <nav class="links">
        <NuxtLink to="/technology">Technology</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <a href="https://docs.celte.dev" target="_blank" rel="noopener">Docs</a>
      </nav>
      <p class="copy">© 2026 Celte. Built in Rust.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 5rem 2rem 3rem;
}

.inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mark {
  width: 18px;
  height: 18px;
  background: var(--accent);
  border-radius: 3px;
  display: block;
}

.wordmark {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text);
}

.tagline {
  font-size: 14px;
  color: var(--muted);
  font-weight: 300;
}

.links {
  display: flex;
  gap: 2.5rem;
}

.links a {
  font-size: 14px;
  color: var(--muted);
  transition: color 0.2s;
}

.links a:hover {
  color: var(--text);
}

.copy {
  font-size: 13px;
  color: rgba(212, 235, 235, 0.18);
  margin-top: 0.5rem;
}
</style>
