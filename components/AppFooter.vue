<template>
  <footer class="footer">
    <div class="inner">
      <div class="brand">
        <!-- <span class="mark" /> -->
        <img src="/celte-logo-white.png" alt="Celte logo" class="h-10 logo-light" />
        <span class="wordmark">CELTE</span>
      </div>
      <!-- <p class="tagline">Dynamic server meshing for every game studio.</p> -->
       <p class="tagline">Breaking the limit that the technique imposes on creativity.
       </p>
      <nav class="links">
        <NuxtLink to="/technology">Technology</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <!-- <a href="https://docs.celte.dev" target="_blank" rel="noopener">Docs</a> -->
      </nav>
      <div class="socials">
        <a href="https://x.com/CelteSystem" target="_blank" rel="noopener" aria-label="X (Twitter)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/celte-system" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
      <!-- <p class="copy">© 2026 Celte.</p> Dynamic date with year -->
       <p class="copy">© {{ new Date().getFullYear() }} Celte.</p>
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

.socials {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.socials a {
  color: rgba(212, 235, 235, 0.35);
  transition: color 0.2s;
  display: flex;
}

.socials a:hover {
  color: var(--text);
}

.copy {
  font-size: 13px;
  color: rgba(212, 235, 235, 0.18);
  margin-top: 0.5rem;
}
</style>
