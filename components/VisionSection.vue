<template>
  <section class="vision-section py-20 bg-white">
    <div class="container max-w-6xl mx-auto px-8">
      <h2 class="text-5xl font-bold text-center text-[#0047FF] mb-16 leading-tight">
        We're Building The Infrastructure<br />For The Next Era Of Gaming
      </h2>

      <!-- Market Opportunity -->
      <div class="market-opportunity bg-[#DDE7FE] p-12 rounded-lg mb-16 text-center">
        <div class="stat-highlight mb-6">
          <span class="big-number text-7xl font-bold text-[#0047FF]">$180B</span>
          <p class="text-2xl text-[#0047FF] mt-2">MMO & multiplayer market by 2027</p>
        </div>
        <p class="market-insight text-xl text-[#0047FF] leading-relaxed max-w-3xl mx-auto">
          Every major studio is racing to build "persistent worlds" and "metaverse experiences."
          <br /><br />
          <strong class="text-2xl">They all need what we've built.</strong>
        </p>
      </div>

      <!-- Roadmap -->
      <div class="roadmap mb-20">
        <h3 class="text-4xl font-bold text-center text-[#0047FF] mb-12">Our Roadmap</h3>
        <div class="timeline grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- Milestone 1 - Completed -->
          <div class="milestone completed bg-green-50 border-2 border-green-500 p-6 rounded-lg">
            <div class="date text-green-600 font-bold mb-2">Q4 2024</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-2">✓ Beta Launch</h4>
            <p class="text-[#0047FF] opacity-75 text-sm">MVP solution implemented inside a video game</p>
          </div>

          <!-- Milestone 2 - Current -->
          <div class="milestone current bg-[#0047FF] text-white p-6 rounded-lg shadow-lg transform scale-105">
            <div class="date font-bold mb-2">Q1 2025</div>
            <h4 class="text-xl font-bold mb-2">⚡ Seed Round</h4>
            <p class="opacity-90 text-sm">Scaling team & infrastructure</p>
          </div>

          <!-- Milestone 3 - Upcoming -->
          <div class="milestone upcoming bg-[#DDE7FE] p-6 rounded-lg">
            <div class="date text-[#0047FF] font-bold mb-2">Q2 2025</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-2">Public Beta</h4>
            <p class="text-[#0047FF] opacity-75 text-sm">Open to all game studios</p>
          </div>

          <!-- Milestone 4 - Future -->
          <div class="milestone upcoming bg-[#DDE7FE] p-6 rounded-lg">
            <div class="date text-[#0047FF] font-bold mb-2">Q4 2025</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-2">Series A</h4>
            <p class="text-[#0047FF] opacity-75 text-sm">Expansion to other industries</p>
          </div>
        </div>
      </div>

      <!-- Future Use Cases -->
      <div class="future-use-cases mb-16">
        <h3 class="text-4xl font-bold text-center text-[#0047FF] mb-12">Beyond Gaming</h3>
        <div class="use-case-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Use Case 1 -->
          <div class="use-case bg-[#DDE7FE] p-6 rounded-lg text-center">
            <div class="icon text-5xl mb-4">🌍</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-3">Metaverse Platforms</h4>
            <p class="text-[#0047FF] opacity-75 text-sm leading-relaxed">
              Enable persistent virtual worlds with millions of concurrent users
            </p>
          </div>

          <!-- Use Case 2 -->
          <div class="use-case bg-[#DDE7FE] p-6 rounded-lg text-center">
            <div class="icon text-5xl mb-4">🏙️</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-3">Virtual Events</h4>
            <p class="text-[#0047FF] opacity-75 text-sm leading-relaxed">
              Concerts, conferences, expos at unprecedented scale
            </p>
          </div>

          <!-- Use Case 3 -->
          <div class="use-case bg-[#DDE7FE] p-6 rounded-lg text-center">
            <div class="icon text-5xl mb-4">🔬</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-3">Simulations</h4>
            <p class="text-[#0047FF] opacity-75 text-sm leading-relaxed">
              Military, scientific, and training simulations
            </p>
          </div>

          <!-- Use Case 4 -->
          <div class="use-case bg-[#DDE7FE] p-6 rounded-lg text-center">
            <div class="icon text-5xl mb-4">🏢</div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-3">Virtual Offices</h4>
            <p class="text-[#0047FF] opacity-75 text-sm leading-relaxed">
              Next-gen remote collaboration platforms
            </p>
          </div>
        </div>
      </div>

      <!-- Vision Quote -->
      <blockquote class="vision-quote bg-[#0047FF] text-white p-12 rounded-lg text-center max-w-4xl mx-auto">
        <p class="text-3xl italic mb-6 leading-relaxed">
          "In 10 years, every multiplayer experience will run on server meshing. We're making that future happen today."
        </p>
        <cite class="not-italic font-semibold text-xl opacity-90">
          — Clement Toni, CEO Celte
        </cite>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.use-case,
.milestone {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.use-case:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 71, 255, 0.15);
}

.milestone.upcoming:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 71, 255, 0.15);
}

.big-number {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
}

.timeline {
  position: relative;
}
</style>


