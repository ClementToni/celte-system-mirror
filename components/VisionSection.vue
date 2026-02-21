<template>
  <section class="vision-section py-12 sm:py-16 lg:py-20 bg-[#0A0E1A] relative">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent"></div>
    <div class="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-10 sm:mb-12 lg:mb-16 leading-tight px-2">
        We're Building The Infrastructure<br class="hidden sm:block" />For The Next Era Of Gaming
      </h2>

      <!-- Market Opportunity -->
      <div class="market-opportunity bg-gradient-to-br from-[#1A1F2E] to-[#0A0E1A] border border-[#00D9FF]/30 p-6 sm:p-8 lg:p-12 rounded-2xl mb-10 sm:mb-12 lg:mb-16 text-center relative overflow-hidden backdrop-blur-xl">
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-[#00D9FF]/5 to-transparent pointer-events-none"></div>
        <div class="stat-highlight mb-4 sm:mb-5 lg:mb-6 relative z-10">
          <span class="big-number text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#00D9FF]" style="text-shadow: 0 0 30px rgba(0, 217, 255, 0.5)">$180B</span>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E5E7EB] mt-1 sm:mt-2">MMO & multiplayer market by 2027</p>
        </div>
        <p class="market-insight text-sm sm:text-base md:text-lg lg:text-xl text-[#9CA3AF] leading-relaxed max-w-3xl mx-auto relative z-10">
          Every major studio is racing to build "persistent worlds" and "metaverse experiences."
          <br /><br />
          <strong class="text-base sm:text-lg md:text-xl lg:text-2xl text-[#00D9FF]">We provide the infrastructure to make it happen.</strong>
        </p>
      </div>

      <!-- Roadmap -->


      <!-- Future Use Cases -->
      <!-- <div class="future-use-cases mb-10 sm:mb-12 lg:mb-16">
        <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#0047FF] mb-6 sm:mb-8 lg:mb-12 px-2">Beyond Gaming</h3>
        <div class="use-case-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          <div class="use-case bg-[#DDE7FE] p-4 sm:p-5 lg:p-6 rounded-lg text-center">
            <div class="icon text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">🌍</div>
            <h4 class="text-base sm:text-lg lg:text-xl font-bold text-[#0047FF] mb-2 sm:mb-3">Metaverse Platforms</h4>
            <p class="text-[#0047FF] opacity-75 text-xs sm:text-sm leading-relaxed">
              Enable persistent virtual worlds with millions of concurrent users
            </p>
          </div>

          <div class="use-case bg-[#DDE7FE] p-4 sm:p-5 lg:p-6 rounded-lg text-center">
            <div class="icon text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">🏙️</div>
            <h4 class="text-base sm:text-lg lg:text-xl font-bold text-[#0047FF] mb-2 sm:mb-3">Virtual Events</h4>
            <p class="text-[#0047FF] opacity-75 text-xs sm:text-sm leading-relaxed">
              Concerts, conferences, expos at unprecedented scale
            </p>
          </div>

          <div class="use-case bg-[#DDE7FE] p-4 sm:p-5 lg:p-6 rounded-lg text-center">
            <div class="icon text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">🔬</div>
            <h4 class="text-base sm:text-lg lg:text-xl font-bold text-[#0047FF] mb-2 sm:mb-3">Simulations</h4>
            <p class="text-[#0047FF] opacity-75 text-xs sm:text-sm leading-relaxed">
              Military, scientific, and training simulations
            </p>
          </div>

          <div class="use-case bg-[#DDE7FE] p-4 sm:p-5 lg:p-6 rounded-lg text-center">
            <div class="icon text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">🏢</div>
            <h4 class="text-base sm:text-lg lg:text-xl font-bold text-[#0047FF] mb-2 sm:mb-3">Virtual Offices</h4>
            <p class="text-[#0047FF] opacity-75 text-xs sm:text-sm leading-relaxed">
              Next-gen remote collaboration platforms
            </p>
          </div>
        </div>
      </div> -->

      <!-- Vision Quote -->
      <!-- <blockquote class="vision-quote bg-[#0047FF] text-white p-6 sm:p-8 lg:p-12 rounded-lg text-center max-w-4xl mx-auto">
        <p class="text-base sm:text-xl md:text-2xl lg:text-3xl italic mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
          "In 10 years, every multiplayer experience will run on server meshing. We're making that future happen today."
        </p>
        <cite class="not-italic font-semibold text-sm sm:text-base md:text-lg lg:text-xl opacity-90">
          — Clement Toni, CEO Celte
        </cite>
      </blockquote> -->
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
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
}

.milestone.upcoming:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
}

.big-number {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
}

.market-opportunity {
  transition: all 0.3s ease;
}

.market-opportunity:hover {
  border-color: rgba(0, 217, 255, 0.5);
  box-shadow: 0 0 40px rgba(0, 217, 255, 0.2);
}

.timeline {
  position: relative;
}
</style>


