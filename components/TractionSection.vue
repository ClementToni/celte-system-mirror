<template>
  <section class="traction-section py-20 bg-[#DDE7FE]">
    <div class="container max-w-6xl mx-auto px-8">
      <h2 class="text-5xl font-bold text-center text-[#0047FF] mb-16">
        Why Leading Studios Trust Us
      </h2>

      <!-- Traction Metrics -->
      <div class="traction-grid grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div class="traction-card bg-white p-6 rounded-lg text-center">
          <div class="big-number text-5xl font-bold text-[#0047FF] mb-2">5</div>
          <p class="text-[#0047FF] opacity-75">Game studios in beta</p>
        </div>

        <div class="traction-card bg-white p-6 rounded-lg text-center">
          <div class="big-number text-5xl font-bold text-[#0047FF] mb-2">2.5M</div>
          <p class="text-[#0047FF] opacity-75">Player-hours tested</p>
        </div>

        <div class="traction-card bg-white p-6 rounded-lg text-center">
          <div class="big-number text-5xl font-bold text-[#0047FF] mb-2">99.8%</div>
          <p class="text-[#0047FF] opacity-75">Uptime reliability</p>
        </div>

        <div class="traction-card bg-white p-6 rounded-lg text-center">
          <div class="big-number text-5xl font-bold text-[#0047FF] mb-2">40ms</div>
          <p class="text-[#0047FF] opacity-75">Avg cross-server latency</p>
        </div>
      </div>

      <!-- Team Section -->
      <div class="team-section mb-16">
        <h3 class="text-3xl font-bold text-center text-[#0047FF] mb-12">
          Built By Game Infrastructure Veterans
        </h3>
        <div class="team-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="team-member bg-white p-6 rounded-lg text-center">
            <div class="w-32 h-32 bg-[#0047FF] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
              CT
            </div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-1">Clement Toni</h4>
            <p class="role text-[#0047FF] opacity-75 mb-3 font-semibold">CTO & Co-Founder</p>
            <p class="bio text-[#0047FF] opacity-75 text-sm leading-relaxed">
              12 years scaling MMO infrastructure. Built server solutions for AAA studios.
            </p>
          </div>

          <!-- Team Member 2 - Placeholder -->
          <div class="team-member bg-white p-6 rounded-lg text-center">
            <div class="w-32 h-32 bg-[#0047FF] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
              JD
            </div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-1">Your Co-Founder</h4>
            <p class="role text-[#0047FF] opacity-75 mb-3 font-semibold">CEO & Co-Founder</p>
            <p class="bio text-[#0047FF] opacity-75 text-sm leading-relaxed">
              Ex-AWS Game Tech. Led server solutions for 50+ game studios worldwide.
            </p>
          </div>

          <!-- Team Member 3 - Placeholder -->
          <div class="team-member bg-white p-6 rounded-lg text-center">
            <div class="w-32 h-32 bg-[#0047FF] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
              TS
            </div>
            <h4 class="text-xl font-bold text-[#0047FF] mb-1">Tech Lead</h4>
            <p class="role text-[#0047FF] opacity-75 mb-3 font-semibold">Lead Engineer</p>
            <p class="bio text-[#0047FF] opacity-75 text-sm leading-relaxed">
              Former distributed systems engineer. 8 years optimizing real-time networking.
            </p>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="trust-badges text-center mb-16">
        <p class="label text-[#0047FF] opacity-75 mb-6 uppercase tracking-wider text-sm font-semibold">
          Supported By
        </p>
        <div class="logos flex justify-center items-center gap-12 flex-wrap">
          <!-- Add actual logos when available -->
          <div class="logo-placeholder bg-white px-8 py-4 rounded-lg text-[#0047FF] opacity-60 font-semibold">
            AWS Activate
          </div>
          <div class="logo-placeholder bg-white px-8 py-4 rounded-lg text-[#0047FF] opacity-60 font-semibold">
            Unity Verified
          </div>
          <div class="logo-placeholder bg-white px-8 py-4 rounded-lg text-[#0047FF] opacity-60 font-semibold">
            Epitech Incubator
          </div>
        </div>
      </div>

      <!-- Featured Testimonial -->
      <div class="testimonials-detailed">
        <blockquote class="featured bg-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto border-l-4 border-[#0047FF]">
          <p class="text-2xl italic text-[#0047FF] mb-6">
            "We tested Celte for our Battle Royale. 500 players, zero lag. This changes everything."
          </p>
          <cite class="flex items-center gap-4 not-italic">
            <div class="w-12 h-12 bg-[#0047FF] rounded-full flex items-center justify-center text-white font-bold">
              DC
            </div>
            <div>
              <div class="font-semibold text-[#0047FF]">David Chen</div>
              <div class="text-[#0047FF] opacity-75 text-sm">Lead Engineer at Beta Studio</div>
            </div>
          </cite>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.traction-card,
.team-member {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.traction-card:hover,
.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 71, 255, 0.15);
}

.big-number {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
}
</style>


