<template>
    <section ref="container" class="relative h-[250vh] bg-[#0A1929]">
      <div class="sticky top-0 h-screen w-full flex items-center justify-center">
        <div class="flex items-center gap-12 max-w-[1200px] mx-auto">
          <!-- Map Container -->
          <div class="relative w-[600px] h-[600px]">
            <!-- Chunks of the map -->
            <div
              v-for="(path, i) in mapsPath"
              :key="i"
              :ref="el => zoneRefs[i] = el"
              class="absolute w-[50%] h-[50%] overflow-hidden transition-transform duration-1000"
              :class="getPositionClass(i)"
            >
              <img
                :src="path"
                alt="Map chunk"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Right Column: Text + Progress Bar -->
          <div class="w-[400px] flex flex-col">
            <!-- Text Sections -->
            <div class="text-white relative h-[600px]">
              <!-- Initial Text -->
              <div ref="text1" class="absolute inset-0 opacity-0">
                <h2 class="text-3xl font-bold mb-6 text-cyan-400">Server Meshing Technology</h2>
                <p class="text-lg leading-relaxed mb-4">
                  Traditionally, online games use a single server to manage an entire area.
                </p>
                <p class="text-lg leading-relaxed">
                  This approach limits the game's capacity and performance.
                </p>
              </div>

              <!-- Middle Text -->
              <div ref="text2" class="absolute inset-0 opacity-0">
                <h2 class="text-3xl font-bold mb-6 text-cyan-400">Dynamic Division</h2>
                <p class="text-lg leading-relaxed mb-4">
                  With server meshing, the map is divided into distinct, dynamically-managed zones.
                </p>
                <p class="text-lg leading-relaxed mb-4">
                  Each zone is handled by a dedicated server, improving performance by distributing the load efficiently.
                </p>
                <p class="text-lg leading-relaxed">
                  A replication layer connects all servers in real-time, keeping the entire world seamlessly synchronized.
                </p>
              </div>

            </div>

            <!-- Horizontal Progress Bar -->
            <div ref="progressBarContainer" class="w-full -mt-64">
                <div class="h-1.5 w-full rounded-full bg-gray-800">
                    <div ref="progressBar" class="h-1.5 rounded-full bg-cyan-400" style="width: 0%"></div>
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
  const progressBar = ref(null)
  const progressBarContainer = ref(null)

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
        start: "top top",
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
        start: "66% top",
        end: "73% top",
        scrub: 1,
      }
    })

    // Animation de la barre de progression
    gsap.to(progressBar.value, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: container.value,
        start: "top top",
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
        start: '73% top',
        end: '85% top',
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
