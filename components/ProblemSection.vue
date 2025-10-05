<template>
  <section class="problem-section py-20 bg-white">
    <div class="container max-w-6xl mx-auto px-8">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold text-[#0047FF] mb-6">
          "Why can't we have 1000 players in the same world?"
        </h2>
        <p class="text-2xl text-[#0047FF] opacity-80">
          Every game studio faces the same infrastructure nightmare
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div class="stat-card bg-[#DDE7FE] p-8 rounded-lg text-center">
          <div class="big-number text-6xl font-bold text-[#0047FF] mb-3">200</div>
          <p class="text-lg text-[#0047FF]">Average player cap per server in 2024</p>
        </div>

        <div class="stat-card bg-[#DDE7FE] p-8 rounded-lg text-center">
          <div class="big-number text-6xl font-bold text-[#0047FF] mb-3">$40K+</div>
          <p class="text-lg text-[#0047FF]">Monthly server costs for a mid-size MMO</p>
        </div>

        <div class="stat-card bg-[#DDE7FE] p-8 rounded-lg text-center">
          <div class="big-number text-6xl font-bold text-[#0047FF] mb-3">67%</div>
          <p class="text-lg text-[#0047FF]">Of players quit after experiencing server lag</p>
        </div>

        <div class="stat-card bg-[#DDE7FE] p-8 rounded-lg text-center">
          <div class="big-number text-6xl font-bold text-[#0047FF] mb-3">$180B</div>
          <p class="text-lg text-[#0047FF]">Global MMO market by 2027</p>
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 71, 255, 0.15);
}

.big-number {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
}
</style>

