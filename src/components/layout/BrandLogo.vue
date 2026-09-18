<script setup>
defineProps({
  inverse: { type: Boolean, default: false },
})
</script>

<template>
  <span class="logo" :class="{ 'logo--inverse': inverse }">
    <span class="logo__mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.12" />
        <path
          d="M9 20.5c3-4.2 5.2-6.4 9.4-9.4"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <circle cx="21.5" cy="10.5" r="2.6" fill="currentColor" />
        <circle cx="10.5" cy="21.5" r="2.6" fill="currentColor" />
      </svg>
    </span>
    <span class="logo__text">{{ $t('common.brand') }}</span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
}

.logo__mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
}

.logo__text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.logo--inverse .logo { color: var(--color-accent-400); }
.logo--inverse .logo__text { color: var(--color-text-inverse); }
.logo--inverse { color: var(--color-accent-400); }
</style>
