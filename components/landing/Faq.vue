<template>

    <div class="bg-white py-16">
        <div class=" mx-auto px-4">
            <h1 class="text-4xl font-bold text-primary-500 mb-12 text-center">FAQ</h1>

            <div class="max-w-7xl mx-auto space-y-4">
                <!-- Question 1 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(1)">
                        <span class="text-lg font-medium">Qu'est-ce que ComplementFit ?</span>
                        <svg :class="{'rotate-180': openQuestion === 1}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 1" class="pb-4">
                        <p class="text-gray-600">
                            ComplementFit est une plateforme de recommandation de compléments alimentaires pour sportifs, qui vous aide à choisir les meilleurs produits en fonction de vos objectifs et de votre profil.
                        </p>
                    </div>
                </div>

                <!-- Question 2 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(2)">
                        <span class="text-lg font-medium">ComplémentFit vend-il directement des compléments alimentaires ?</span>
                        <svg :class="{'rotate-180': openQuestion === 2}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 2" class="pb-4">
                        <p class="text-gray-600">
                            Non, nous ne vendons pas de compléments directement. Nous vous recommandons les meilleurs produits disponibles auprès de plus de 50 marques et vous permettons de commander sur Amazon.
                        </p>
                    </div>
                </div>

                <!-- Question 3 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(3)">
                        <span class="text-lg font-medium">ComplementFit est-il gratuit ?</span>
                        <svg :class="{'rotate-180': openQuestion === 3}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 3" class="pb-4">
                        <p class="text-gray-600">
                            L’accès aux recommandations de base est gratuit ! ComplementFit recevra une simple commission pour chaque commande passée sur Amazon via notre site.
                        </p>
                    </div>
                </div>

                <!-- Question 4 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(4)">
                        <span class="text-lg font-medium">Comment sont générées les recommandations ?</span>
                        <svg :class="{'rotate-180': openQuestion === 4}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 4" class="pb-4">
                        <p class="text-gray-600">
                            Nos recommandations sont basées sur les dernières études scientifiques et une analyse personnalisée de vos besoins (objectif sportif, régime alimentaire, préférences) et une sélection des meilleurs compléments disponibles sur le marché.
                        </p>
                    </div>
                </div>

                <!-- Question 5 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(5)">
                        <span class="text-lg font-medium">Puis-je comparer plusieurs produits avant d’acheter ?</span>
                        <svg :class="{'rotate-180': openQuestion === 5}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 5" class="pb-4">
                        <p class="text-gray-600">
                            Oui, nous affichons plusieurs options adaptées à votre profil, avec des fiches détaillées pour vous aider à comparer.
                        </p>
                    </div>
                </div>

                <!-- Question 6 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(6)">
                        <span class="text-lg font-medium">Où puis-je acheter les compléments recommandés ?</span>
                        <svg :class="{'rotate-180': openQuestion === 6}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 6" class="pb-4">
                        <p class="text-gray-600">
                            Nos recommandations sont directement commandables sur Amazon via un panier pré-rempli.
                        </p>
                    </div>
                </div>

                <!-- Question 7 -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(7)">
                        <span class="text-lg font-medium">Puis-je modifier ma sélection avant d’acheter sur Amazon ?</span>
                        <svg :class="{'rotate-180': openQuestion === 7}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-show="openQuestion === 7" class="pb-4">
                        <p class="text-gray-600">
                            Bien sûr ! Vous pouvez ajuster votre panier avant la finalisation de l’achat sur Amazon.
                        </p>
                    </div>
                </div>
                <!-- Que faire si un produit ne me convient pas ? -->
                <div class="border-b border-gray-200">
                    <button class="w-full py-4 flex justify-between items-center text-left" @click="toggleQuestion(8)">
                        <span class="text-lg font-medium">Que faire si un produit ne me convient pas ?</span>
                        <svg :class="{'rotate-180': openQuestion === 8}" class="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                <div v-show="openQuestion === 8" class="pb-4">
                    <p class="text-gray-600">
                        Nous vous recommandons de consulter la politique de retour du site marchand (Amazon) où vous avez acheté le produit.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const openQuestion = ref(null)

const toggleQuestion = (questionId) => {
    openQuestion.value = openQuestion.value === questionId ? null : questionId
}
</script>