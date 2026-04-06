<template>
  <div>
    <AppNav />

    <!-- ─── Hero ─────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg">
        <GlobeBackground />
        <div class="hero-glow" />
        <div class="hero-grid" />
      </div>
      <div class="container">
        <div class="eyebrow">Dynamic Server Meshing · GDK</div>
        <h1 class="hero-h1">
          Dynamic server meshing<br />
          for every game studio.
        </h1>
        <p class="hero-sub">
          The GDK that makes worlds with infinite player count a reality.
          <!-- <br /> -->
          <!-- Built in Rust. Available for Unity, C# and any language via FFI. -->
        </p>
        <!-- <div class="hero-actions">
          <NuxtLink to="/contact" class="btn-primary">Contact Us →</NuxtLink>
          <a href="https://docs.celte.dev" target="_blank" rel="noopener" class="btn-ghost">
            Read the docs
          </a>
        </div> -->
        <div class="stats-band">
          <div v-for="(stat, i) in stats" :key="stat.val">
            <div class="stat">
              <span class="stat-val">{{ stat.val }}</span>
              <span class="stat-key">{{ stat.key }}</span>
            </div>
            <span v-if="i < stats.length - 1" class="sep">·</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Statement ─────────────────────────────────────────── -->
    <section class="statement">
      <div class="container">
        <p class="statement-text">
          <span class="t-muted">We make impossibly</span><br />
          <span class="t-accent">massive games a reality.</span>
        </p>
        <div class="statement-rule" />
      </div>
    </section>

    <!-- ─── Scroll reveal: allocation ────────────────────────── -->
    <section ref="revealLeft" class="reveal-section">
      <div class="reveal-inner container">
        <div class="reveal-text-col">
          <p ref="revealText1" class="reveal-text">
            <span v-for="w in leftWords" :key="w.id" class="word">{{ w.t }}</span>
          </p>
        </div>
        <div class="reveal-callout-col">
          <div class="callout">
            <div class="callout-stat">
              <span class="callout-val">&lt;&nbsp;1ms</span>
              <span class="callout-unit">overhead</span>
            </div>
            <h3 class="callout-title">Authority transfer</h3>
            <p class="callout-desc">
              When players cross server boundaries, Celte hands off authority in microseconds.
              No pop-ins. No loading screens. No latency spikes.
            </p>
            <NuxtLink to="/technology" class="callout-link">See how it works →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Scroll reveal: scaling ────────────────────────────── -->
    <section ref="revealRight" class="reveal-section reveal-section--rev">
      <div class="reveal-inner container">
        <div class="reveal-callout-col">
          <div class="callout">
            <div class="callout-stat">
              <span class="callout-val">up to –40%</span>
              <span class="callout-unit">infra costs</span>
            </div>
            <h3 class="callout-title">Pay for players, not servers</h3>
            <p class="callout-desc">
              Server capacity scales with your CCU in real time. Idle servers shut down
              automatically. Peak loads spin up instantly.
            </p>
            <div class="graph-schematic">
              <div class="graph-row">
                <span class="graph-label">CCU</span>
                <div class="graph-bars">
                  <div
                    v-for="(h, i) in graphBars"
                    :key="i"
                    class="graph-bar ccu-bar"
                    :style="{ height: h + '%' }"
                  />
                </div>
              </div>
              <div class="graph-row">
                <span class="graph-label">Servers</span>
                <div class="graph-bars">
                  <div
                    v-for="(h, i) in serverBars"
                    :key="i"
                    class="graph-bar srv-bar"
                    :style="{ height: h + '%' }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reveal-text-col">
          <p ref="revealText2" class="reveal-text">
            <span v-for="w in rightWords" :key="w.id" class="word">{{ w.t }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- ─── Features ─────────────────────────────────────────── -->
    <section id="product" class="features">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">How it works</div>
          <h2 class="section-title">Built for scale from day one.</h2>
        </div>
        <div class="features-grid">
          <div v-for="(f, i) in features" :key="f.title" class="feature-card">
            <span class="feature-num">0{{ i + 1 }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <CostComparison />

    <!-- ─── CTA ───────────────────────────────────────────────── -->
    <section class="cta-band">
      <div class="container">
        <h2 class="cta-h2">
          Ready to build the next<br />
          generation of multiplayer?
        </h2>
        <div class="cta-actions">
          <NuxtLink to="/contact" class="btn-primary">Contact Us →</NuxtLink>
          <NuxtLink to="/technology" class="btn-ghost">See how it works</NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const stats = [
  { val: '< 1ms', key: 'authority transfer' },
  { val: '∞', key: 'players per world' },
  { val: '–40%', key: 'infra costs' },
  { val: 'Any language', key: 'via FFI' },
]

const LEFT_TEXT =
  'We dynamically allocate resources in seamlessly without loading time.'
const RIGHT_TEXT =
  'We scale your servers up and down automatically. You only pay for what your players use.'

const leftWords = LEFT_TEXT.split(' ').map((t, id) => ({ id, t }))
const rightWords = RIGHT_TEXT.split(' ').map((t, id) => ({ id, t }))

const graphBars = [18, 30, 52, 78, 95, 88, 65, 72, 90, 68, 42, 22]
const serverBars = graphBars.map((h) => Math.round(h * 0.85 + Math.random() * 8))

const features = [
  {
    title: 'Authority Transfer',
    desc: 'Players cross server boundaries with zero interruption. Authority hands off in microseconds via a Rust-native protocol so players don\'t notice it.',
  },
  {
    title: 'Load Balancing',
    desc: 'Game entities are redistributed automatically across servers based on spatial density and compute load. No manual shard configuration.',
  },
  {
    title: 'Dynamic Scaling',
    desc: 'Server instances spin up and down with your CCU. Peak loads are absorbed in real time. Idle capacity is reclaimed immediately.',
  },
  {
    title: 'Any Language',
    desc: 'The Celte core is pure Rust. A native C# SDK targets Unity directly. Every other language is supported through a stable FFI layer.',
  },
]

const revealLeft = ref<HTMLElement>()
const revealRight = ref<HTMLElement>()
const revealText1 = ref<HTMLElement>()
const revealText2 = ref<HTMLElement>()

function setupReveal(sectionEl: HTMLElement, textEl: HTMLElement): () => void {
  const words = textEl.querySelectorAll<HTMLElement>('.word')

  const update = () => {
    const { top, height } = sectionEl.getBoundingClientRect()
    const vh = window.innerHeight
    const progress = (vh * 0.85 - top) / (height * 0.7)

    words.forEach((word, i) => {
      const threshold = i / words.length
      const opacity = Math.max(0.15, Math.min(1, (progress - threshold * 0.5) * 2.5))
      word.style.opacity = String(opacity)
    })
  }

  window.addEventListener('scroll', update, { passive: true })
  update()
  return () => window.removeEventListener('scroll', update)
}

onMounted(() => {
  if (!revealLeft.value || !revealText1.value) return
  if (!revealRight.value || !revealText2.value) return

  const c1 = setupReveal(revealLeft.value, revealText1.value)
  const c2 = setupReveal(revealRight.value, revealText2.value)

  onUnmounted(() => {
    c1()
    c2()
  })
})
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────── */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Buttons ─────────────────────────────────────────────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 28px;
  background: var(--accent);
  color: #030705;
  border-radius: 6px;
  letter-spacing: 0.01em;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-primary:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  padding: 12px 28px;
  border: 1px solid var(--text);
  color: var(--muted);
  border-radius: 6px;
  transition: border-color 0.2s, color 0.2s;
}

.btn-ghost:hover {
  border-color: rgba(212, 235, 235, 0.4);
  color: var(--text);
}

/* ── Eyebrow / labels ────────────────────────────────────────── */
.eyebrow {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

/* ── Hero ─────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 7rem 0 5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 90% 70% at 50% 40%,
    rgba(128, 224, 199, 0.045) 0%,
    transparent 65%
  );
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 72px 72px;
  /* opacity: 0.8; */
  -webkit-mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 75%);
}

.hero .container {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-h1 {
  font-size: clamp(42px, 6vw, 72px);
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: var(--text);
  max-width: 820px;
  margin-bottom: 1.75rem;
}

.hero-sub {
  font-size: 17px;
  font-weight: 300;
  line-height: 1.65;
  color: var(--text);
  /* bold */
  font-weight: 400;
  max-width: 520px;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
}

.stats-band {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem 2rem;
  background: rgba(10, 23, 16, 0.6);
}

.stats-band > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-val {
  font-size: 15px;
  font-weight: 400;
  color: var(--text);
  white-space: nowrap;
}

.stat-key {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.sep {
  color: var(--border);
  font-size: 18px;
  margin: 0 0.25rem;
  align-self: center;
}

/* ── Statement ───────────────────────────────────────────────── */
.statement {
  padding: 8rem 0;
  border-top: 1px solid var(--border);
}

.statement-text {
  font-size: clamp(44px, 6.5vw, 88px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.t-muted {
  color: rgba(212, 235, 235, 0.45);
}

.t-accent {
  color: var(--accent);
}

.statement-rule {
  width: 48px;
  height: 1px;
  background: var(--accent);
  margin-top: 3rem;
  opacity: 0.5;
}

/* ── Scroll reveal sections ───────────────────────────────────── */
.reveal-section {
  padding: 9rem 0;
  border-top: 1px solid var(--border);
}

.reveal-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.reveal-text-col,
.reveal-callout-col {
  min-width: 0;
}

.reveal-section--rev .reveal-inner {
  direction: rtl;
}

.reveal-section--rev .reveal-text-col,
.reveal-section--rev .reveal-callout-col {
  direction: ltr;
}

.reveal-text {
  font-size: clamp(28px, 3.5vw, 50px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--text);
}

.word {
  display: inline-block;
  opacity: 0.15;
  transition: opacity 0.1s;
  margin-right: 0.22em;
}

/* ── Callout ────────────────────────────────────────────────── */
.callout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(10, 23, 16, 0.5);
}

.callout-stat {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.callout-val {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--accent);
  line-height: 1;
}

.callout-unit {
  font-size: 13px;
  color: var(--muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.callout-title {
  font-size: 17px;
  font-weight: 400;
  color: var(--text);
  letter-spacing: -0.02em;
}

.callout-desc {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--muted);
}

.callout-link {
  font-size: 13px;
  color: var(--text);
  opacity: 0.7;
  transition: opacity 0.2s;
  margin-top: 0.25rem;
}

.callout-link:hover {
  opacity: 1;
}

/* ── Graph schematic ────────────────────────────────────────── */
.graph-schematic {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.graph-row {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}

.graph-label {
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  width: 44px;
  flex-shrink: 0;
  padding-bottom: 2px;
}

.graph-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 32px;
  flex: 1;
}

.graph-bar {
  flex: 1;
  border-radius: 2px 2px 0 0;
  min-height: 4px;
}

.ccu-bar {
  background: var(--accent);
  opacity: 0.7;
}

.srv-bar {
  background: rgba(212, 235, 235, 0.3);
}

/* ── Features ───────────────────────────────────────────────── */
.features {
  padding: 9rem 0;
  border-top: 1px solid var(--border);
}

.section-header {
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-top: 0.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.feature-card {
  padding: 2.5rem 2rem;
  background: var(--bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.25s;
}

.feature-card:last-child {
  border-right: none;
}

.feature-card:hover {
  background: var(--surface);
}

.feature-num {
  font-size: 12px;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.feature-title {
  font-size: 16px;
  font-weight: 400;
  color: var(--text);
  letter-spacing: -0.02em;
}

.feature-desc {
  font-size: 13.5px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--muted);
}

/* ── CTA band ───────────────────────────────────────────────── */
.cta-band {
  padding: 9rem 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.cta-h2 {
  font-size: clamp(32px, 4.5vw, 58px);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  line-height: 1.1;
  margin-bottom: 2.5rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .reveal-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
    direction: ltr !important;
  }

  .reveal-section--rev .reveal-text-col {
    order: 2;
  }

  .features-grid {
    grid-template-columns: 1fr 1fr;
  }

  .feature-card:nth-child(2) {
    border-right: none;
  }

  .feature-card:nth-child(3) {
    border-right: 1px solid var(--border);
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .feature-card:last-child {
    border-bottom: none;
  }
}
</style>
