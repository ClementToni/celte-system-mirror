<template>
  <section ref="sectionRef" class="cost-section">
    <div class="container">
      <div class="eyebrow">Infrastructure costs</div>
      <div class="cost-intro-grid">
        <h2 class="cost-h2">Stop paying for empty servers.</h2>
        <p class="cost-sub">
          Traditional infrastructure provisions for peak at all times, you pay for 100% capacity
          even at 3am. Celte tracks your real CCU inside your game world and your bill follows.
        </p>
      </div>

      <div class="cost-chart-wrap">
        <svg ref="costSvg" class="cost-svg" viewBox="0 0 800 220" preserveAspectRatio="none">
          <path
            ref="savingsFill"
            class="savings-fill"
            d="M0,45 L800,45 L800,195 C750,190 700,180 640,152 C580,118 540,92 480,63
               C430,40 410,36 380,53 C300,98 270,142 200,165 C100,195 50,200 0,205 Z"
          />
          <path ref="staticPath" class="static-line" d="M0,45 L800,45" />
          <path
            ref="celtePath"
            class="celte-line"
            d="M0,205 C50,200 100,195 200,165 C270,142 300,98 380,53
               C410,36 430,40 480,63 C540,92 580,118 640,152 C700,180 750,190 800,195"
          />
        </svg>
        <div class="cost-axis">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
        <div class="savings-badge">
          <span class="savings-val">–{{ savingsPct }}%</span>
          <span class="savings-label">avg. infra cost</span>
        </div>
      </div>

      <div class="cost-legend">
        <div class="legend-item">
          <span class="legend-line legend-line--static" />
          <span>Static fleet (traditional)</span>
        </div>
        <div class="legend-item">
          <span class="legend-line legend-line--celte" />
          <span>Dynamic fleet (Celte)</span>
        </div>
        <div class="legend-item">
          <span class="legend-swatch" />
          <span>Wasted spend</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement>()
const staticPath = ref<SVGPathElement>()
const celtePath = ref<SVGPathElement>()
const savingsFill = ref<SVGPathElement>()
const savingsPct = ref(0)
const chartAnimated = ref(false)

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function animateCostChart() {
  if (chartAnimated.value) return
  chartAnimated.value = true

  const sPath = staticPath.value!
  const cPath = celtePath.value!
  const fill = savingsFill.value!

  const sLen = sPath.getTotalLength()
  const cLen = cPath.getTotalLength()

  sPath.style.strokeDasharray = `${sLen}`
  sPath.style.strokeDashoffset = `${sLen}`
  cPath.style.strokeDasharray = `${cLen}`
  cPath.style.strokeDashoffset = `${cLen}`
  fill.style.opacity = '0'

  const STATIC_DURATION = 500
  const CELTE_DELAY = 150
  const CELTE_DURATION = 1600
  const FILL_DELAY = 900
  const FILL_DURATION = 500
  const COUNTER_DELAY = 500
  const COUNTER_DURATION = 1200

  const startTime = performance.now()

  function tick(now: number) {
    const elapsed = now - startTime

    const sProgress = Math.min(1, elapsed / STATIC_DURATION)
    sPath.style.strokeDashoffset = `${sLen * (1 - easeInOut(sProgress))}`

    const cProgress = Math.min(1, Math.max(0, elapsed - CELTE_DELAY) / CELTE_DURATION)
    cPath.style.strokeDashoffset = `${cLen * (1 - easeInOut(cProgress))}`

    const fProgress = Math.min(1, Math.max(0, elapsed - FILL_DELAY) / FILL_DURATION)
    fill.style.opacity = `${easeInOut(fProgress)}`

    const ctProgress = Math.min(1, Math.max(0, elapsed - COUNTER_DELAY) / COUNTER_DURATION)
    savingsPct.value = Math.round(easeInOut(ctProgress) * 30)

    if (sProgress < 1 || cProgress < 1 || fProgress < 1 || ctProgress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!sectionRef.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCostChart()
        observer.disconnect()
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(sectionRef.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.eyebrow {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.cost-section {
  padding: 7rem 0;
  border-bottom: 1px solid var(--border);
}

.cost-intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: end;
  margin-bottom: 3rem;
}

.cost-h2 {
  font-size: clamp(26px, 3.2vw, 44px);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  line-height: 1.1;
}

.cost-sub {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.75;
  color: rgba(212, 235, 235, 0.65);
}

.cost-chart-wrap {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem 2.5rem 0;
  background: rgba(10, 23, 16, 0.4);
  overflow: hidden;
}

.cost-svg {
  width: 100%;
  height: 190px;
  display: block;
}

.savings-fill {
  fill: rgba(128, 224, 199, 0.07);
  stroke: none;
}

.static-line {
  fill: none;
  stroke: rgba(212, 235, 235, 0.3);
  stroke-width: 1.5;
  stroke-dasharray: 6 4;
}

.celte-line {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cost-axis {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0 1.5rem;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.04em;
  border-top: 1px solid var(--border);
  margin-top: 0.25rem;
}

.savings-badge {
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.savings-val {
  font-size: 42px;
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--accent);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  min-width: 5ch;
  text-align: right;
}

.savings-label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.cost-legend {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 13px;
  color: var(--muted);
}

.legend-line {
  width: 24px;
  height: 2px;
  border-radius: 1px;
  flex-shrink: 0;
}

.legend-line--static {
  background: rgba(212, 235, 235, 0.3);
}

.legend-line--celte {
  background: var(--accent);
}

.legend-swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: rgba(128, 224, 199, 0.2);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .cost-intro-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
