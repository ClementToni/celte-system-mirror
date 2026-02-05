<template>
  <div class="landing-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="flex items-center justify-between w-full">
            <img src="/public/celte-logo-white.png" alt="Celte" class="w-10 h-10" />
            <h1 class="text-5xl absolute left-1/2 transform -translate-x-1/2">Celte</h1>
            <nav class="nav-menu">
              <!-- <a href="#" class="nav-link active">Home</a> -->
              <a href="https://zcal.co/clement-toni/30min" class="nav-link" target="_blank">Call Us</a>
              <!-- <a href="https://celte-team.github.io" class="nav-link" target="_blank">Documentation</a> -->
            </nav>
          </div>
        </div>
      </div>
    </header>

    <!-- Sticky CTA Bar -->
    <StickyCtaBar />

    <!-- Hero Section - Improved -->
    <section class="hero-section flex flex-col items-center">
      <!-- Background Video -->
      <video autoplay loop muted playsinline class="hero-background-video">
        <source src="/videos/dynamic-server-meshing.mp4" type="video/mp4">
      </video>

      <!-- Overlay to ensure text readability -->
      <div class="hero-overlay"></div>

      <div class="text-center max-w-4xl mx-auto px-5 mb-16 relative z-10">

        <!-- Main Headline -->
        <h1 class="text-5xl md:text-7xl leading-tight tracking-[-0.042em] text-white font-bold mb-6">
          Multiplayer games are limited to 200 players per server.<br />
          <span class="text-[#00D9FF]">What if they weren't?</span>
        </h1>

        <!-- Subheadline with metrics -->
        <!-- <p class="text-xl md:text-2xl leading-relaxed text-[#0047FF] opacity-90 mb-8">
          Celte enables <strong>10,000+ concurrent players</strong> on unlimited maps<br />
          with <strong>40% lower server costs</strong>
        </p>
        -->

        <!-- Impact Metrics -->
        <!-- <div class="flex flex-wrap justify-center gap-8 mb-10">
          <div class="metric">
            <div class="text-4xl font-bold text-[#0047FF]">10,000+</div>
            <div class="text-sm text-[#0047FF] opacity-75">Concurrent Players</div>
          </div>
          <div class="metric">
            <div class="text-4xl font-bold text-[#0047FF]">40%</div>
            <div class="text-sm text-[#0047FF] opacity-75">Cost Reduction</div>
          </div>
          <div class="metric">
            <div class="text-4xl font-bold text-[#0047FF]">Unlimited</div>
            <div class="text-sm text-[#0047FF] opacity-75">Map Size</div>
          </div>
          <div class="metric">
            <div class="text-4xl font-bold text-[#0047FF]">Zero</div>
            <div class="text-sm text-[#0047FF] opacity-75">Loading Screens</div>
          </div>
        </div> -->

        <!-- CTAs -->
        <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <a href="mailto:celte.system@gmail.com?subject=Investor Inquiry" class="inline-block px-8 py-4 bg-[#0047FF] text-white rounded-full text-lg font-bold border-2 border-[#0047FF] transition-all hover:bg-transparent hover:text-[#0047FF] shadow-lg">
            Join Seed Round
          </a>
          <a href="#demo-map" class="inline-block px-8 py-4 bg-transparent text-[#0047FF] rounded-full text-lg font-bold border-2 border-[#0047FF] transition-all hover:bg-[#0047FF] hover:text-white">
            See The Technology
          </a>
        </div> -->
      </div>
    </section>

    <!-- Problem Section -->
    <ProblemSection />
    <ServerMeshMap id="demo-map" />
    <!-- <AwsPriceComparison /> -->
    <!-- <CostComparison /> -->
    <!-- Features Section -->
    <section class="features" id="learn-more">
      <div class="container">
        <h2>Efficient Solutions</h2>
        <p class="section-subtitle">
          Our innovating approach ensures efficient solutions that reduce server costs while enhancing player experience.
        </p>
        <div class="features-grid">
          <div class="feature-card flex flex-col items-center justify-center">
            <div class="feature-icon flex justify-center items-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
            <!-- We are able to dynamically split your map into multiple smaller zones, and distribute them across multiple servers
             a lot of player mean a lot of servers when there is less player, the servers will be merged into fewer zones.
            -->
            <h3>Reduce server cost</h3>
            <p class="text-lg leading-relaxed text-justify">
              With Celte, you only use the servers you need, cutting unnecessary costs. <br> By dynamically scaling infrastructure based on real-time demand.
              <!-- Celte's server meshing technology optimizes resource allocation, ensuring you only use the servers you need, cutting unnecessary costs. By dynamically scaling infrastructure based on real-time demand, studios can reduce expenses while maintaining high performance. -->
              <!-- Celte's server meshing technology optimizes resource allocation by distributing the game world across different nodes instead of relying on a single dedicated server. This means more players, larger worlds, and seamless scalability without performance bottlenecks. -->
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon flex justify-center items-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12H18L15 21L9 3L6 12H2" />
              </svg>
            </div>
            <h3>Transform Your Infrastructure into a Scalable, Dynamic System</h3>
            <p class="text-lg leading-relaxed text-justify">
              <!-- Our technology automatically divides your map into smaller, manageable zones and intelligently distributes them across multiple servers. -->
              <!-- <br> -->
              As player activity increases, more servers are deployed to handle the load. When activity drops, zones are efficiently merged, reducing the number of active servers.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon flex justify-center items-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3h18v18H3z"/>
                <path d="M3 9h18"/>
                <path d="M3 15h18"/>
                <path d="M9 3v18"/>
                <path d="M15 3v18"/>
              </svg>
            </div>
            <h3>Unlimited Map Size</h3>
            <p class="text-lg leading-relaxed text-justify">
              Break map size limits with Celte's server meshing. Build seamless, dynamic worlds without boundaries or loading screens—just endless possibilities.
            </p>
          </div>

        <!-- <AwsComparison /> -->

          <!-- <div class="feature-card">
            <div class="feature-icon flex justify-center items-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" />
              </svg>
            </div>
            <h3>Expert Support</h3>
            <p>
              Count on Celte for expert support in server-side development. Our dedicated team is committed to ensuring your systems run smoothly, providing reliable assistance whenever you need it.
            </p>
          </div> -->
        </div>
      </div>
    </section>

    <!-- Traction Section -->
    <!-- <TractionSection /> -->

    <!-- Solution Section -->
    <section class="solution">
      <div class="">
        <h2 class="text-center text-4xl mb-14 text-white font-bold">Our Solution</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 max-w-6xl mx-auto px-8 mt-12">
          <div class="solution-card bg-[#1A1F2E]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-8 rounded-xl">
            <h3 class="text-3xl mb-4 text-[#00D9FF] font-bold">What is Server Meshing?</h3>
            <p class="text-lg leading-relaxed text-justify text-[#9CA3AF]">
              Server meshing is a revolutionary technology that allows multiple servers to work together dynamically, distributing the game world across different nodes instead of relying on a single dedicated server. This means more players, larger worlds, and seamless scalability without performance bottlenecks.
            </p>
          </div>
          <div class="solution-card bg-[#1A1F2E]/60 backdrop-blur-lg border border-[#00D9FF]/20 p-8 rounded-xl">
            <h3 class="text-3xl mb-4 text-[#00D9FF] font-bold">Why is it game changer?</h3>
            <p class="text-lg leading-relaxed text-justify text-[#9CA3AF]">
              Traditional servers struggle with high player counts and complex environments, leading to lag, crashes, and high costs. With Celte's server meshing, studios can scale efficiently, reduce server expenses, and deliver a fluid, uninterrupted gaming experience—ensuring players stay immersed, no matter how big the game gets.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <VisionSection />

    <!-- CTA Hub - Replaces old footer newsletter -->
    <!-- <CtaHub /> -->

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-left">
            <span class="footer-brand">Celte</span>
            <span class="footer-separator">•</span>
            <a href="mailto:celte.system@gmail.com" class="footer-email">celte.system@gmail.com</a>
          </div>

          <div class="footer-center">
            <p class="copyright">© 2026 Celte. All rights reserved.</p>
          </div>

          <div class="footer-right">
            <div class="social-links">
              <a href="https://x.com/CelteSystem" class="social-link" target="_blank" rel="noopener noreferrer">
                <img src="/images/x-icon.svg" alt="X (Twitter)" />
              </a>
              <a href="https://www.linkedin.com/company/celte-system" class="social-link" target="_blank" rel="noopener noreferrer">
                <img src="/images/linkedin-icon.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div>
      <!-- <AwsComparison /> -->
    </div>
  </div>
</template>

<script setup>
import AboutSection from '~/components/AboutSection.vue'
import ProblemSection from '~/components/ProblemSection.vue'
import TractionSection from '~/components/TractionSection.vue'
import VisionSection from '~/components/VisionSection.vue'
import CtaHub from '~/components/CtaHub.vue'
import StickyCtaBar from '~/components/StickyCtaBar.vue'
</script>

<style>
/* Global Styles - Electric Blue Deep Tech Theme */
:root {
  /* Dark Matter Backgrounds */
  --primary-bg: #0A0E1A;
  --secondary-bg: #1A1F2E;
  --card-bg: rgba(26, 31, 46, 0.6);

  /* Electric Blue Accents */
  --accent-primary: #00D9FF;
  --accent-secondary: #0084FF;
  --accent-glow: #7B61FF;

  /* Text Colors */
  --text-primary: #E5E7EB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;

  /* Glow Effects */
  --glow-cyan: 0 0 20px rgba(0, 217, 255, 0.3);
  --glow-cyan-hover: 0 0 30px rgba(0, 217, 255, 0.5);
  --glow-violet: 0 0 20px rgba(123, 97, 255, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-primary);
  background-color: var(--primary-bg);
  background-image:
    radial-gradient(at 0% 0%, rgba(0, 217, 255, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(123, 97, 255, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(0, 132, 255, 0.03) 0px, transparent 50%);
  background-attachment: fixed;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.header {
  background: rgba(10, 14, 26, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 217, 255, 0.1);
  padding: 20px 0;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 15px;
  font-weight: 400;
  color: var(--accent-primary);
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 15.5px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--accent-primary);
  text-shadow: var(--glow-cyan);
}

.nav-link.active {
  font-weight: 500;
  color: var(--accent-primary);
}

/* Hero Section Styles */
.hero-section {
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-bg) 0%, #0D1525 50%, var(--secondary-bg) 100%);
}

.hero-background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  opacity: 0.4;
  filter: brightness(0.6) contrast(1.2);
}

/* Ensure video covers on mobile */
@media (max-width: 768px) {
  .hero-section {
    min-height: 100vh;
    padding-top: 80px;
    padding-bottom: 40px;
  }

  .hero-background-video {
    object-fit: cover;
    object-position: center center;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.08) 0%, transparent 50%),
              linear-gradient(180deg, rgba(10, 14, 26, 0.3) 0%, rgba(10, 14, 26, 0.8) 100%);
  z-index: 1;
}

.hero {
  min-height: 100vh;
  background: radial-gradient(circle at center, #001233 0%, #000B1F 100%);
  display: flex;
  flex-direction: column;
  padding-top: 100px;
}

.hero-text {
  color: var(--primary-color);
  text-align: center;
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.hero-text h1 {
  font-size: 66px;
  line-height: 1.16;
  letter-spacing: -0.042em;
  margin-bottom: 20px;
  color: var(--text-primary);
  font-weight: 700;
  text-shadow: var(--glow-cyan);
}

.hero-text p {
  font-size: 18.6px;
  line-height: 1.5;
  margin-bottom: 30px;
  color: var(--text-secondary);
  opacity: 0.9;
}

.hero-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  width: 80%;
  height: auto;
  object-fit: cover;
}

.btn-primary {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--primary-bg);
  text-decoration: none;
  border-radius: 100px;
  font-size: 15px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: var(--glow-cyan);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-cyan-hover);
}

/* Features Section Styles */
.features {
  padding: 80px 0;
  background: var(--secondary-bg);
  position: relative;
}

.features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
}

.features h2 {
  font-size: 51.4px;
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-primary);
  font-weight: 700;
}

.section-subtitle {
  font-size: 16.7px;
  text-align: center;
  margin-bottom: 60px;
  color: var(--text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: stretch;
}

.feature-card {
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(0, 217, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: var(--glow-cyan);
  background: rgba(26, 31, 46, 0.8);
}

.feature-icon {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: var(--accent-primary);
  background: rgba(0, 217, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  background: rgba(0, 217, 255, 0.2);
  box-shadow: var(--glow-cyan);
}

.feature-card h3 {
  font-size: 18.75px;
  margin-bottom: 30px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--text-primary);
  font-weight: 600;
}

.feature-card p {
  font-size: 15px;
  line-height: 1.92;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  margin: 0;
  color: var(--text-secondary);
}

/* Solution Section Styles */
.solution {
  padding: 80px 0;
  background: var(--primary-bg);
  position: relative;
}

.solution::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-glow), transparent);
}

.solution h2 {
  font-size: 35.6px;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-primary);
  font-weight: 700;
}

.solution-content {
  max-width: 800px;
  margin: 0 auto;
}

.solution-text h3 {
  font-size: 43.3px;
  margin-bottom: 20px;
  color: var(--accent-primary);
  font-weight: 700;
}

.solution-text p {
  font-size: 18.75px;
  line-height: 1.21;
  margin-bottom: 40px;
  color: var(--text-secondary);
}

.solution-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.solution-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.05), transparent);
  transition: left 0.6s ease;
}

.solution-card:hover::before {
  left: 100%;
}

.solution-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
  background: rgba(26, 31, 46, 0.8);
}

/* Footer Styles */
.footer {
  background: var(--secondary-bg);
  padding: 30px 0;
  border-top: 1px solid rgba(0, 217, 255, 0.1);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.footer-brand {
  font-size: 20px;
  color: var(--accent-primary);
  font-weight: 700;
}

.footer-separator {
  color: var(--text-muted);
  font-size: 14px;
}

.footer-email {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-email:hover {
  color: var(--accent-primary);
}

.footer-center {
  flex: 1;
  text-align: center;
}

.copyright {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}

.footer-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.social-links {
  display: flex;
  gap: 16px;
  align-items: center;
}

.social-link {
  transition: all 0.3s ease;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 217, 255, 0.05);
  border: 1px solid rgba(0, 217, 255, 0.1);
}

.social-link:hover {
  opacity: 1;
  transform: translateY(-2px);
  background: rgba(0, 217, 255, 0.1);
  border-color: var(--accent-primary);
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
}

.social-link img {
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(89%) sepia(6%) saturate(362%) hue-rotate(182deg) brightness(95%) contrast(87%);
}

.social-link:hover img {
  filter: brightness(0) saturate(100%) invert(70%) sepia(99%) saturate(2799%) hue-rotate(160deg) brightness(101%) contrast(106%);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero-text h1 {
    font-size: 50px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    justify-content: center;
    width: 100%;
  }

  .footer-left {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 40px;
  }

  .footer {
    padding: 24px 0;
  }

  .footer-content {
    gap: 12px;
  }

  .footer-left {
    font-size: 14px;
  }

  .footer-brand {
    font-size: 18px;
  }

  .copyright {
    font-size: 12px;
  }
}
</style>