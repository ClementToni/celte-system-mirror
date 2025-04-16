<script setup lang="ts">
interface Props {
  size?: "md" | "lg";
  block?: boolean;
  styleName?: "primary" | "muted" | "accent";
  className?: string;
  [x: string]: any;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  styleName: "primary",
});

const sizes = {
  md: "px-6 py-2",
  lg: "px-8 py-3",
};

const styles = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white transition-colors",
  muted: "text-secondary-700 hover:text-secondary-900 transition-colors",
  accent: "bg-accent-600 hover:bg-accent-700 text-white transition-colors",
};
</script>

<template>
  <button
    :class="[
      'rounded-lg font-medium',
      block && 'w-full',
      sizes[size],
      styles[styleName],
      className,
    ]"
  >
    <slot />
  </button>
</template>
