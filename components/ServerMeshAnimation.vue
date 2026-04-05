<template>
  <div class="anim-wrap">
    <canvas ref="canvasRef" class="anim-canvas" />
    <div class="legend">
      <div class="legend-item"><span class="dot-preview" />Player</div>
      <div class="legend-item"><span class="rect-preview" />Server zone</div>
      <div class="legend-item"><span class="transfer-preview" />Authority transfer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ── Types ────────────────────────────────────────────────────────
interface Server {
  id: number
  label: string
  x: number; y: number; w: number; h: number   // animated current
  tx: number; ty: number; tw: number; th: number // lerp targets
  alpha: number; targetAlpha: number
  colorIdx: number
}

interface Player {
  id: number
  x: number; y: number
  vx: number; vy: number
  serverId: number
  colorIdx: number
  prevColorIdx: number
  colorT: number        // 0→1 color transition progress
  alpha: number; targetAlpha: number
  spawnRing: number
  trail: Array<{ x: number; y: number; a: number }>
}

interface AuthEvent {
  x: number; y: number
  alpha: number
}

// ── Server colour palette ────────────────────────────────────────
const PALETTE = [
  { border: 'rgba(128, 224, 199, 0.8)', fill: 'rgba(128, 224, 199, 0.07)', dot: [128, 224, 199] as [number,number,number] },
  { border: 'rgba(100, 200,  90, 0.8)', fill: 'rgba(100, 200,  90, 0.07)', dot: [100, 200,  90] as [number,number,number] },
  { border: 'rgba( 90, 140, 220, 0.8)', fill: 'rgba( 90, 140, 220, 0.07)', dot: [ 90, 140, 220] as [number,number,number] },
  { border: 'rgba(210, 190,  70, 0.8)', fill: 'rgba(210, 190,  70, 0.07)', dot: [210, 190,  70] as [number,number,number] },
  { border: 'rgba(185,  90, 215, 0.8)', fill: 'rgba(185,  90, 215, 0.07)', dot: [185,  90, 215] as [number,number,number] },
]

function dotColor(colorIdx: number, alpha = 1) {
  const [r, g, b] = PALETTE[colorIdx % PALETTE.length].dot
  return `rgba(${r},${g},${b},${alpha})`
}

function lerpColor(idxA: number, idxB: number, t: number, alpha = 1) {
  const [r1, g1, b1] = PALETTE[idxA % PALETTE.length].dot
  const [r2, g2, b2] = PALETTE[idxB % PALETTE.length].dot
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgba(${r},${g},${b},${alpha})`
}

// ── Phase layouts ────────────────────────────────────────────────
// Each entry: [id, label, tx, ty, tw, th, colorIdx]
type LayoutEntry = [number, string, number, number, number, number, number]

const LAYOUTS: LayoutEntry[][] = [
  // Phase 1 — 2 servers
  [
    [0, 'SV-01', 0,    0, 0.5,  1.0,  0],
    [1, 'SV-02', 0.5,  0, 0.5,  1.0,  1],
  ],
  // Phase 2 — 3 servers
  [
    [0, 'SV-01', 0,    0,    0.44, 1.0,  0],
    [1, 'SV-02', 0.44, 0,    0.56, 0.48, 1],
    [2, 'SV-03', 0.44, 0.48, 0.56, 0.52, 2],
  ],
  // Phase 3 — 4 servers
  [
    [0, 'SV-01', 0,    0,    0.42, 0.52, 0],
    [1, 'SV-02', 0.42, 0,    0.58, 0.44, 1],
    [2, 'SV-03', 0.42, 0.44, 0.58, 0.56, 2],
    [3, 'SV-04', 0,    0.52, 0.42, 0.48, 3],
  ],
  // Phase 4 — 5 servers (SV-03 splits)
  [
    [0, 'SV-01', 0,    0,    0.4,  0.52, 0],
    [1, 'SV-02', 0.4,  0,    0.6,  0.42, 1],
    [2, 'SV-03', 0.4,  0.42, 0.35, 0.58, 2],
    [3, 'SV-04', 0,    0.52, 0.4,  0.48, 3],
    [4, 'SV-05', 0.75, 0.42, 0.25, 0.58, 4],
  ],
]

// ── State ────────────────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animFrame = 0
let startTime = 0
let phase = 0
let lastLifecycleTime = 0
let lastSpawnTime = 0
let lastDespawnTime = 0
let resetting = false
let resetAt = 0  // timestamp when reset was scheduled

const servers: Server[] = []
const players: Player[] = []
const authEvents: AuthEvent[] = []

function buildServers(layoutIdx: number) {
  const layout = LAYOUTS[layoutIdx]
  layout.forEach(([id, label, tx, ty, tw, th, colorIdx]) => {
    const existing = servers.find((s) => s.id === id)
    if (existing) {
      existing.tx = tx; existing.ty = ty; existing.tw = tw; existing.th = th
      existing.targetAlpha = 1
    } else {
      servers.push({
        id, label, colorIdx,
        x: tx, y: ty, w: tw, h: th,
        tx, ty, tw, th,
        alpha: 0, targetAlpha: 1,
      })
    }
  })
  // Fade out servers no longer in this layout
  const ids = new Set(layout.map(([id]) => id))
  servers.forEach((s) => { if (!ids.has(s.id)) s.targetAlpha = 0 })
}

function getServerForPlayer(px: number, py: number): Server | null {
  // Find the active server whose rect contains this player
  for (const s of servers) {
    if (s.alpha < 0.3) continue
    if (px >= s.x && px <= s.x + s.w && py >= s.y && py <= s.y + s.h) return s
  }
  return null
}

function spawnPlayer(t: number) {
  const dormant = players.filter((p) => p.targetAlpha === 0)
  if (dormant.length === 0) return
  const p = dormant[Math.floor(Math.random() * dormant.length)]
  p.x = 0.05 + Math.random() * 0.9
  p.y = 0.05 + Math.random() * 0.9
  p.vx = (Math.random() - 0.5) * 0.0022
  p.vy = (Math.random() - 0.5) * 0.0022
  p.trail = []
  p.targetAlpha = 1
  p.spawnRing = 1
  lastSpawnTime = t
  const sv = getServerForPlayer(p.x, p.y)
  p.colorIdx = sv ? sv.colorIdx : 0
  p.prevColorIdx = p.colorIdx
  p.serverId = sv ? sv.id : -1
}

function goToPhase(newPhase: number, t: number) {
  phase = newPhase
  buildServers(phase)
  lastLifecycleTime = t
  if (newPhase > 0) spawnPlayer(t)
}

function despawnOnePlayer() {
  const active = players.filter((p) => p.targetAlpha === 1)
  if (active.length === 0) return
  active[Math.floor(Math.random() * active.length)].targetAlpha = 0
}

function resetAnimation(t: number) {
  resetting = false
  resetAt = 0
  phase = 0
  startTime = t
  lastLifecycleTime = t
  lastSpawnTime = t
  lastDespawnTime = t
  // Fade all servers out, then bring phase-0 back
  servers.forEach((s) => { s.targetAlpha = 0 })
  buildServers(0)
  // Despawn all players cleanly, then spawn 3 fresh ones
  players.forEach((p) => { p.targetAlpha = 0; p.alpha = 0; p.trail = [] })
  players.slice(0, 3).forEach((p) => {
    p.x = 0.1 + Math.random() * 0.8
    p.y = 0.1 + Math.random() * 0.8
    p.vx = (Math.random() - 0.5) * 0.0022
    p.vy = (Math.random() - 0.5) * 0.0022
    p.spawnRing = 1
    p.targetAlpha = 1
    p.colorIdx = 0; p.prevColorIdx = 0; p.colorT = 1
  })
}

// ── Draw ─────────────────────────────────────────────────────────
function draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  if (startTime === 0) {
    startTime = t
    buildServers(0)
  }

  const elapsed = t - startTime

  const activeCount = players.filter((p) => p.targetAlpha === 1).length

  if (!resetting) {
    // Phase progression
    if (phase === 0 && elapsed > 5000) goToPhase(1, t)
    if (phase === 1 && elapsed > 11000) goToPhase(2, t)
    if (phase === 2 && elapsed > 17000) goToPhase(3, t)
    // Phase 4 cycles once, then triggers reset sequence
    if (phase === 3 && t - lastLifecycleTime > 7000) goToPhase(4, t)
    if (phase === 4 && t - lastLifecycleTime > 6000) {
      goToPhase(3, t)
      resetting = true      // start wind-down after returning to phase 3
      lastDespawnTime = t
    }

    // Spawn players gradually during normal operation
    if (t - lastSpawnTime > 2500 && activeCount < 10) spawnPlayer(t)
  } else {
    // Wind-down: despawn all players one by one every 1.2s
    if (activeCount > 0 && t - lastDespawnTime > 1200) {
      despawnOnePlayer()
      lastDespawnTime = t
    }
    // Schedule reset 2s after last despawn (enough for final player to fade out)
    if (activeCount === 0 && resetAt === 0) resetAt = t
    if (resetAt > 0 && t - resetAt > 2000) resetAnimation(t)
  }

  ctx.clearRect(0, 0, W, H)

  // Background
  ctx.fillStyle = '#030705'
  ctx.fillRect(0, 0, W, H)

  // Grid
  ctx.strokeStyle = 'rgba(13, 36, 33, 0.55)'
  ctx.lineWidth = 1
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }

  // ── Lerp & draw servers ──────────────────────────────────────
  for (let i = servers.length - 1; i >= 0; i--) {
    const s = servers[i]
    s.alpha += (s.targetAlpha - s.alpha) * 0.04
    s.x += (s.tx - s.x) * 0.025
    s.y += (s.ty - s.y) * 0.025
    s.w += (s.tw - s.w) * 0.025
    s.h += (s.th - s.h) * 0.025

    if (s.alpha < 0.01) {
      if (s.targetAlpha === 0) servers.splice(i, 1)
      continue
    }

    const pal = PALETTE[s.colorIdx % PALETTE.length]
    const sx = s.x * W, sy = s.y * H, sw = s.w * W, sh = s.h * H

    // Zone fill
    ctx.save()
    ctx.globalAlpha = s.alpha
    ctx.fillStyle = pal.fill
    ctx.fillRect(sx, sy, sw, sh)

    // Zone border
    ctx.strokeStyle = pal.border
    ctx.lineWidth = 1.5
    ctx.strokeRect(sx + 0.75, sy + 0.75, sw - 1.5, sh - 1.5)

    // Server label (top-left corner, matching border color)
    ctx.fillStyle = pal.border
    ctx.font = '500 11px Onest, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(s.label, sx + 8, sy + 16)

    // Load bar (bottom of zone)
    const load = players.filter((p) => p.alpha > 0.5 && p.serverId === s.id).length
    const maxLoad = 4
    const barW = Math.min(sw * 0.6, 80)
    const bx = sx + sw - barW - 8
    const by = sy + sh - 8
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    ctx.fillRect(bx, by - 3, barW, 3)
    ctx.fillStyle = pal.border
    ctx.fillRect(bx, by - 3, barW * Math.min(1, load / maxLoad), 3)

    ctx.restore()
  }

  // ── Player trails ────────────────────────────────────────────
  players.forEach((p) => {
    if (p.alpha < 0.01) return
    p.trail.forEach((pt) => {
      ctx.beginPath()
      ctx.arc(pt.x * W, pt.y * H, 2, 0, Math.PI * 2)
      ctx.fillStyle = dotColor(p.colorIdx, pt.a * 0.25 * p.alpha)
      ctx.fill()
    })
  })

  // ── Players ──────────────────────────────────────────────────
  players.forEach((p) => {
    p.alpha += (p.targetAlpha - p.alpha) * 0.06
    if (p.alpha < 0.01) return

    const px = p.x * W, py = p.y * H
    const col = p.colorT < 1
      ? lerpColor(p.prevColorIdx, p.colorIdx, p.colorT, p.alpha)
      : dotColor(p.colorIdx, p.alpha)

    if (p.colorT < 1) p.colorT = Math.min(1, p.colorT + 0.06)

    // Spawn ring
    if (p.spawnRing > 0) {
      const r = (1 - p.spawnRing) * 24
      ctx.save()
      ctx.globalAlpha = p.spawnRing * p.alpha * 0.8
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
      ctx.strokeStyle = dotColor(p.colorIdx, 1)
      ctx.lineWidth = 1.5; ctx.stroke()
      ctx.restore()
      p.spawnRing = Math.max(0, p.spawnRing - 0.04)
    }

    // Dot
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2)
    ctx.fillStyle = col; ctx.fill()

    // Dot border ring
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2)
    ctx.strokeStyle = dotColor(p.colorIdx, p.alpha * 0.4)
    ctx.lineWidth = 1.5; ctx.stroke()
  })

  // ── Auth transfer labels ─────────────────────────────────────
  for (let i = authEvents.length - 1; i >= 0; i--) {
    const e = authEvents[i]
    ctx.save()
    ctx.globalAlpha = e.alpha
    ctx.font = '600 10px Onest, monospace'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#d4ebeb'
    ctx.fillText('AUTH TRANSFER', e.x * W, e.y * H - 14)
    ctx.restore()
    e.alpha -= 0.014
    if (e.alpha <= 0) authEvents.splice(i, 1)
  }

  // ── Update players ───────────────────────────────────────────
  players.forEach((p) => {
    if (p.alpha < 0.05) return

    p.trail.push({ x: p.x, y: p.y, a: 1 })
    if (p.trail.length > 14) p.trail.shift()
    p.trail.forEach((pt) => (pt.a *= 0.82))

    p.x += p.vx; p.y += p.vy

    if (p.x < 0.01 || p.x > 0.99) { p.vx *= -1; p.x = Math.max(0.01, Math.min(0.99, p.x)) }
    if (p.y < 0.01 || p.y > 0.99) { p.vy *= -1; p.y = Math.max(0.01, Math.min(0.99, p.y)) }

    if (Math.random() < 0.006) {
      p.vx += (Math.random() - 0.5) * 0.0012
      p.vy += (Math.random() - 0.5) * 0.0012
      const spd = Math.sqrt(p.vx ** 2 + p.vy ** 2)
      const max = 0.003
      if (spd > max) { p.vx = (p.vx / spd) * max; p.vy = (p.vy / spd) * max }
    }

    // Authority transfer detection
    const sv = getServerForPlayer(p.x, p.y)
    const newId = sv ? sv.id : p.serverId
    const newColorIdx = sv ? sv.colorIdx : p.colorIdx

    if (newId !== p.serverId && sv) {
      // Trigger auth transfer event
      authEvents.push({ x: p.x, y: p.y, alpha: 1 })
      p.prevColorIdx = p.colorIdx
      p.colorIdx = newColorIdx
      p.colorT = 0
      p.serverId = newId
    }
  })

  // ── HUD ──────────────────────────────────────────────────────
  activePlayers.value = players.filter((p) => p.alpha > 0.5).length
  activeServers.value = servers.filter((s) => s.alpha > 0.5).length
}

// ── Lifecycle ────────────────────────────────────────────────────
const activePlayers = ref(0)
const activeServers = ref(2)
defineExpose({ activePlayers, activeServers })

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    const rect = canvas.parentElement!.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = Math.min(480, Math.round(rect.width * 0.52))
  }

  resize()
  window.addEventListener('resize', resize)

  // Init player pool (all dormant)
  for (let i = 0; i < 12; i++) {
    players.push({
      id: i, x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.002, vy: (Math.random() - 0.5) * 0.002,
      serverId: -1, colorIdx: 0, prevColorIdx: 0, colorT: 1,
      alpha: 0, targetAlpha: 0, spawnRing: 0, trail: [],
    })
  }

  // Spawn initial 3 players after a short delay
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      players[i].x = 0.1 + Math.random() * 0.8
      players[i].y = 0.1 + Math.random() * 0.8
      players[i].targetAlpha = 1
      players[i].spawnRing = 1
    }
  }, 400)

  const loop = (t: number) => {
    draw(ctx, canvas.width, canvas.height, t)
    animFrame = requestAnimationFrame(loop)
  }
  animFrame = requestAnimationFrame(loop)

  onUnmounted(() => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) })
})
</script>

<style scoped>
.anim-wrap {
  position: relative;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #030705;
}

.anim-canvas {
  display: block;
  width: 100%;
}

.legend {
  position: absolute;
  bottom: 16px;
  left: 20px;
  display: flex;
  gap: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--muted);
  font-weight: 300;
  letter-spacing: 0.03em;
}

.dot-preview {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text);
  border: 1.5px solid var(--accent);
  display: block;
  flex-shrink: 0;
}

.rect-preview {
  width: 14px;
  height: 10px;
  border: 1.5px solid var(--accent);
  background: rgba(128, 224, 199, 0.07);
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
}

.transfer-preview {
  font-size: 10px;
  color: var(--text);
  font-weight: 600;
  letter-spacing: 0.04em;
  opacity: 0.5;
}
</style>
