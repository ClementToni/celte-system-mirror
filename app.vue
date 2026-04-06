<template>
  <div ref="root" class="app-root">
    <div class="mouse-glow" :style="glowStyle" />
    <canvas v-if="!isTouchDevice" v-show="!isOverInteractive" ref="cursorCanvas" class="cursor-canvas" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// ── Types ────────────────────────────────────────────────────────────
interface MeshNode {
  x: number; y: number       // position relative to canvas center
  vx: number; vy: number     // drift velocity
  alpha: number              // current opacity 0→1
  targetAlpha: number        // 1 while alive, 0 when dying
  spawnRing: number          // 1→0 spawn ring progress
  lifetime: number           // total lifespan in ms
  age: number                // elapsed ms
}

// ── Constants ────────────────────────────────────────────────────────
const LERP_GLOW    = 0.08
const LERP_CURSOR  = 0.22
const CANVAS_SIZE  = 140         // canvas width/height in px
const HALF         = CANVAS_SIZE / 2
const MAX_NODES    = 5
const SPAWN_EVERY  = 900         // ms between spawn attempts
const NODE_SPEED   = 0.018       // drift speed (px/ms)
const CONNECT_DIST = 55          // max px for drawing an edge
const MIN_LIFE     = 2200
const MAX_LIFE     = 4000

const TEAL = [128, 224, 199] as const

function rgba(a: number) { return `rgba(${TEAL[0]},${TEAL[1]},${TEAL[2]},${a})` }

// ── State ────────────────────────────────────────────────────────────
const isTouchDevice     = ref(false)
const isOverInteractive = ref(false)
const cursorCanvas      = ref<HTMLCanvasElement | null>(null)

const INTERACTIVE = 'a, button, input, textarea, select, label, NuxtLink, [role="button"]'

const target = reactive({ x: 0, y: 0 })
const glow   = reactive({ x: 0.5, y: 0.5 })
const cursor = reactive({ x: -200, y: -200 })

const nodes: MeshNode[] = []
let lastSpawn  = 0
let lastFrame  = 0
let raf        = 0

// ── Node helpers ─────────────────────────────────────────────────────
function spawnNode(now: number) {
  const angle = Math.random() * Math.PI * 2
  const dist  = 18 + Math.random() * 30
  const speed = NODE_SPEED * (0.5 + Math.random())
  const life  = MIN_LIFE + Math.random() * (MAX_LIFE - MIN_LIFE)
  nodes.push({
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    vx: Math.cos(angle + Math.PI / 2) * speed + (Math.random() - 0.5) * 0.01,
    vy: Math.sin(angle + Math.PI / 2) * speed + (Math.random() - 0.5) * 0.01,
    alpha: 0,
    targetAlpha: 1,
    spawnRing: 1,
    lifetime: life,
    age: 0,
  })
  lastSpawn = now
}

// ── Draw loop ─────────────────────────────────────────────────────────
function drawCursor(ctx: CanvasRenderingContext2D, now: number) {
  const dt = lastFrame === 0 ? 16 : Math.min(now - lastFrame, 50)
  lastFrame = now

  // Lerp glow & cursor positions
  glow.x   += (target.x / window.innerWidth  - glow.x)   * LERP_GLOW
  glow.y   += (target.y / window.innerHeight - glow.y)   * LERP_GLOW
  cursor.x += (target.x - cursor.x) * LERP_CURSOR
  cursor.y += (target.y - cursor.y) * LERP_CURSOR

  // Position canvas
  const el = cursorCanvas.value!
  el.style.transform = `translate(${cursor.x - HALF}px, ${cursor.y - HALF}px)`

  // Spawn
  if (now - lastSpawn > SPAWN_EVERY && nodes.filter(n => n.targetAlpha === 1).length < MAX_NODES) {
    spawnNode(now)
  }

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  // Update nodes & mark dying ones
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i]
    n.age += dt
    if (n.age > n.lifetime * 0.7 && n.targetAlpha === 1) n.targetAlpha = 0
    n.alpha += (n.targetAlpha - n.alpha) * 0.06
    if (n.targetAlpha === 0 && n.alpha < 0.01) { nodes.splice(i, 1); continue }

    n.x += n.vx * dt
    n.y += n.vy * dt
    // Keep within canvas bounds (soft bounce)
    const maxR = HALF - 8
    const d = Math.sqrt(n.x ** 2 + n.y ** 2)
    if (d > maxR) {
      n.vx -= (n.x / d) * NODE_SPEED * 0.4
      n.vy -= (n.y / d) * NODE_SPEED * 0.4
    }

    if (n.spawnRing > 0) n.spawnRing = Math.max(0, n.spawnRing - 0.035)
  }

  const cx = HALF, cy = HALF

  // Draw edges between nearby nodes (and to center)
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    const ax = cx + a.x, ay = cy + a.y
    const edgeAlpha = a.alpha * 0.45

    // Edge to center
    const distCenter = Math.sqrt(a.x ** 2 + a.y ** 2)
    if (distCenter < CONNECT_DIST) {
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(cx, cy)
      ctx.strokeStyle = rgba(edgeAlpha * (1 - distCenter / CONNECT_DIST))
      ctx.lineWidth = 0.7
      ctx.stroke()
    }

    // Edge between nodes
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j]
      const dx = a.x - b.x, dy = a.y - b.y
      const dist = Math.sqrt(dx ** 2 + dy ** 2)
      if (dist > CONNECT_DIST) continue
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(cx + b.x, cy + b.y)
      ctx.strokeStyle = rgba(Math.min(a.alpha, b.alpha) * 0.35 * (1 - dist / CONNECT_DIST))
      ctx.lineWidth = 0.7
      ctx.stroke()
    }
  }

  // Draw spawn rings
  for (const n of nodes) {
    if (n.spawnRing <= 0) continue
    const r = (1 - n.spawnRing) * 14
    ctx.beginPath()
    ctx.arc(cx + n.x, cy + n.y, r, 0, Math.PI * 2)
    ctx.strokeStyle = rgba(n.spawnRing * n.alpha * 0.7)
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  // Draw outer nodes
  for (const n of nodes) {
    ctx.beginPath()
    ctx.arc(cx + n.x, cy + n.y, 2.2, 0, Math.PI * 2)
    ctx.fillStyle = rgba(n.alpha * 0.75)
    ctx.fill()
  }

  // Draw center node (always present)
  const pulse = 0.5 + 0.5 * Math.sin(now * 0.002)
  ctx.beginPath()
  ctx.arc(cx, cy, 3.5 + pulse * 1.2, 0, Math.PI * 2)
  ctx.fillStyle = rgba(0.15 * pulse)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
  ctx.fillStyle = rgba(0.9)
  ctx.fill()
}

// ── RAF loop ─────────────────────────────────────────────────────────
function tick(now: number) {
  const canvas = cursorCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) drawCursor(ctx, now)
  } else {
    // Glow-only path (touch device fallback for glow still runs)
    glow.x += (target.x / window.innerWidth  - glow.x)  * LERP_GLOW
    glow.y += (target.y / window.innerHeight - glow.y)  * LERP_GLOW
  }
  raf = requestAnimationFrame(tick)
}

function onMouseMove(e: MouseEvent) {
  target.x = e.clientX
  target.y = e.clientY
}

function onMouseOver(e: MouseEvent) {
  isOverInteractive.value = !!(e.target as Element).closest(INTERACTIVE)
}

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window

  // Set canvas pixel dimensions to match CSS size so drawing coords align
  if (cursorCanvas.value) {
    cursorCanvas.value.width  = CANVAS_SIZE
    cursorCanvas.value.height = CANVAS_SIZE
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseover', onMouseOver, { passive: true })
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
  cancelAnimationFrame(raf)
})

const glowStyle = computed(() => ({
  '--gx': `${glow.x * 100}%`,
  '--gy': `${glow.y * 100}%`,
}))
</script>

<style>
* { cursor: none !important; }

a, a *,
button, button *,
input, textarea, select,
label, label *,
[role="button"], [role="button"] * {
  cursor: default !important;
}

.app-root {
  position: relative;
  isolation: isolate;
}

.mouse-glow {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  mix-blend-mode: screen;
  background: radial-gradient(
    1000px circle at var(--gx, 120%) var(--gy, 120%),
    rgba(128, 224, 199, 0.12),
    transparent 30%
  );
  will-change: background;
}

.cursor-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 140px;
  height: 140px;
  z-index: 10000;
  pointer-events: none;
  will-change: transform;
}
</style>
