<template>
  <section class="about">
    <div class="container">
      <h2>About</h2>
      <div class="about-grid">
        <div class="about-card">
          <div class="about-image">
            <img src="/images/about-image-1.png" alt="Projects" />
          </div>
          <div class="about-text">
            <h3>Projects</h3>
            <p>
              Celte aims to democratize server meshing technology and make it accessible to every game studio. Our SDK is compatible with all game engines, and our development team is ready to assist you in integrating it seamlessly into your projects!
            </p>
          </div>
        </div>
        <div class="about-card">
          <div class="about-image">
            <img src="/images/about-image-2.png" alt="Innovation" />
          </div>
          <div class="about-text">
            <h3>Innovation</h3>
            <p>
              At Celte, we empower innovative studios by providing cutting-edge server meshing technology that enhances multiplayer scalability and performance. Forward-thinking game developers need robust, flexible infrastructure to create seamless online experiences. Our solution enables studios to push the boundaries of innovation, reduce server costs, and ensure a smooth, lag-free gaming environment. Whether you're developing MMOs, battle royale, or open-world games, Celte gives you the tools to build the future of multiplayer gaming.
            </p>
          </div>
        </div>
        <div class="about-card">
          <div class="about-image">
            <img src="/images/about-image-3.png" alt="Leading Technology" />
          </div>
          <div class="about-text">
            <h3>Leading Technology Provider</h3>
            <h4>Empowering Game Developers</h4>
            <p>
              Celte leads the industry in providing cutting-edge server meshing technology. Our solutions empower game developers to create immersive and scalable multiplayer experiences, setting new standards for online gaming.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 80px 0;
  background: linear-gradient(180deg, var(--background-color) 0%, var(--white) 100%);
}

.about h2 {
  font-size: 64.8px;
  margin-bottom: 60px;
}

.about-grid {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.about-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.about-card:nth-child(2) {
  direction: rtl;
}

.about-card:nth-child(2) .about-text {
  direction: ltr;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.about-text h3 {
  font-size: 30.5px;
  margin-bottom: 20px;
}

.about-text h4 {
  font-size: 17.2px;
  margin-bottom: 15px;
}

.about-text p {
  font-size: 14.9px;
  line-height: 1.61;
}

@media (max-width: 768px) {
  .about-card {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .about h2 {
    font-size: 40px;
  }
}
</style>