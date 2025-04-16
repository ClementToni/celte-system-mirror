<template>
  <!-- Section Héros avec couleur primaire -->
  <section class="bg-primary-500 text-white py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-4">Titre Principal</h1>
      <p class="text-primary-100">Sous-titre avec une teinte plus claire</p>
    </div>
  </section>

  <!-- Carte avec dégradés de couleurs secondaires -->
  <div class="max-w-sm mx-auto mt-8 rounded-lg overflow-hidden shadow-lg">
    <div class="bg-secondary-100 p-6">
      <h2 class="text-secondary-900 text-xl font-semibold mb-2">Titre de la carte</h2>
      <p class="text-secondary-700">Description avec une teinte plus foncée du gris</p>
      <div class="mt-4 space-y-2">
        <button class="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded transition-colors">
          Bouton Principal
        </button>
        <button class="w-full border border-secondary-300 hover:bg-secondary-200 text-secondary-800 py-2 px-4 rounded transition-colors">
          Bouton Secondaire
        </button>
      </div>
    </div>
  </div>

  <!-- Alert avec couleur d'accent -->
  <div class="bg-accent-100 border-l-4 border-accent-500 p-4 mt-8 mx-auto max-w-sm">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-accent-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-accent-700 text-sm">Message de succès avec couleur d'accent</p>
      </div>
    </div>
  </div>

  <!-- Navigation avec dégradés -->
  <nav class="bg-secondary-800 mt-8">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="text-primary-300 font-bold">Logo</div>
        <div class="flex space-x-4">
          <a href="#" class="text-secondary-100 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
            Accueil
          </a>
          <a href="#" class="text-secondary-100 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
            Services
          </a>
          <a href="#" class="text-secondary-100 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium">
            Contact
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Tags avec différentes couleurs -->
  <div class="flex gap-2 mt-8 justify-center">
    <span class="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">Tag Primary</span>
    <span class="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">Tag Secondary</span>
    <span class="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded">Tag Accent</span>
  </div>
</template>