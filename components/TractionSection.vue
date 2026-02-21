<template>
  <section class="traction-section py-20 bg-[#1A1F2E] relative">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"></div>
    <div class="container max-w-6xl mx-auto px-8">
      <h2 class="text-5xl font-bold text-center text-white mb-16">
        Why Leading Studios Trust Us
      </h2>

      <!-- Traction Metrics -->
      <div class="traction-grid grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div class="traction-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
          <div class="big-number text-5xl font-bold text-[#00D9FF] mb-2">5</div>
          <p class="text-[#E5E7EB]">Game studios in beta</p>
        </div>

        <div class="traction-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
          <div class="big-number text-5xl font-bold text-[#00D9FF] mb-2">2.5M</div>
          <p class="text-[#E5E7EB]">Player-hours tested</p>
        </div>

        <div class="traction-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
          <div class="big-number text-5xl font-bold text-[#00D9FF] mb-2">99.8%</div>
          <p class="text-[#E5E7EB]">Uptime reliability</p>
        </div>

        <div class="traction-card bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
          <div class="big-number text-5xl font-bold text-[#00D9FF] mb-2">40ms</div>
          <p class="text-[#E5E7EB]">Avg cross-server latency</p>
        </div>
      </div>

      <!-- Team Section -->
      <div class="team-section mb-16">
        <h3 class="text-3xl font-bold text-center text-white mb-12">
          Built By Game Infrastructure Veterans
        </h3>
        <div class="team-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="team-member bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-[#00D9FF] to-[#0084FF] rounded-full mx-auto mb-4 flex items-center justify-center text-[#0A0E1A] text-4xl font-bold">
              CT
            </div>
            <h4 class="text-xl font-bold text-white mb-1">Clement Toni</h4>
            <p class="role text-[#00D9FF] mb-3 font-semibold">CTO & Co-Founder</p>
            <p class="bio text-[#9CA3AF] text-sm leading-relaxed">
              12 years scaling MMO infrastructure. Built server solutions for AAA studios.
            </p>
          </div>

          <!-- Team Member 2 - Placeholder -->
          <div class="team-member bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-[#00D9FF] to-[#0084FF] rounded-full mx-auto mb-4 flex items-center justify-center text-[#0A0E1A] text-4xl font-bold">
              JD
            </div>
            <h4 class="text-xl font-bold text-white mb-1">Your Co-Founder</h4>
            <p class="role text-[#00D9FF] mb-3 font-semibold">CEO & Co-Founder</p>
            <p class="bio text-[#9CA3AF] text-sm leading-relaxed">
              Ex-AWS Game Tech. Led server solutions for 50+ game studios worldwide.
            </p>
          </div>

          <!-- Team Member 3 - Placeholder -->
          <div class="team-member bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-6 rounded-xl text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-[#00D9FF] to-[#0084FF] rounded-full mx-auto mb-4 flex items-center justify-center text-[#0A0E1A] text-4xl font-bold">
              TS
            </div>
            <h4 class="text-xl font-bold text-white mb-1">Tech Lead</h4>
            <p class="role text-[#00D9FF] mb-3 font-semibold">Lead Engineer</p>
            <p class="bio text-[#9CA3AF] text-sm leading-relaxed">
              Former distributed systems engineer. 8 years optimizing real-time networking.
            </p>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="trust-badges text-center mb-16">
        <p class="label text-[#9CA3AF] mb-6 uppercase tracking-wider text-sm font-semibold">
          Supported By
        </p>
        <div class="logos flex justify-center items-center gap-12 flex-wrap">
          <div class="logo-placeholder bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 px-8 py-4 rounded-lg text-[#E5E7EB] font-semibold">
            AWS Activate
          </div>
          <div class="logo-placeholder bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 px-8 py-4 rounded-lg text-[#E5E7EB] font-semibold">
            Unity Verified
          </div>
          <div class="logo-placeholder bg-[#0A0E1A]/60 backdrop-blur-lg border border-[#00D9FF]/20 px-8 py-4 rounded-lg text-[#E5E7EB] font-semibold">
            Epitech Incubator
          </div>
        </div>
      </div>

      <!-- Featured Testimonial -->
      <div class="testimonials-detailed">
        <blockquote class="featured bg-gradient-to-br from-[#1A1F2E] to-[#0A0E1A] backdrop-blur-xl border border-[#00D9FF]/30 p-10 rounded-2xl shadow-[0_0_40px_rgba(0,217,255,0.2)] max-w-3xl mx-auto border-l-4 border-[#00D9FF]">
          <p class="text-2xl italic text-[#E5E7EB] mb-6">
            "We tested Celte for our Battle Royale. 500 players, zero lag. This changes everything."
          </p>
          <cite class="flex items-center gap-4 not-italic">
            <div class="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0084FF] rounded-full flex items-center justify-center text-[#0A0E1A] font-bold">
              DC
            </div>
            <div>
              <div class="font-semibold text-white">David Chen</div>
              <div class="text-[#9CA3AF] text-sm">Lead Engineer at Beta Studio</div>
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.traction-card::before,
.team-member::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.traction-card:hover::before,
.team-member:hover::before {
  left: 100%;
}

.traction-card:hover,
.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
  border-color: rgba(0, 217, 255, 0.5);
}

.big-number {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
}

.logo-placeholder {
  transition: all 0.3s ease;
}

.logo-placeholder:hover {
  border-color: rgba(0, 217, 255, 0.5);
  transform: translateY(-2px);
}
</style>


