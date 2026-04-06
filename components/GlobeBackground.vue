<template>
  <canvas ref="canvasRef" class="globe-canvas" />
</template>

<script setup lang="ts">
// ── Types ─────────────────────────────────────────────────────────────
interface Node3D {
  x: number; y: number; z: number   // unit-sphere coordinates
}

// ── Constants ─────────────────────────────────────────────────────────
const LAT_LINES   = 10
const LON_LINES   = 18
const SEGMENTS    = 64             // points per latitude/longitude arc
const NODE_COUNT  = 28
const CONNECT_DOT = Math.cos(Math.PI / 3)  // cos(60°) — max angular dist for edges
const ROTATION_SPEED = 0.00022    // rad/ms
const RADIUS_RATIO   = 0.38       // globe radius as fraction of min(W, H)

// Colour tokens (all teal, varying opacity for depth)
const COL_GRID_FRONT = 'rgba(128,224,199,0.07)'
const COL_GRID_BACK  = 'rgba(128,224,199,0.03)'
const COL_NODE_FRONT = 'rgba(128,224,199,0.55)'
const COL_NODE_BACK  = 'rgba(128,224,199,0.12)'
const COL_EDGE_FRONT = 'rgba(128,224,199,0.18)'
const COL_EDGE_BACK  = 'rgba(128,224,199,0.05)'

// ── Helpers ───────────────────────────────────────────────────────────
function latLonToUnit(lat: number, lon: number): Node3D {
  const cosLat = Math.cos(lat)
  return { x: cosLat * Math.cos(lon), y: Math.sin(lat), z: cosLat * Math.sin(lon) }
}

// Rotate a point around the Y-axis by angle θ
function rotateY(p: Node3D, sinT: number, cosT: number): Node3D {
  return { x: p.x * cosT + p.z * sinT, y: p.y, z: -p.x * sinT + p.z * cosT }
}

// Project 3D unit-sphere point to canvas 2D
function project(p: Node3D, cx: number, cy: number, r: number): [number, number] {
  return [cx + p.x * r, cy - p.y * r]
}

// Angular distance via dot product
function dotProduct(a: Node3D, b: Node3D): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

// ── Seeded nodes (stable across redraws) ─────────────────────────────
const nodes: Node3D[] = []
{
  // Use a fixed golden-angle spiral for even coverage, no randomness
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    nodes.push({ x: r * Math.cos(theta), y, z: r * Math.sin(theta) })
  }
}

// ── Component ─────────────────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animFrame = 0
let startTime = 0

function draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  if (startTime === 0) startTime = t
  const angle = (t - startTime) * ROTATION_SPEED

  const sinT = Math.sin(angle)
  const cosT = Math.cos(angle)

  const r  = Math.min(W, H) * RADIUS_RATIO
  const cx = W / 2
  const cy = H / 2

  ctx.fillStyle = '#030705'
  ctx.fillRect(0, 0, W, H)

  // ── Latitude lines ──────────────────────────────────────────────
  for (let li = 0; li < LAT_LINES; li++) {
    const lat = -Math.PI / 2 + (Math.PI / (LAT_LINES + 1)) * (li + 1)
    ctx.beginPath()
    let first = true
    for (let si = 0; si <= SEGMENTS; si++) {
      const lon = (Math.PI * 2 * si) / SEGMENTS
      const p = rotateY(latLonToUnit(lat, lon), sinT, cosT)
      const [px, py] = project(p, cx, cy, r)
      const front = p.z >= 0
      ctx.strokeStyle = front ? COL_GRID_FRONT : COL_GRID_BACK
      if (first) { ctx.moveTo(px, py); first = false }
      else ctx.lineTo(px, py)

      // Stroke and restart at each front/back transition to vary colour
      if (si < SEGMENTS) {
        const nextLon = (Math.PI * 2 * (si + 1)) / SEGMENTS
        const nextP = rotateY(latLonToUnit(lat, nextLon), sinT, cosT)
        if ((nextP.z >= 0) !== front) {
          ctx.lineWidth = 0.6
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(px, py)
        }
      }
    }
    ctx.lineWidth = 0.6
    ctx.stroke()
  }

  // ── Longitude lines ─────────────────────────────────────────────
  for (let li = 0; li < LON_LINES; li++) {
    const lon = (Math.PI * 2 * li) / LON_LINES
    ctx.beginPath()
    let first = true
    for (let si = 0; si <= SEGMENTS; si++) {
      const lat = -Math.PI / 2 + (Math.PI * si) / SEGMENTS
      const p = rotateY(latLonToUnit(lat, lon), sinT, cosT)
      const [px, py] = project(p, cx, cy, r)
      const front = p.z >= 0
      ctx.strokeStyle = front ? COL_GRID_FRONT : COL_GRID_BACK
      if (first) { ctx.moveTo(px, py); first = false }
      else ctx.lineTo(px, py)

      if (si < SEGMENTS) {
        const nextLat = -Math.PI / 2 + (Math.PI * (si + 1)) / SEGMENTS
        const nextP = rotateY(latLonToUnit(nextLat, lon), sinT, cosT)
        if ((nextP.z >= 0) !== front) {
          ctx.lineWidth = 0.6
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(px, py)
        }
      }
    }
    ctx.lineWidth = 0.6
    ctx.stroke()
  }

  // ── Rotate nodes ────────────────────────────────────────────────
  const rotated = nodes.map((n) => rotateY(n, sinT, cosT))

  // ── Node connection edges ───────────────────────────────────────
  for (let i = 0; i < rotated.length; i++) {
    for (let j = i + 1; j < rotated.length; j++) {
      if (dotProduct(nodes[i], nodes[j]) < CONNECT_DOT) continue
      const a = rotated[i], b = rotated[j]
      const front = (a.z + b.z) / 2 >= 0
      const [ax, ay] = project(a, cx, cy, r)
      const [bx, by] = project(b, cx, cy, r)
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(bx, by)
      ctx.strokeStyle = front ? COL_EDGE_FRONT : COL_EDGE_BACK
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
  }

  // ── Nodes ───────────────────────────────────────────────────────
  for (const p of rotated) {
    const [px, py] = project(p, cx, cy, r)
    const front = p.z >= 0
    ctx.beginPath()
    ctx.arc(px, py, front ? 2.2 : 1.4, 0, Math.PI * 2)
    ctx.fillStyle = front ? COL_NODE_FRONT : COL_NODE_BACK
    ctx.fill()
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    canvas.width  = rect.width
    canvas.height = rect.height
  }
  resize()
  window.addEventListener('resize', resize)

  const loop = (t: number) => {
    draw(ctx, canvas.width, canvas.height, t)
    animFrame = requestAnimationFrame(loop)
  }
  animFrame = requestAnimationFrame(loop)

  onUnmounted(() => {
    cancelAnimationFrame(animFrame)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.globe-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
