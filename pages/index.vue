<template>
  <div class="landing-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="flex items-center justify-between w-full">
            <img src="/public/celte-logo.webp" alt="Celte" class="w-10 h-10" />
            <h1 class="text-5xl absolute left-1/2 transform -translate-x-1/2">Celte</h1>
            <nav class="nav-menu">
              <!-- <a href="#" class="nav-link active">Home</a> -->
              <a href="https://zcal.co/clement-toni/30min" class="nav-link" target="_blank">Call Us</a>
              <a href="https://celte-team.github.io" class="nav-link" target="_blank">Documentation</a>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="mt-64 flex flex-col items-center">
      <div class="text-center max-w-3xl mx-auto px-5 mb-64  ">
        <!-- <h1 class="text-[66px] leading-tight tracking-[-0.042em] text-[#0047FF] font-normal mb-5">Empower Your Game Today</h1> -->
        <h1 class="text-[66px] leading-tight tracking-[-0.042em] text-[#0047FF] font-normal mb-5">Let's make your future game bigger and better</h1>
        <p class="text-lg leading-relaxed text-[#0047FF] opacity-90 mb-8">Optimize Your Gaming Infrastructure Today With Server Meshing</p>
        <a href="#demo-map" class="inline-block px-8 py-3 bg-[#0047FF] text-white rounded-full text-sm border border-[#0047FF] transition-all hover:bg-transparent hover:text-[#0047FF]">Learn More</a>
        <!-- add an arrow down icon svg here -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down"><path d="M6 9l6 6 6-6"/></svg> -->
      </div>
      <!-- <div class="w-full flex justify-center items-center h-3/4 w-9/10 mb-10">
        <img src="/images/hero-image.png" alt="Network Connections" class="w-4/5 h-auto object-cover" />
      </div> -->
    </section>
    <ServerMeshMap id="demo-map" />
    <!-- <AwsPriceComparison /> -->
    <CostComparison />
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

    <!-- Solution Section -->
    <section class="solution">
      <div class="">
        <h2 class="text-center text-4xl mb-14">Our Solution</h2>
        <div class="grid grid-cols-2 gap-32 max-w-6xl mx-auto px-8 mt-12">
          <div>
            <h3 class="text-3xl mb-4">What is Server Meshing?</h3>
            <p class="text-lg leading-relaxed text-justify">
              Server meshing is a revolutionary technology that allows multiple servers to work together dynamically, distributing the game world across different nodes instead of relying on a single dedicated server. This means more players, larger worlds, and seamless scalability without performance bottlenecks.
            </p>
          </div>
          <div>
            <h3 class="text-3xl mb-4">Why is it game changer?</h3>
            <p class="text-lg leading-relaxed text-justify">
              Traditional servers struggle with high player counts and complex environments, leading to lag, crashes, and high costs. With Celte's server meshing, studios can scale efficiently, reduce server expenses, and deliver a fluid, uninterrupted gaming experience—ensuring players stay immersed, no matter how big the game gets.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- <AboutSection /> -->

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h2>Celte</h2>
            <p>celte-info@gmail.com</p>
            <div class="social-links">
              <a href="https://discord.gg/4TsPmxuv" class="social-link">
                <img src="/images/discord-icon.png" alt="Discord" />
              </a>
              <a href="https://github.com/celte-team" class="social-link">
                <img src="/images/github-icon.png" alt="GitHub" />
              </a>
              <a href="https://celte-team.github.io/" class="social-link">
                <img src="/images/link-icon.png" alt="Link" />
              </a>
            </div>
          </div>
          <div class="footer-newsletter">
            <h3>Empowering Your Game Experience</h3>
            <form class="newsletter-form">
              <div class="form-group">
                <label for="email">Subscribe</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" />
                  <span class=" leading-relaxed text-justify ml-1">Yes, Subscribe me to newsletter</span>
                </label>
              </div>
              <button type="submit" class="btn-primary">Submit</button>
            </form>
          </div>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Accessibility Statement</a>
            <a href="#">Terms & Conditions</a>
          </div>
          <p class="copyright">© 2025 by Celte.</p>
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
</script>

<style>
/* Global Styles */
:root {
  --primary-color: #0047FF;
  --background-color: #DDE7FE;
  --text-color: #0047FF;
  --white: #FFFFFF;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.header {
  background-color: var(--white);
  padding: 20px 0;
  /* position: fixed; */
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
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 15.5px;
}

.nav-link.active {
  font-weight: 500;
}

/* Hero Section Styles */
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
  color: var(--primary-color);
  font-weight: 400;
}

.hero-text p {
  font-size: 18.6px;
  line-height: 1.5;
  margin-bottom: 30px;
  color: var(--primary-color);
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
  background-color: var(--primary-color);
  color: var(--white);
  text-decoration: none;
  border-radius: 100px;
  font-size: 15px;
  border: 1px solid var(--primary-color);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

/* Features Section Styles */
.features {
  padding: 80px 0;
  background-color: rgba(255, 255, 255, 0.8);
}

.features h2 {
  font-size: 51.4px;
  text-align: center;
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 16.7px;
  text-align: center;
  margin-bottom: 60px;
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
}

.feature-icon {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: var(--text-color);
}

.feature-card h3 {
  font-size: 18.75px;
  margin-bottom: 30px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.feature-card p {
  font-size: 15px;
  line-height: 1.92;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  margin: 0;
}

/* Solution Section Styles */
.solution {
  padding: 80px 0;
}

.solution h2 {
  font-size: 35.6px;
  text-align: center;
  margin-bottom: 40px;
}

.solution-content {
  max-width: 800px;
  margin: 0 auto;
}

.solution-text h3 {
  font-size: 43.3px;
  margin-bottom: 20px;
}

.solution-text p {
  font-size: 18.75px;
  line-height: 1.21;
  margin-bottom: 40px;
}

/* Footer Styles */
.footer {
  background-color: var(--background-color);
  padding: 80px 0 40px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
}

.footer-brand h2 {
  font-size: 44.25px;
  margin-bottom: 10px;
  opacity: 0.88;
}

.footer-brand p {
  font-size: 13px;
  margin-bottom: 20px;
  opacity: 0.65;
}

.social-links {
  display: flex;
  gap: 20px;
  opacity: 0.65;
}

.social-link img {
  width: 24px;
  height: 24px;
}

.footer-newsletter h3 {
  font-size: 22.7px;
  margin-bottom: 30px;
}

.newsletter-form {
  opacity: 0.78;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
}

.form-group input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  font-size: 15px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14.9px;
}

.footer-links {
  grid-column: 1 / -1;
  display: flex;
  gap: 20px;
  opacity: 0.65;
}

.footer-links a {
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
}

.copyright {
  grid-column: 1 / -1;
  font-size: 12.8px;
  opacity: 0.52;
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
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 40px;
  }

  .footer-links {
    flex-direction: column;
  }
}
</style>