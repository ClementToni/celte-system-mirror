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

          <!-- Text Sections -->
          <div class="w-[400px] text-white relative h-[600px]">
            <!-- Initial Text -->
            <div ref="text1" class="absolute inset-0 opacity-0 ml-12">
              <h2 class="text-3xl font-bold mb-6 text-cyan-400">Server Meshing Technology</h2>
              <p class="text-lg leading-relaxed mb-4">
                Traditionally, online games use a single server to manage an entire area.
              </p>
              <p class="text-lg leading-relaxed">
                This approach limits the game's capacity and performance.
              </p>
            </div>

            <!-- Middle Text -->
            <div ref="text2" class="absolute inset-0 opacity-0 ml-12">
              <h2 class="text-3xl font-bold mb-6 text-cyan-400">Dynamic Division</h2>
              <p class="text-lg leading-relaxed mb-4">
                With server meshing, the map is divided into distinct zones.
              </p>
              <p class="text-lg leading-relaxed">
                Each zone is managed by a dedicated server, allowing better load distribution.
              </p>
            </div>

            <!-- Final Text -->
            <!-- <div ref="text3" class="absolute inset-0 opacity-0">
              <h2 class="text-3xl font-bold mb-6 text-cyan-400">Benefits</h2>
              <ul class="text-lg leading-relaxed list-disc list-inside space-y-2">
                <li>Enhanced performance</li>
                <li>Increased player capacity</li>
                <li>Better stability</li>
                <li>Optimized costs</li>
              </ul>
            </div> -->
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

    // Troisième texte
    gsap.fromTo(text3.value,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: container.value,
          start: "66% top",
          end: "73% top",
          scrub: 1,
        }
      }
    )
  })
  </script>

  <style scoped>
  /* Add smooth transitions */
  .transition-transform {
    transition: transform 0.3s ease-out;
  }
  </style>
