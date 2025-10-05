  <template>
    <section ref="container" class="relative h-[450vh] sm:h-[450vh] bg-[#0A1929]">
      <div class="sticky top-0 h-screen w-full flex items-center justify-center px-4">
        <!-- Container for first two videos (side by side layout) -->
        <div ref="sideBySideContainer" class="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 max-w-[1200px] mx-auto opacity-100 w-full">
          <!-- Left Column: Video Container -->
          <div class="relative w-full sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex-shrink-0">
            <!-- First video - Server Sharding -->
            <div ref="video1" class="absolute inset-0 opacity-0 rounded-xl sm:rounded-2xl overflow-hidden">
              <video src="../public/videos/server-sharding.mov" class="w-full h-full object-contain" autoplay muted loop playsinline>
                <source src="../public/videos/server-sharding.mov" type="video/mov">
              </video>
            </div>

            <!-- Second video - Server Partitioning -->
            <div ref="video2" class="absolute inset-0 opacity-0 rounded-xl sm:rounded-2xl overflow-hidden">
              <video src="../public/videos/server-partitioning.mov" class="w-full h-full object-contain" autoplay muted loop playsinline>
                <source src="../public/videos/server-partitioning.mov" type="video/mov">
              </video>
            </div>
          </div>

          <!-- Right Column: Text + Progress Bar -->
          <div class="w-full lg:w-[400px] flex flex-col">
            <!-- Text Sections -->
            <div class="text-white relative h-[300px] sm:h-[400px] lg:h-[600px]">
              <!-- Initial Text -->
              <div ref="text1" class="absolute inset-0 opacity-0">
                <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-cyan-400">Server Meshing Technology</h2>
                <p class="text-sm sm:text-base lg:text-lg leading-relaxed mb-2 sm:mb-3 lg:mb-4">
                  Traditionally, online games use a single server to manage an entire area.
                </p>
                <p class="text-sm sm:text-base lg:text-lg leading-relaxed">
                  This approach limits the game's capacity and performance.
                </p>
              </div>

              <!-- Middle Text -->
              <div ref="text2" class="absolute inset-0 opacity-0">
                <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-cyan-400">Dynamic Division</h2>
                <p class="text-sm sm:text-base lg:text-lg leading-relaxed mb-2 sm:mb-3 lg:mb-4">
                  Current solution forces you to create multiple servers for each zone, and manage them manually.
                </p>
                <!-- <p class="text-lg leading-relaxed mb-4">
                  Each zone is handled by a dedicated server, improving performance by distributing the load efficiently.
                </p>
                <p class="text-lg leading-relaxed">
                  A replication layer connects all servers in real-time, keeping the entire world seamlessly synchronized.
                </p> -->
              </div>
            </div>

            <!-- Horizontal Progress Bar -->
            <div ref="progressBarContainer" class="w-full -mt-32 sm:-mt-48 lg:-mt-64">
                <div class="h-1 sm:h-1.5 w-full rounded-full bg-gray-800">
                    <div ref="progressBar" class="h-1 sm:h-1.5 rounded-full bg-cyan-400" style="width: 0%"></div>
                </div>
            </div>
          </div>
        </div>

        <!-- Container for third video (side-by-side layout with larger video) -->
        <div ref="centeredContainer" class="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 max-w-[1400px] mx-auto opacity-0 px-4 sm:px-6 lg:px-8">
          <!-- Left: Third video - Dynamic Server Meshing (Larger) -->
          <div class="relative w-full sm:w-[500px] md:w-[600px] lg:w-[800px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] flex-shrink-0">
            <div ref="video3" class="w-full h-full opacity-0 rounded-xl sm:rounded-2xl overflow-hidden">
              <video src="../public/videos/dynamic-server-meshing.mp4" class="w-full h-full object-contain" autoplay muted loop playsinline>
                <source src="../public/videos/dynamic-server-meshing.mp4" type="video/mp4">
              </video>
            </div>
          </div>

          <!-- Right: Third Text - The Celte Advantage -->
          <div ref="text3" class="text-white w-full lg:w-[500px] flex flex-col opacity-0">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 text-cyan-400">The Celte Advantage</h2>
            <p class="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5 lg:mb-6">
              Our proprietary server meshing automatically scales infrastructure in real-time based on player density and activity.
            </p>
            <p class="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 lg:mb-8">
              <strong class="text-white text-lg sm:text-xl lg:text-2xl">Result:</strong> 10,000+ concurrent players in a single, seamless world with 40% lower costs than traditional architecture.
            </p>
            <div class="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base lg:text-lg">
              <div ref="checkmark1" class="flex items-center gap-2 sm:gap-3 opacity-0">
                <span class="text-xl sm:text-2xl text-cyan-400">✓</span>
                <span>Zero loading time between zones</span>
              </div>
              <div ref="checkmark2" class="flex items-center gap-2 sm:gap-3 opacity-0">
                <span class="text-xl sm:text-2xl text-cyan-400">✓</span>
                <span>Automatic load balancing</span>
              </div>
              <div ref="checkmark3" class="flex items-center gap-2 sm:gap-3 opacity-0">
                <span class="text-xl sm:text-2xl text-cyan-400">✓</span>
                <span>Pay only for active servers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  const container = ref(null)
  const zoneRefs = ref([])
  const text1 = ref(null)
  const text2 = ref(null)
  const text3 = ref(null)
  const progressBar = ref(null)
  const progressBarContainer = ref(null)
  const video1 = ref(null)
  const video2 = ref(null)
  const video3 = ref(null)
  const sideBySideContainer = ref(null)
  const centeredContainer = ref(null)
  const checkmark1 = ref(null)
  const checkmark2 = ref(null)
  const checkmark3 = ref(null)

  const mapsPath = {
    0: '/maps/map-left-up.svg',
    1: '/maps/map-right-up.svg',
    2: '/maps/map-left-down.svg',
    3: '/maps/map-right-down.svg',
  }

  // Réduire les valeurs de déplacement
  const movements = [
    { x: -50, y: -50 }, // top-left
    { x: 50, y: -50 },  // top-right
    { x: -50, y: 50 },  // bottom-left
    { x: 50, y: 50 },   // bottom-right
  ]

  // Tailwind classes to position each quadrant
  const getPositionClass = (i) => {
    return [
      'top-0 left-0',
      'top-0 right-0',
      'bottom-0 left-0',
      'bottom-0 right-0',
    ][i]
  }

  // Shift the image inside to simulate slicing the full image
  const getImagePositionClass = (i) => {
    return [
      'object-left-top',
      'object-right-top',
      'object-left-bottom',
      'object-right-bottom',
    ][i]
  }

  onMounted(() => {
    // Animation des zones de la carte
    zoneRefs.value.forEach((el, i) => {
      const move = movements[i]
      gsap.to(el, {
        x: move.x,
        y: move.y,
        scrollTrigger: {
          trigger: container.value,
          start: "33% top",
          end: "90% top",
          scrub: 1.5,
        },
        ease: "power1.inOut",
        duration: 2
      })
    })

    // Animation des textes
    // Premier texte
    gsap.to(text1.value, {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: container.value,
        start: "top 80%",
        end: "33% top",
        scrub: 1,
      }
    })

    gsap.to(text1.value, {
      opacity: 0,
      x: 100,
      scrollTrigger: {
        trigger: container.value,
        start: "33% top",
        end: "40% top",
        scrub: 1,
      }
    })

    // Deuxième texte
    gsap.fromTo(text2.value,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: container.value,
          start: "33% top",
          end: "40% top",
          scrub: 1,
        }
      }
    )

    gsap.to(text2.value, {
      opacity: 0,
      x: 100,
      scrollTrigger: {
        trigger: container.value,
        start: "50% top",
        end: "55% top",
        scrub: 1,
      }
    })

    // Video animations - show one video at a time
    // First video - Server Sharding (starts earlier)
    gsap.to(video1.value, {
      opacity: 1,
      scrollTrigger: {
        trigger: container.value,
        start: "top 80%",
        end: "25% top",
        scrub: 1,
      }
    })

    gsap.to(video1.value, {
      opacity: 0,
      scrollTrigger: {
        trigger: container.value,
        start: "25% top",
        end: "30% top",
        scrub: 1,
      }
    })

    // Second video - Server Partitioning (25% to 50%)
    gsap.fromTo(video2.value,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: container.value,
          start: "25% top",
          end: "30% top",
          scrub: 1,
        }
      }
    )

    gsap.to(video2.value, {
      opacity: 0,
      scrollTrigger: {
        trigger: container.value,
        start: "50% top",
        end: "55% top",
        scrub: 1,
      }
    })

    // Transition: Fade out side-by-side layout
    gsap.to(sideBySideContainer.value, {
      opacity: 0,
      scrollTrigger: {
        trigger: container.value,
        start: "50% top",
        end: "55% top",
        scrub: 1,
      }
    })

    // Transition: Fade in centered layout
    gsap.fromTo(centeredContainer.value,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: container.value,
          start: "55% top",
          end: "60% top",
          scrub: 1,
        }
      }
    )

    // Third video - Dynamic Server Meshing (60% to 90% - longer duration)
    gsap.fromTo(video3.value,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: container.value,
          start: "60% top",
          end: "65% top",
          scrub: 1,
        }
      }
    )

    // Third text - The Celte Advantage (appears at the same time as video)
    gsap.fromTo(text3.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: container.value,
          start: "60% top",
          end: "65% top",
          scrub: 1,
        }
      }
    )

    // Checkmarks appear one by one
    // First checkmark
    gsap.fromTo(checkmark1.value,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: container.value,
          start: "68% top",
          end: "71% top",
          scrub: 1,
        }
      }
    )

    // Second checkmark
    gsap.fromTo(checkmark2.value,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: container.value,
          start: "71% top",
          end: "74% top",
          scrub: 1,
        }
      }
    )

    // Third checkmark
    gsap.fromTo(checkmark3.value,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: container.value,
          start: "74% top",
          end: "77% top",
          scrub: 1,
        }
      }
    )

    // Animation de la barre de progression
    gsap.to(progressBar.value, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: container.value,
        start: "top 80%",
        end: "bottom bottom",
        scrub: true,
      }
    })

    // Disparition de la barre de progression
    gsap.to(progressBarContainer.value, {
      opacity: 0,
      filter: 'blur(8px)',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: container.value,
        start: '50% top',
        end: '55% top',
        scrub: true,
      },
    })
  })
  </script>

  <style scoped>
  /* Add smooth transitions */
  .transition-transform {
    transition: transform 0.3s ease-out;
  }
  </style>
