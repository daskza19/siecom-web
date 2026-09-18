<script setup>
import BrandMark from '@/components/layout/BrandMark.vue'

defineProps({
  inverse: { type: Boolean, default: false },
})
</script>

<template>
  <span class="logo" :class="{ 'logo--inverse': inverse }">
    <span class="logo__mark"><BrandMark /></span>
    <span class="logo__text">{{ $t('common.brand') }}</span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.logo__mark {
  display: block;
  width: 30px;
  height: 30px;
  --mark-from: var(--color-primary);
  --mark-to: var(--color-cyan-500);
}

.logo__text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text);
}

.logo--inverse .logo__mark {
  --mark-from: var(--color-cyan-400);
  --mark-to: var(--color-cyan-200);
}

.logo--inverse .logo__text { color: var(--color-text-inverse); }
</style>
