<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

/** Píxeles de scroll a partir de los cuales aparece el botón. */
const SHOW_AFTER = 400

const isVisible = ref(false)

function updateVisibility() {
  isVisible.value = window.scrollY > SHOW_AFTER
}

function scrollToTop() {
  // Respeta a quien haya pedido menos movimiento en el sistema.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>

<template>
  <transition name="to-top">
    <button
      v-show="isVisible"
      class="to-top"
      type="button"
      :aria-label="$t('common.backToTop')"
      :title="$t('common.backToTop')"
      @click="scrollToTop"
    >
      <AppIcon name="arrowUp" :size="20" />
    </button>
  </transition>
</template>

<style scoped>
.to-top {
  position: fixed;
  right: var(--space-4);
  bottom: var(--space-4);
  z-index: var(--z-dropdown);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: var(--border-base);
  border-radius: var(--radius-circle);
  background-color: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-base), color var(--transition-base),
    border-color var(--transition-base), transform var(--transition-fast);
}

.to-top:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.to-top:active { transform: translateY(1px); }

.to-top-enter-active,
.to-top-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.to-top-enter-from,
.to-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (min-width: 768px) {
  .to-top {
    right: var(--space-6);
    bottom: var(--space-6);
    width: 48px;
    height: 48px;
  }
}
</style>
