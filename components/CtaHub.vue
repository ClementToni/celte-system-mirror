<template>
  <section class="cta-hub py-20 bg-gradient-to-br from-[#0047FF] to-[#0033CC]">
    <div class="container max-w-6xl mx-auto px-8">
      <h2 class="text-5xl font-bold text-center text-white mb-16">
        Join Us In Building The Future
      </h2>

      <!-- CTA Cards Grid -->
      <div class="cta-cards grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Investors CTA -->
        <div class="cta-card featured bg-white p-8 rounded-lg shadow-2xl relative">
          <div class="badge absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
            🔥 Limited Spots
          </div>
          <h3 class="text-2xl font-bold text-[#0047FF] mb-4 mt-4">Investors</h3>
          <p class="text-[#0047FF] opacity-75 mb-6 leading-relaxed">
            We're raising our seed round. Join leading tech VCs backing the future of gaming infrastructure.
          </p>
          <ul class="benefits mb-6 space-y-2">
            <li class="text-[#0047FF] flex items-start">
              <span class="mr-2">✓</span>
              <span>$180B addressable market</span>
            </li>
            <!-- <li class="text-[#0047FF] flex items-start">
              <span class="mr-2">✓</span>
              <span>5 studios already testing</span>
            </li> -->
            <li class="text-[#0047FF] flex items-start">
              <span class="mr-2">✓</span>
              <span>Proven tech with 99.8% uptime</span>
            </li>
          </ul>
          <a href="mailto:celte.system@gmail.com?subject=Investor Inquiry" class="btn-primary-large block w-full text-center bg-[#0047FF] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#0033CC] transition-all">
            Request Investor Deck
          </a>
          <p class="small-text text-center text-[#0047FF] opacity-75 text-sm mt-4">
            Or schedule a call: <a href="https://zcal.co/clement-toni/30min" target="_blank" class="underline hover:opacity-100">Book 30min</a>
          </p>
        </div>

        <!-- Studios CTA -->
        <div class="cta-card bg-white p-8 rounded-lg shadow-xl">
          <h3 class="text-2xl font-bold text-[#0047FF] mb-4">Game Studios</h3>
          <p class="text-[#0047FF] opacity-75 mb-6 leading-relaxed">
            Test Celte in your game. Join our beta program and scale beyond 200 players.
          </p>
          <ul class="benefits mb-6 space-y-2">
            <li class="text-[#0047FF] flex items-start">
              <span class="mr-2">✓</span>
              <span>Free during beta period</span>
            </li>
            <li class="text-[#0047FF] flex items-start">
              <span class="mr-2">✓</span>
              <span>Dedicated technical support</span>
            </li>
            <li class="text-[#0047FF] flex items-start">
              <span class="mr-2">✓</span>
              <span>Integration in 2 weeks</span>
            </li>
          </ul>
          <a href="https://zcal.co/clement-toni/30min" target="_blank" class="btn-secondary-large block w-full text-center bg-transparent border-2 border-[#0047FF] text-[#0047FF] py-4 rounded-lg font-bold text-lg hover:bg-[#0047FF] hover:text-white transition-all">
            Book a meeting
          </a>
        </div>

        <!-- Community CTA -->
        <div class="cta-card bg-white p-8 rounded-lg shadow-xl">
          <h3 class="text-2xl font-bold text-[#0047FF] mb-4">Community</h3>
          <p class="text-[#0047FF] opacity-75 mb-6 leading-relaxed">
            Follow our journey as we revolutionize multiplayer gaming infrastructure.
          </p>
          <div class="social-grid space-y-3 mb-6">
            <a href="https://x.com/celte_system" target="_blank" class="social-cta flex items-center justify-between bg-[#DDE7FE] p-3 rounded-lg hover:bg-[#0047FF] hover:text-white transition-all group">
              <div class="flex items-center gap-3">
                <img src="/images/x-icon.svg" alt="X (Twitter)" class="w-6 h-6 text-[#0047FF] group-hover:text-white" />
                <span class="font-semibold text-[#0047FF] group-hover:text-white">Follow on X</span>
              </div>
              <span class="count text-sm text-[#0047FF] opacity-75 group-hover:text-white">Follow</span>
            </a>
            <a href="https://www.linkedin.com/company/celte-system" target="_blank" class="social-cta flex items-center justify-between bg-[#DDE7FE] p-3 rounded-lg hover:bg-[#0047FF] hover:text-white transition-all group">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span class="font-semibold text-[#0047FF] group-hover:text-white">Follow on LinkedIn</span>
              </div>
              <span class="count text-sm text-[#0047FF] opacity-75 group-hover:text-white">Connect</span>
            </a>
          </div>
          <form class="newsletter-inline" @submit.prevent="handleSubscribe">
            <input
              type="email"
              v-model="email"
              placeholder="Get updates via email"
              class="w-full px-4 py-3 border-2 border-[#0047FF] rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#0047FF]"
            />
            <button type="submit" class="w-full bg-[#0047FF] text-white py-3 rounded-lg font-bold hover:bg-[#0033CC] transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  if (email.value) {
    alert(`Thank you for subscribing with ${email.value}!`)
    email.value = ''
  }
}
</script>

<style scoped>
.cta-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-5px);
}

.cta-card.featured {
  border: 3px solid #0047FF;
}
</style>

