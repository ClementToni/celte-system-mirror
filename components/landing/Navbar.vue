<script setup>
const menuitems = [
  {
    title: "Features",
    path: "#",
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const open = ref(false);
const { locale } = useI18n();
</script>

<template>
  <LandingContainer>
    <header class="relative flex justify-center items-center h-20">
      <!-- Logo centré -->
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <a href="/" class="flex items-center">
          <span class="text-3xl font-extrabold text-primary-600">
            Complement
          </span>
          <span class="text-3xl font-extrabold text-primary-600">-</span>
          <span class="text-3xl font-extrabold text-primary-600">
            Fit
          </span>
        </a>
      </div>

      <div class="absolute right-0">
        <LandingButton styleName="primary" size="md">
          {{ $t('test') }}
        </LandingButton>
      </div>
    </header>
  </LandingContainer>
</template>

<style scoped>
</style>
