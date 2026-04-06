<template>
  <div>
    <AppNav />

    <!-- ─── Header ───────────────────────────────────────────── -->
    <section class="tech-hero">
      <div class="tech-hero-bg" />
      <div class="container">
        <div class="eyebrow">Technology</div>
        <h1 class="tech-h1">
          How server meshing<br />
          actually works.
        </h1>
        <p class="tech-sub">
          A deep look at the mechanisms that make seamless, infinite scale multiplayer possible:
          authority transfer, dynamic load balancing, and live server scaling.
        </p>
      </div>
    </section>

    <!-- ─── Live animation ────────────────────────────────────── -->
    <section class="anim-section">
      <div class="container">
        <div class="section-tag">Live simulation</div>
        <div class="anim-header">
          <p class="anim-caption">
            Observe players moving across server zones in real time. Servers scale up and down based
            on player density. Authority transfers happen seamlessly at every boundary crossing.
          </p>
          <div class="anim-stats">
            <div class="anim-stat">
              <span class="anim-stat-val">{{ anim?.activePlayers * 10 ?? 0 }}</span>
              <span class="anim-stat-key">Players</span>
            </div>
            <div class="anim-stat">
              <span class="anim-stat-val anim-stat-val--accent">{{ anim?.activeServers ?? 4 }}</span>
              <span class="anim-stat-key">Servers</span>
            </div>
          </div>
        </div>
        <ServerMeshAnimation ref="anim" />
      </div>
    </section>

    <!-- ─── Concepts ─────────────────────────────────────────── -->
    <section class="concepts">
      <div class="container">
        <div class="eyebrow">Core mechanisms</div>
        <h2 class="concepts-h2">Three problems. One runtime.</h2>

        <div class="concept-list">
          <!-- Authority Transfer -->
          <div class="concept">
            <div class="concept-header">
              <span class="concept-num">01</span>
              <h3 class="concept-title">Authority Transfer</h3>
            </div>
            <div class="concept-body">
              <div class="concept-text">
                <p>
                  In a traditional multiplayer setup, each object in the world is owned by a single
                  server. When a player moves from one server's zone to another, there must be a
                  handoff, but most engines implement this as a full loading screen or a hard
                  disconnect.
                  ELIOT ne me tape pas stp
                </p>
                <p>
                  Celte's authority transfer protocol operates at the network
                  level, below the game engine. The owning server writes a snapshot of the entity
                  state, the receiving server ingests it, and the handoff completes within a single
                  tick, typically under 1ms. The player notices nothing.
                </p>
                <ul class="concept-props">
                  <li>
                    <span class="prop-key">Protocol</span>
                    <span class="prop-val">UDP & TCP combined</span>
                  </li>
                  <li>
                    <span class="prop-key">Typical latency</span>
                    <span class="prop-val">&lt; 1ms</span>
                  </li>
                  <li>
                    <span class="prop-key">Player interruption</span>
                    <span class="prop-val">None</span>
                  </li>
                </ul>
              </div>
              <div class="concept-visual">
                <div class="transfer-diagram">
                  <div class="td-zone">
                    <span class="td-label">Server A</span>
                    <div class="td-player moving">
                      <span class="td-player-dot" />
                    </div>
                  </div>
                  <div class="td-arrow">
                    <div class="td-arrow-line" />
                    <span class="td-arrow-text">authority<br />transfer</span>
                    <div class="td-arrow-head" />
                  </div>
                  <div class="td-zone td-zone--b">
                    <span class="td-label">Server B</span>
                    <div class="td-player arrived">
                      <span class="td-player-dot" />
                    </div>
                  </div>
                </div>
                <p class="visual-note">No loading screen. No pop-in.</p>
              </div>
            </div>
          </div>

          <!-- Load Balancing -->
          <div class="concept">
            <div class="concept-header">
              <span class="concept-num">02</span>
              <h3 class="concept-title">Load Balancing</h3>
            </div>
            <div class="concept-body">
              <div class="concept-text">
                <p>
                  Game worlds are spatially uneven. A dozen players might congregate in a single
                  city while thousands of square kilometres sit empty. Static server zones waste
                  resources and create bottlenecks.
                </p>
                <p>
                  Celte continuously evaluates entity density and compute load per zone. When a
                  zone becomes too dense, it splits and automatically redistributes entities across
                  two smaller, lighter servers. When zones thin out, they merge. The game world
                  remains seamless; the backend topology changes without player awareness.
                </p>
                <ul class="concept-props">
                  <li>
                    <span class="prop-key">Metric</span>
                    <span class="prop-val">Spatial density, CPU load, or any configurable metric</span>
                  </li>
                  <li>
                    <span class="prop-key">Trigger</span>
                    <span class="prop-val">Configurable per game</span>
                  </li>
                  <li>
                    <span class="prop-key">Split / merge</span>
                    <span class="prop-val">Zero downtime</span>
                  </li>
                </ul>
              </div>
              <div class="concept-visual">
                <div class="lb-diagram">
                  <div class="lb-before">
                    <div class="lb-zone lb-hot">
                      <span class="lb-zone-label">Hot zone</span>
                      <div class="lb-dots">
                        <span v-for="i in 9" :key="i" class="lb-dot" />
                      </div>
                    </div>
                  </div>
                  <div class="lb-split-arrow">⟹</div>
                  <div class="lb-after">
                    <div class="lb-zone lb-cool">
                      <span class="lb-zone-label">Zone A</span>
                      <div class="lb-dots">
                        <span v-for="i in 4" :key="i" class="lb-dot" />
                      </div>
                    </div>
                    <div class="lb-zone lb-cool">
                      <span class="lb-zone-label">Zone B</span>
                      <div class="lb-dots">
                        <span v-for="i in 5" :key="i" class="lb-dot" />
                      </div>
                    </div>
                  </div>
                </div>
                <p class="visual-note">Zone split on density threshold. Players stay connected.</p>
              </div>
            </div>
          </div>

          <!-- Dynamic Scaling -->
          <div class="concept">
            <div class="concept-header">
              <span class="concept-num">03</span>
              <h3 class="concept-title">Dynamic Scaling</h3>
            </div>
            <div class="concept-body">
              <div class="concept-text">
                <p>
                  Game CCU follows predictable daily curves with unpredictable spikes. Provisioning
                  for peak at all times means paying for 80% idle infrastructure during off-hours.
                </p>
                <p>
                  Celte's scaling layer watches your real-time CCU and adjusts the server fleet
                  continuously. New instances are pre-warmed so they're ready before demand
                  arrives. Idle instances are drained and terminated within minutes. Your cloud
                  bill tracks your player count, not your worst-case capacity plan.
                </p>
                <ul class="concept-props">
                  <li>
                    <span class="prop-key">Scaling trigger</span>
                    <span class="prop-val">Real-time CCU signal</span>
                  </li>
                  <li>
                    <span class="prop-key">Scale-up time</span>
                    <span class="prop-val">&lt; 30s cold start</span>
                  </li>
                  <li>
                    <span class="prop-key">Cost reduction</span>
                    <span class="prop-val">Avg. up to –40% vs. static fleet</span>
                  </li>
                </ul>
              </div>
              <div class="concept-visual">
                <div class="scale-chart">
                  <div class="scale-chart-inner">
                    <div class="scale-area ccu-area" />
                    <div class="scale-area srv-area" />
                    <div class="scale-axis">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>24:00</span>
                    </div>
                  </div>
                  <div class="scale-legend">
                    <span class="scale-legend-ccu">CCU</span>
                    <span class="scale-legend-srv">Server count</span>
                  </div>
                </div>
                <p class="visual-note">Server count mirrors CCU. No idle waste.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Stack ────────────────────────────────────────────── -->
    <!-- <section class="stack-section">
      <div class="container">
        <div class="eyebrow">Technical stack</div>
        <h2 class="stack-h2">Built in Rust. Available everywhere.</h2>
        <div class="stack-grid">
          <div v-for="item in stack" :key="item.layer" class="stack-row">
            <span class="stack-layer">{{ item.layer }}</span>
            <span class="stack-tech">{{ item.tech }}</span>
            <span class="stack-note">{{ item.note }}</span>
          </div>
        </div>
      </div>
    </section> -->

    <!-- ─── CTA ───────────────────────────────────────────────── -->
    <section class="tech-cta">
      <div class="container">
        <h2 class="tech-cta-h2">Integrate in days, not months.</h2>
        <p class="tech-cta-sub">
          Celte ships natively with a Unity SDK.
          <!-- Integration takes a weekend. -->
        </p>
        <!-- <div class="cta-actions">
          <NuxtLink to="/contact" class="btn-primary">Contact Us →</NuxtLink>
          <a href="https://docs.celte.dev" target="_blank" rel="noopener" class="btn-ghost">
            Read the docs
          </a>
        </div> -->
        <NuxtLink to="/contact" class="btn-primary">Contact Us →</NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

definePageMeta({ layout: false })

const anim = ref<{ activePlayers: Ref<number>; activeServers: Ref<number> } | null>(null)

const stack = [
  {
    layer: 'Core runtime',
    tech: 'Rust',
    note: 'Zero-cost abstractions, memory safety, sub-millisecond latency',
  },
  {
    layer: 'Transport',
    tech: 'QUIC / UDP',
    note: 'Low-latency, multiplexed, connection-resilient',
  },
  {
    layer: 'Unity SDK',
    tech: 'C# native',
    note: 'Drop-in GDK for Unity with MonoBehaviour integration',
  },
  {
    layer: 'FFI layer',
    tech: 'C ABI',
    note: 'Stable interface consumable from C#, C++, Python, Go, etc.',
  },
  {
    layer: 'Orchestration',
    tech: 'Kubernetes / custom',
    note: 'Cloud-agnostic, runs on AWS, GCP, Azure, bare metal',
  },
  {
    layer: 'Observability',
    tech: 'OpenTelemetry',
    note: 'CCU metrics, zone load, authority transfer latency',
  },
]
</script>

<style scoped>
/* ── Shared ─────────────────────────────────────────────────── */
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

.btn-primary {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 28px;
  background: var(--accent);
  color: #030705;
  border-radius: 6px;
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
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 6px;
  transition: border-color 0.2s, color 0.2s;
}

.btn-ghost:hover {
  border-color: rgba(212, 235, 235, 0.4);
  color: var(--text);
}

/* ── Hero ─────────────────────────────────────────────────────── */
.tech-hero {
  position: relative;
  padding: 9rem 0 6rem;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.tech-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 0%,
    rgba(128, 224, 199, 0.04) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.tech-h1 {
  font-size: clamp(40px, 5.5vw, 68px);
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 1.5rem;
  max-width: 720px;
}

.tech-sub {
  font-size: 17px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--muted);
  max-width: 580px;
}

/* ── Animation section ────────────────────────────────────────── */
.anim-section {
  padding: 7rem 0;
  border-bottom: 1px solid var(--border);
}

.section-tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid rgba(128, 224, 199, 0.2);
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 1.25rem;
}

.anim-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.anim-caption {
  font-size: 14px;
  font-weight: 300;
  color: var(--muted);
  max-width: 560px;
  line-height: 1.65;
}

.anim-stats {
  display: flex;
  gap: 2rem;
  flex-shrink: 0;
}

.anim-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.anim-stat-val {
  font-size: 32px;
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  min-width: 2ch;
  text-align: right;
}

.anim-stat-val--accent {
  color: var(--accent);
}

.anim-stat-key {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

/* ── Concepts ───────────────────────────────────────────────── */
.concepts {
  padding: 7rem 0;
  border-bottom: 1px solid var(--border);
}

.concepts-h2 {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 5rem;
}

.concept-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.concept {
  padding: 4rem 0;
  border-top: 1px solid var(--border);
}

.concept-header {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.concept-num {
  font-size: 12px;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: 0.05em;
  opacity: 0.6;
}

.concept-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 300;
  letter-spacing: -0.03em;
  color: var(--text);
}

.concept-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.concept-text {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.concept-text p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.75;
  color: rgba(212, 235, 235, 0.65);
}

.concept-props {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
}

.concept-props li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.prop-key {
  color: var(--muted);
  font-weight: 300;
}

.prop-val {
  color: var(--text);
  font-weight: 400;
  font-size: 13px;
}

/* ── Transfer diagram ────────────────────────────────────────── */
.concept-visual {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.visual-note {

  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.02em;
  text-align: center;
  opacity: 1;
  color: var(--text);
}

.transfer-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2.5rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.td-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px dashed rgba(128, 224, 199, 0.2);
  border-radius: 8px;
  min-width: 100px;
}

.td-zone--b {
  border-color: rgba(128, 224, 199, 0.4);
  background: rgba(128, 224, 199, 0.04);
}

.td-label {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.td-player {
  position: relative;
}

.td-player-dot {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--text);
  border: 2px solid var(--accent);
}

.td-player.moving .td-player-dot {
  opacity: 0.5;
  animation: movingPulse 1.5s ease-in-out infinite;
}

.td-player.arrived .td-player-dot {
  background: var(--accent);
}

@keyframes movingPulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
}

.td-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.td-arrow-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, rgba(128, 224, 199, 0.3), rgba(128, 224, 199, 0.8));
}

.td-arrow-text {
  font-size: 10px;
  color: var(--accent);
  text-align: center;
  letter-spacing: 0.04em;
  opacity: 1;
}

.td-arrow-head {
  width: 0;
  height: 0;
  border-left: 5px solid rgba(128, 224, 199, 0.7);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  align-self: flex-end;
  margin-right: 2px;
}

/* ── Load balancing diagram ─────────────────────────────────── */
.lb-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2.5rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.lb-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px dashed rgba(128, 224, 199, 0.2);
  border-radius: 8px;
  min-width: 90px;
}

.lb-zone-label {
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.lb-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  max-width: 64px;
}

.lb-dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text);
  opacity: 0.6;
}

.lb-hot {
  border-color: rgba(212, 100, 100, 0.4);
  background: rgba(212, 100, 100, 0.04);
}

.lb-hot .lb-dot {
  background: rgba(212, 180, 100, 0.9);
}

.lb-cool .lb-dot {
  background: var(--accent);
  opacity: 0.7;
}

.lb-split-arrow {
  font-size: 20px;
  color: var(--accent);
  opacity: 0.6;
}

.lb-after {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ── Scale chart ────────────────────────────────────────────── */
.scale-chart {
  padding: 2rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.scale-chart-inner {
  position: relative;
  height: 80px;
  margin-bottom: 0.75rem;
}

.scale-area {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 50px;
  border-radius: 4px;
}

.ccu-area {
  background: linear-gradient(
    90deg,
    rgba(128, 224, 199, 0.1) 0%,
    rgba(128, 224, 199, 0.5) 30%,
    rgba(128, 224, 199, 0.8) 50%,
    rgba(128, 224, 199, 0.5) 70%,
    rgba(128, 224, 199, 0.2) 100%
  );
  clip-path: polygon(
    0% 100%,
    0% 80%,
    5% 60%,
    15% 35%,
    25% 15%,
    35% 5%,
    50% 0%,
    65% 10%,
    75% 30%,
    85% 55%,
    95% 75%,
    100% 85%,
    100% 100%
  );
}

.srv-area {
  background: rgba(212, 235, 235, 0.12);
  clip-path: polygon(
    0% 100%,
    0% 82%,
    5% 63%,
    15% 38%,
    25% 18%,
    35% 8%,
    50% 3%,
    65% 13%,
    75% 33%,
    85% 58%,
    95% 78%,
    100% 88%,
    100% 100%
  );
}

.scale-axis {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--muted);
  opacity: 0.6;
}

.scale-legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  font-size: 11px;
}

.scale-legend-ccu {
  color: var(--accent);
  opacity: 0.8;
}

.scale-legend-srv {
  color: var(--muted);
}

/* ── Stack section ──────────────────────────────────────────── */
.stack-section {
  padding: 7rem 0;
  border-bottom: 1px solid var(--border);
}

.stack-h2 {
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 3rem;
}

.stack-grid {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.stack-row {
  display: grid;
  grid-template-columns: 180px 1fr 1fr;
  gap: 1.5rem;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
}

.stack-row:last-child {
  border-bottom: none;
}

.stack-row:hover {
  background: var(--surface);
}

.stack-layer {
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 400;
}

.stack-tech {
  font-size: 15px;
  font-weight: 400;
  color: var(--accent);
}

.stack-note {
  font-size: 13.5px;
  font-weight: 300;
  /* color: rgba(212, 235, 235, 0.55); */
  line-height: 1.5;
}

/* ── CTA ─────────────────────────────────────────────────────── */
.tech-cta {
  padding: 8rem 0;
  text-align: center;
}

.tech-cta-h2 {
  font-size: clamp(30px, 4vw, 52px);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 1.25rem;
}

.tech-cta-sub {
  font-size: 16px;
  font-weight: 300;
  color: var(--text);
  max-width: 480px;
  margin: 0 auto 2.5rem;
  line-height: 1.65;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .concept-body {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .stack-row {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .stack-note {
    grid-column: 1 / -1;
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .transfer-diagram,
  .lb-diagram {
    flex-direction: column;
    gap: 1rem;
  }

  .td-arrow {
    transform: rotate(90deg);
  }
}
</style>
