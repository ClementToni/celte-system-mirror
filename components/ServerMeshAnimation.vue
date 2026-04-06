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
// ── Algopoc constants ─────────────────────────────────────────────
// Faithfully ported from types.rs
const DRIFT_SPEED    = 0.0017   // normalized/frame  (≈ 0.35 px/frame at ~800 px)
const BOUNCE_R       = 0.012    // normalized wall margin
const PADDING        = 0.032    // server shape padding (≈ 20 px / 620 px)
const WEAK_RATIO     = 0.20     // outer zone width ratio (SERVER_SHAPE_WEAK_RATIO)
const MIN_SIZE       = 0.10     // minimum server dimension (≈ 80 px / 800 px)
const MIN_ENTITIES   = 3        // server can't lose points below this (OwnershipMinEntities)
const IMBALANCE_THRESH = 0.20   // intersection-balancing trigger ratio (ENTITY_IMBALANCE_THRESHOLD)
const RICHNESS_THRESH  = 0.20   // richness-protection threshold (RICHNESS_PROTECTION_THRESHOLD)
const OWNERSHIP_MS   = 125      // ownership update period — 8 Hz (OWNERSHIP_UPDATE_HZ)

// ── Colour palette (unchanged) ────────────────────────────────────
const PALETTE = [
  { border: 'rgba(128, 224, 199, 0.8)', fill: 'rgba(128, 224, 199, 0.07)', dot: [128, 224, 199] as [number, number, number] },
  { border: 'rgba(100, 200,  90, 0.8)', fill: 'rgba(100, 200,  90, 0.07)', dot: [100, 200,  90] as [number, number, number] },
  { border: 'rgba( 90, 140, 220, 0.8)', fill: 'rgba( 90, 140, 220, 0.07)', dot: [ 90, 140, 220] as [number, number, number] },
  { border: 'rgba(210, 190,  70, 0.8)', fill: 'rgba(210, 190,  70, 0.07)', dot: [210, 190,  70] as [number, number, number] },
  { border: 'rgba(185,  90, 215, 0.8)', fill: 'rgba(185,  90, 215, 0.07)', dot: [185,  90, 215] as [number, number, number] },
]

function dotColor(ci: number, a = 1) {
  const [r, g, b] = PALETTE[ci % PALETTE.length].dot
  return `rgba(${r},${g},${b},${a})`
}
function lerpColor(ciA: number, ciB: number, t: number, a = 1) {
  const [r1, g1, b1] = PALETTE[ciA % PALETTE.length].dot
  const [r2, g2, b2] = PALETTE[ciB % PALETTE.length].dot
  return `rgba(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)},${a})`
}

// ── Types ─────────────────────────────────────────────────────────
interface Rect { x: number; y: number; w: number; h: number }

interface Pt {
  id: number
  x: number; y: number; vx: number; vy: number
  serverId: number; prevServerId: number
  colorIdx: number; prevColorIdx: number; colorT: number
  alpha: number; targetAlpha: number
  spawnRing: number
  trail: { x: number; y: number; a: number }[]
}

interface Sv {
  id: number
  label: string
  colorIdx: number
  pointIds: Set<number>
  alpha: number; targetAlpha: number
}

interface AuthEvent { x: number; y: number; alpha: number }

// ── Mutable simulation state ──────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animFrame = 0

let nextPtId = 0
let nextSvId = 0
const pts: Pt[] = []
const svs: Sv[] = []
const authEvents: AuthEvent[] = []

// Timing
let startTime    = 0
let lastOwnerMs  = 0
let lastSpawnT   = 0
let lastDespawnT = 0
let lcPhase      = 0          // lifecycle phase
let lastLcT      = 0
let resetting    = false
let resetAt      = 0

// ── Exposed reactive counters ─────────────────────────────────────
const activePlayers = ref(0)
const activeServers = ref(0)
defineExpose({ activePlayers, activeServers })

// ── Geometry helpers (algopoc types.rs / RectangleShape) ──────────

function fitRect(sv: Sv): Rect | null {
  const owned = pts.filter(p => sv.pointIds.has(p.id) && p.alpha > 0.3)
  if (!owned.length) return null
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of owned) {
    if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x
    if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y
  }
  const cx = (minX + maxX) * 0.5, cy = (minY + maxY) * 0.5
  const w  = Math.max(maxX - minX + PADDING * 2, MIN_SIZE)
  const h  = Math.max(maxY - minY + PADDING * 2, MIN_SIZE)
  return { x: cx - w * 0.5, y: cy - h * 0.5, w, h }
}

type Strength = 'strong' | 'weak'

// FittedServerShape::ownership_strength — Rectangle variant
function ownershipStrength(rect: Rect, px: number, py: number): Strength | null {
  if (px < rect.x || px > rect.x + rect.w || py < rect.y || py > rect.y + rect.h) return null
  const minDist = Math.min(px - rect.x, rect.x + rect.w - px, py - rect.y, rect.y + rect.h - py)
  const maxDepth = Math.min(rect.w, rect.h) * 0.5
  return (minDist / maxDepth) <= WEAK_RATIO ? 'weak' : 'strong'
}

// FittedServerShape::relative_distance_to_center
function relDist(rect: Rect, px: number, py: number): number {
  const cx = rect.x + rect.w * 0.5, cy = rect.y + rect.h * 0.5
  const scale = Math.hypot(rect.w, rect.h) * 0.5
  return Math.hypot(px - cx, py - cy) / scale
}

function rectsIntersect(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}
function rectContains(outer: Rect, inner: Rect): boolean {
  return outer.x <= inner.x && outer.y <= inner.y &&
    outer.x + outer.w >= inner.x + inner.w && outer.y + outer.h >= inner.y + inner.h
}

// FittedServerShape::distance_to_boundary — Rectangle variant (signed: neg = inside)
function distToBoundary(rect: Rect, px: number, py: number): number {
  if (rect.x <= px && px <= rect.x + rect.w && rect.y <= py && py <= rect.y + rect.h) {
    return -Math.min(px - rect.x, rect.x + rect.w - px, py - rect.y, rect.y + rect.h - py)
  }
  const cx = Math.max(rect.x, Math.min(rect.x + rect.w, px))
  const cy = Math.max(rect.y, Math.min(rect.y + rect.h, py))
  return Math.hypot(px - cx, py - cy)
}

// ── Entity management ─────────────────────────────────────────────

function randomVel() {
  const a = Math.random() * Math.PI * 2
  return { vx: Math.cos(a) * DRIFT_SPEED, vy: Math.sin(a) * DRIFT_SPEED }
}

function addPoint(svId: number): Pt {
  const sv = svs.find(s => s.id === svId)
  const ci = sv?.colorIdx ?? 0
  const { vx, vy } = randomVel()
  const pt: Pt = {
    id: nextPtId++,
    x: BOUNCE_R + Math.random() * (1 - BOUNCE_R * 2),
    y: BOUNCE_R + Math.random() * (1 - BOUNCE_R * 2),
    vx, vy,
    serverId: svId, prevServerId: svId,
    colorIdx: ci, prevColorIdx: ci, colorT: 1,
    alpha: 0, targetAlpha: 1,
    spawnRing: 1,
    trail: [],
  }
  pts.push(pt)
  sv?.pointIds.add(pt.id)
  return pt
}

function addServer(label: string): Sv {
  const id = nextSvId++
  const sv: Sv = { id, label, colorIdx: id % PALETTE.length, pointIds: new Set(), alpha: 0, targetAlpha: 1 }
  svs.push(sv)
  return sv
}

// Transfer n points from richest server to newly added server
function seedServer(sv: Sv, n: number) {
  const source = svs
    .filter(s => s.id !== sv.id && s.targetAlpha === 1)
    .sort((a, b) => b.pointIds.size - a.pointIds.size)[0]
  if (!source) return
  for (const ptId of Array.from(source.pointIds).slice(0, n)) {
    source.pointIds.delete(ptId)
    sv.pointIds.add(ptId)
    const pt = pts.find(p => p.id === ptId)
    if (pt) {
      pt.prevColorIdx = pt.colorIdx; pt.colorIdx = sv.colorIdx
      pt.prevServerId = pt.serverId; pt.serverId = sv.id; pt.colorT = 0
    }
  }
}

function removeServer(id: number) {
  const sv = svs.find(s => s.id === id)
  if (!sv) return
  sv.targetAlpha = 0
  const others = svs.filter(s => s.id !== id && s.targetAlpha === 1)
  for (const ptId of Array.from(sv.pointIds)) {
    const pt = pts.find(p => p.id === ptId)
    if (!pt) continue
    // Transfer to nearest server by center distance
    let near = others[0], nearD = Infinity
    for (const o of others) {
      const r = fitRect(o); if (!r) continue
      const d = Math.hypot(pt.x - (r.x + r.w * 0.5), pt.y - (r.y + r.h * 0.5))
      if (d < nearD) { nearD = d; near = o }
    }
    if (near) {
      sv.pointIds.delete(ptId); near.pointIds.add(ptId)
      pt.prevColorIdx = pt.colorIdx; pt.colorIdx = near.colorIdx
      pt.prevServerId = pt.serverId; pt.serverId = near.id; pt.colorT = 0
    }
  }
}

// ── Algopoc ownership algorithm ───────────────────────────────────
// Implements rules 1-5 + rule 8 from types.rs AppState
function reassignPoints() {
  // Compute fitted shapes once
  const fitted: { sv: Sv; rect: Rect }[] = []
  for (const sv of svs) {
    if (sv.targetAlpha < 0.5) continue
    const r = fitRect(sv)
    if (r) fitted.push({ sv, rect: r })
  }
  if (!fitted.length) return

  // Build owner map
  const ownerMap = new Map<number, number>()
  for (const sv of svs) for (const id of sv.pointIds) ownerMap.set(id, sv.id)

  const desired = new Map<number, number>()

  for (const pt of pts) {
    if (pt.targetAlpha < 0.5) continue
    const curId   = ownerMap.get(pt.id)
    const curCount = svs.find(s => s.id === curId)?.pointIds.size ?? 0

    // Rule 1 — Minimum Entity Threshold
    if (curCount < MIN_ENTITIES && curId !== undefined) {
      desired.set(pt.id, curId); continue
    }

    // Rules 2-4 — Strength → distance → server-id tie-breaking
    let bestId: number | null = null
    let bestStr: Strength | null = null
    let bestDist = Infinity
    for (const { sv, rect } of fitted) {
      const str = ownershipStrength(rect, pt.x, pt.y)
      if (!str) continue
      const dist = relDist(rect, pt.x, pt.y)
      let win = false
      if (!bestStr)                                       win = true
      else if (str === 'strong' && bestStr === 'weak')    win = true
      else if (str === bestStr) {
        if (dist < bestDist - 1e-6)                       win = true
        else if (Math.abs(dist - bestDist) < 1e-6 && sv.id < (bestId ?? Infinity)) win = true
      }
      if (win) { bestId = sv.id; bestStr = str; bestDist = dist }
    }

    // Rule 5 — Point Retention + richness protection
    let owner = bestId ?? curId ?? null
    if (owner !== null && owner !== curId && curId !== undefined) {
      const candCount = svs.find(s => s.id === owner)?.pointIds.size ?? 0
      if (curCount < candCount && candCount > curCount * (1 + RICHNESS_THRESH))
        owner = curId
    }
    if (owner !== null) desired.set(pt.id, owner)
    else if (curId !== undefined) desired.set(pt.id, curId)
  }

  // Apply ownership changes
  for (const [ptId, toId] of desired) {
    const fromId = ownerMap.get(ptId)
    if (fromId === toId) continue
    if (fromId !== undefined) svs.find(s => s.id === fromId)?.pointIds.delete(ptId)
    const toSv = svs.find(s => s.id === toId)
    toSv?.pointIds.add(ptId)
    const pt = pts.find(p => p.id === ptId)
    if (pt && toSv) {
      authEvents.push({ x: pt.x, y: pt.y, alpha: 1 })
      pt.prevColorIdx = pt.colorIdx; pt.colorIdx = toSv.colorIdx
      pt.prevServerId = pt.serverId; pt.serverId = toId; pt.colorT = 0
    }
  }

  // Rule 8 — Intersection-Based Balancing (at most one transfer per update)
  // Recompute fitted rects after reassignment
  const fitted2: { sv: Sv; rect: Rect }[] = []
  for (const sv of svs) {
    if (sv.targetAlpha < 0.5) continue
    const r = fitRect(sv); if (r) fitted2.push({ sv, rect: r })
  }
  outer: for (let i = 0; i < fitted2.length; i++) {
    for (let j = i + 1; j < fitted2.length; j++) {
      const a = fitted2[i], b = fitted2[j]
      if (!rectsIntersect(a.rect, b.rect)) continue
      if (rectContains(a.rect, b.rect) || rectContains(b.rect, a.rect)) continue
      const [richer, poorer] = a.sv.pointIds.size >= b.sv.pointIds.size ? [a, b] : [b, a]
      const rich = richer.sv.pointIds.size, poor = poorer.sv.pointIds.size
      if (poor === 0 || rich <= poor * (1 + IMBALANCE_THRESH)) continue
      // Find richer entity closest to poorer's boundary
      let closestId: number | null = null, closestD = Infinity
      for (const ptId of richer.sv.pointIds) {
        const pt = pts.find(p => p.id === ptId); if (!pt) continue
        const d = Math.abs(distToBoundary(poorer.rect, pt.x, pt.y))
        if (d < closestD) { closestD = d; closestId = ptId }
      }
      if (closestId !== null) {
        const pt = pts.find(p => p.id === closestId)!
        richer.sv.pointIds.delete(closestId); poorer.sv.pointIds.add(closestId)
        authEvents.push({ x: pt.x, y: pt.y, alpha: 1 })
        pt.prevColorIdx = pt.colorIdx; pt.colorIdx = poorer.sv.colorIdx
        pt.prevServerId = pt.serverId; pt.serverId = poorer.sv.id; pt.colorT = 0
      }
      break outer
    }
  }
}

// ── Motion — algopoc rules M1 (drift) + M2 (bounce) ─────────────
function updateMotion() {
  for (const pt of pts) {
    if (pt.targetAlpha < 0.3) continue
    // Rule M1 — Point Drift
    pt.x += pt.vx; pt.y += pt.vy
    // Organic nudge (not in algopoc but keeps visual lively)
    if (Math.random() < 0.006) {
      pt.vx += (Math.random() - 0.5) * DRIFT_SPEED * 0.5
      pt.vy += (Math.random() - 0.5) * DRIFT_SPEED * 0.5
      const spd = Math.hypot(pt.vx, pt.vy)
      if (spd > DRIFT_SPEED * 1.4) { pt.vx = pt.vx / spd * DRIFT_SPEED; pt.vy = pt.vy / spd * DRIFT_SPEED }
    }
    // Rule M2 — Bounce
    if (pt.x <= BOUNCE_R)       { pt.x = BOUNCE_R;       pt.vx =  Math.abs(pt.vx) }
    else if (pt.x >= 1-BOUNCE_R){ pt.x = 1-BOUNCE_R;     pt.vx = -Math.abs(pt.vx) }
    if (pt.y <= BOUNCE_R)       { pt.y = BOUNCE_R;        pt.vy =  Math.abs(pt.vy) }
    else if (pt.y >= 1-BOUNCE_R){ pt.y = 1-BOUNCE_R;     pt.vy = -Math.abs(pt.vy) }
  }
}

// ── Lifecycle (auto-pilot demo sequence) ──────────────────────────
function initSim(t: number) {
  pts.length = 0; svs.length = 0; authEvents.length = 0
  nextPtId = 0; nextSvId = 0
  const sv = addServer('SV-01')
  for (let i = 0; i < 8; i++) addPoint(sv.id)
  startTime = t; lastLcT = t; lastOwnerMs = t; lastSpawnT = t; lastDespawnT = t
  lcPhase = 0; resetting = false; resetAt = 0
}

function resetSim(t: number) {
  pts.length = 0; svs.length = 0; authEvents.length = 0
  nextPtId = 0; nextSvId = 0
  const sv = addServer('SV-01')
  for (let i = 0; i < 8; i++) addPoint(sv.id)
  startTime = t; lastLcT = t; lastOwnerMs = t; lastSpawnT = t; lastDespawnT = t
  lcPhase = 0; resetting = false; resetAt = 0
}

// ── Main draw ─────────────────────────────────────────────────────
function draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  if (!startTime) initSim(t)

  const elapsed = t - startTime

  // ── Lifecycle progression ─────────────────────────────────────
  const activeCount = pts.filter(p => p.targetAlpha === 1).length

  if (!resetting) {
    // Add SV-02, seed with 3 points
    if (lcPhase === 0 && elapsed > 5000) {
      seedServer(addServer('SV-02'), 3); lcPhase = 1; lastLcT = t
    }
    // Add SV-03
    if (lcPhase === 1 && t - lastLcT > 7000) {
      seedServer(addServer('SV-03'), 2); lcPhase = 2; lastLcT = t
    }
    // Add SV-04
    if (lcPhase === 2 && t - lastLcT > 7000) {
      seedServer(addServer('SV-04'), 2); lcPhase = 3; lastLcT = t
    }
    // Remove oldest server (its points redistribute via ownership)
    if (lcPhase === 3 && t - lastLcT > 7000) {
      removeServer(svs[0].id); lcPhase = 4; lastLcT = t
    }
    // Add SV-05
    if (lcPhase === 4 && t - lastLcT > 6000) {
      seedServer(addServer('SV-05'), 2); lcPhase = 5; lastLcT = t
    }
    // Begin wind-down
    if (lcPhase === 5 && t - lastLcT > 7000) {
      resetting = true; lastDespawnT = t
    }
    // Gradually spawn players (up to 15 total) from phase 1 onward
    if (lcPhase >= 1 && t - lastSpawnT > 2500 && activeCount < 15) {
      const sv = svs.find(s => s.targetAlpha === 1)
      if (sv) { addPoint(sv.id); lastSpawnT = t }
    }
  } else {
    // Wind-down: despawn to 3 (initial count) at 800 ms intervals
    if (activeCount > 3 && t - lastDespawnT > 800) {
      const active = pts.filter(p => p.targetAlpha === 1)
      if (active.length) {
        active[Math.floor(Math.random() * active.length)].targetAlpha = 0
        lastDespawnT = t
      }
    }
    // Fade remaining survivors when count reaches 3
    if (activeCount <= 3 && !resetAt) {
      pts.filter(p => p.targetAlpha === 1).forEach(p => { p.targetAlpha = 0 })
      resetAt = t
    }
    // After fade-out, hard-reset
    if (resetAt && t - resetAt > 1000) resetSim(t)
  }

  // ── Ownership at 8 Hz ─────────────────────────────────────────
  if (t - lastOwnerMs > OWNERSHIP_MS) { reassignPoints(); lastOwnerMs = t }

  // ── Physics ───────────────────────────────────────────────────
  updateMotion()

  // ── Alpha / transition animations ─────────────────────────────
  for (const pt of pts) {
    pt.alpha  += (pt.targetAlpha - pt.alpha) * 0.06
    if (pt.spawnRing > 0) pt.spawnRing = Math.max(0, pt.spawnRing - 0.04)
    if (pt.colorT < 1)    pt.colorT    = Math.min(1, pt.colorT + 0.06)
  }
  for (let i = svs.length - 1; i >= 0; i--) {
    svs[i].alpha += (svs[i].targetAlpha - svs[i].alpha) * 0.04
    if (svs[i].alpha < 0.01 && svs[i].targetAlpha === 0) svs.splice(i, 1)
  }

  // ── HUD ──────────────────────────────────────────────────────
  activePlayers.value = pts.filter(p => p.alpha > 0.5).length
  activeServers.value = svs.filter(s => s.alpha > 0.5).length

  // ─────────────────────────────────────────────────────────────
  // RENDERING
  // ─────────────────────────────────────────────────────────────
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = '#030705'
  ctx.fillRect(0, 0, W, H)

  // Grid
  ctx.strokeStyle = 'rgba(13, 36, 33, 0.55)'
  ctx.lineWidth = 1
  for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
  for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

  // ── Server zones — non-overlapping via evenodd clip ───────────
  // Collect visible rects first so each server can punch out
  // already-claimed regions from servers drawn before it.
  const visRects: { sv: Sv; rect: Rect; sx: number; sy: number; sw: number; sh: number }[] = []
  for (const sv of [...svs].sort((a, b) => a.id - b.id)) {
    if (sv.alpha < 0.01) continue
    const rect = fitRect(sv); if (!rect) continue
    visRects.push({ sv, rect, sx: rect.x * W, sy: rect.y * H, sw: rect.w * W, sh: rect.h * H })
  }

  for (let i = 0; i < visRects.length; i++) {
    const { sv, rect, sx, sy, sw, sh } = visRects[i]
    const pal = PALETTE[sv.colorIdx % PALETTE.length]
    const load = pts.filter(p => p.alpha > 0.5 && p.serverId === sv.id).length
    const loadRatio = Math.min(1, load / 5)

    ctx.save()
    ctx.globalAlpha = sv.alpha

    // Build clip: this server's rect with holes for every earlier server's
    // overlapping area — evenodd rule makes overlaps transparent.
    ctx.beginPath()
    ctx.rect(sx, sy, sw, sh)
    for (let j = 0; j < i; j++) {
      const o = visRects[j]
      const x1 = Math.max(rect.x, o.rect.x) * W
      const x2 = Math.min(rect.x + rect.w, o.rect.x + o.rect.w) * W
      const y1 = Math.max(rect.y, o.rect.y) * H
      const y2 = Math.min(rect.y + rect.h, o.rect.y + o.rect.h) * H
      if (x2 > x1 && y2 > y1) ctx.rect(x1, y1, x2 - x1, y2 - y1)
    }
    ctx.clip('evenodd')

    // Weak zone fill
    ctx.fillStyle = pal.fill
    ctx.fillRect(sx, sy, sw, sh)

    // Strong zone fill (inner inset)
    const inset = Math.min(sw, sh) * 0.5 * WEAK_RATIO
    const iw = Math.max(0, sw - inset * 2), ih = Math.max(0, sh - inset * 2)
    if (iw > 0 && ih > 0) {
      ctx.globalAlpha = sv.alpha * 0.6
      ctx.fillStyle = pal.fill
      ctx.fillRect(sx + inset, sy + inset, iw, ih)
    }

    // Border (clipped to visible region — no bleed into neighbours)
    ctx.globalAlpha = sv.alpha
    ctx.strokeStyle = pal.border
    ctx.lineWidth = 1 + loadRatio * 0.8
    ctx.strokeRect(sx + 0.75, sy + 0.75, sw - 1.5, sh - 1.5)

    // Label
    ctx.fillStyle = pal.border
    ctx.font = '500 11px Onest, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(sv.label, sx + 8, sy + 16)

    // Load bar
    const barW = Math.min(sw * 0.6, 80)
    const bx = sx + sw - barW - 8, by = sy + sh - 8
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    ctx.fillRect(bx, by - 3, barW, 3)
    ctx.fillStyle = pal.border
    ctx.fillRect(bx, by - 3, barW * loadRatio, 3)

    ctx.restore()
  }

  // ── Trails ───────────────────────────────────────────────────
  for (const pt of pts) {
    if (pt.alpha < 0.01) continue
    for (const tp of pt.trail) {
      ctx.beginPath(); ctx.arc(tp.x * W, tp.y * H, 2, 0, Math.PI * 2)
      ctx.fillStyle = dotColor(pt.colorIdx, tp.a * 0.25 * pt.alpha); ctx.fill()
    }
  }

  // ── Players ───────────────────────────────────────────────────
  for (const pt of pts) {
    if (pt.alpha < 0.01) continue
    const px = pt.x * W, py = pt.y * H
    const col = pt.colorT < 1
      ? lerpColor(pt.prevColorIdx, pt.colorIdx, pt.colorT, pt.alpha)
      : dotColor(pt.colorIdx, pt.alpha)

    // Spawn ring
    if (pt.spawnRing > 0) {
      ctx.save()
      ctx.globalAlpha = pt.spawnRing * pt.alpha * 0.8
      ctx.beginPath(); ctx.arc(px, py, (1 - pt.spawnRing) * 24, 0, Math.PI * 2)
      ctx.strokeStyle = dotColor(pt.colorIdx, 1); ctx.lineWidth = 1.5; ctx.stroke()
      ctx.restore()
    }

    // Dot
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2)
    ctx.fillStyle = col; ctx.fill()
    // Ring border
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2)
    ctx.strokeStyle = dotColor(pt.colorIdx, pt.alpha * 0.4); ctx.lineWidth = 1.5; ctx.stroke()

    // Trail update
    pt.trail.push({ x: pt.x, y: pt.y, a: 1 })
    if (pt.trail.length > 14) pt.trail.shift()
    for (const tp of pt.trail) tp.a *= 0.82
  }

  // ── Auth-transfer labels ──────────────────────────────────────
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
}

// ── Canvas setup ──────────────────────────────────────────────────
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    const r = canvas.parentElement!.getBoundingClientRect()
    canvas.width = r.width
    canvas.height = Math.min(480, Math.round(r.width * 0.52))
  }
  resize()
  window.addEventListener('resize', resize)

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
