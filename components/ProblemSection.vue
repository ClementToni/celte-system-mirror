<template>
  <section class="problem-section py-12 sm:py-16 lg:py-20 bg-[#1A1F2E] relative">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"></div>
    <div class="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10 sm:mb-12 lg:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
          "Why can't we have 1000 players in the same world?"
        </h2>
        <!-- <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-[#9CA3AF] px-2">
          Every game studio faces the same infrastructure nightmare
        </p> -->
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
        <div class="stat-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-4 sm:p-6 lg:p-8 rounded-xl text-center">
          <div class="big-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00D9FF] mb-2 sm:mb-3">200</div>
          <p class="text-sm sm:text-base lg:text-lg text-[#E5E7EB]">Average player cap per server in 2024</p>
        </div>

        <div class="stat-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-4 sm:p-6 lg:p-8 rounded-xl text-center">
          <div class="big-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00D9FF] mb-2 sm:mb-3">$40K+</div>
          <p class="text-sm sm:text-base lg:text-lg text-[#E5E7EB]">Monthly server costs for a mid-size MMO</p>
        </div>

        <div class="stat-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-4 sm:p-6 lg:p-8 rounded-xl text-center">
          <div class="big-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00D9FF] mb-2 sm:mb-3">67%</div>
          <p class="text-sm sm:text-base lg:text-lg text-[#E5E7EB]">Of players quit after experiencing server lag</p>
        </div>

        <div class="stat-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-4 sm:p-6 lg:p-8 rounded-xl text-center">
          <div class="big-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00D9FF] mb-2 sm:mb-3">$180B</div>
          <p class="text-sm sm:text-base lg:text-lg text-[#E5E7EB]">Global MMO market by 2027</p>
        </div>
      </div>

      <!-- Testimonials -->
      <!-- <div class="testimonials grid grid-cols-1 md:grid-cols-2 gap-8">
        <blockquote class="bg-[#DDE7FE] p-8 rounded-lg border-l-4 border-[#0047FF]">
          <p class="text-xl italic text-[#0047FF] mb-4">
            "We had to split our playerbase into 50+ shards. It killed the 'massive' in our MMO."
          </p>
          <cite class="text-[#0047FF] opacity-75 not-italic font-semibold">
            — Lead Engineer, AAA Studio
          </cite>
        </blockquote>

        <blockquote class="bg-[#DDE7FE] p-8 rounded-lg border-l-4 border-[#0047FF]">
          <p class="text-xl italic text-[#0047FF] mb-4">
            "Server costs scale linearly with players. We can't afford to grow."
          </p>
          <cite class="text-[#0047FF] opacity-75 not-italic font-semibold">
            — CTO, Indie Game Studio
          </cite>
        </blockquote>
      </div> -->
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
  border-color: rgba(0, 217, 255, 0.5);
  background: rgba(10, 14, 26, 0.8);
}

.big-number {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
}
</style>

