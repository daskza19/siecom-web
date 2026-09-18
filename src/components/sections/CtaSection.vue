<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section class="section section--inverse cta">
    <div class="container cta__inner">
      <div class="cta__text">
        <h2>{{ $t('home.cta.title') }}</h2>
        <p class="lead">{{ $t('home.cta.subtitle') }}</p>
      </div>
      <div class="cta__actions">
        <BaseButton variant="inverse" size="lg" :to="{ name: 'plans' }">
          {{ $t('home.cta.primary') }}
          <AppIcon name="arrow" :size="18" />
        </BaseButton>
        <BaseButton variant="ghost" size="lg" class="cta__ghost" :to="{ name: 'company' }">
          {{ $t('home.cta.secondary') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: linear-gradient(140deg, var(--color-brand-800), var(--color-brand-900) 60%, var(--color-accent-600));
}

.cta__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6);
  align-items: center;
}

.cta__text { display: grid; gap: var(--space-3); }

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.cta__ghost {
  color: var(--color-text-inverse);
  border-color: rgba(255, 255, 255, 0.4);
}
.cta__ghost:hover { background-color: rgba(255, 255, 255, 0.12); }

@media (min-width: 900px) {
  .cta__inner { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); }
  .cta__actions { justify-content: flex-end; }
}
</style>
