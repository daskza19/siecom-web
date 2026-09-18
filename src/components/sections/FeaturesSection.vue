<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

const FEATURES = [
  { id: 'price', icon: 'shield' },
  { id: 'support', icon: 'headset' },
  { id: 'network', icon: 'wifi' },
  { id: 'flexible', icon: 'sliders' },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">{{ $t('home.features.eyebrow') }}</p>
        <h2>{{ $t('home.features.title') }}</h2>
        <p class="lead">{{ $t('home.features.subtitle') }}</p>
      </div>

      <ul class="grid">
        <li v-for="feature in FEATURES" :key="feature.id" class="card card--hover feature">
          <span class="feature__icon">
            <AppIcon :name="feature.icon" :size="22" />
          </span>
          <h3 class="feature__title">{{ $t(`home.features.items.${feature.id}.title`) }}</h3>
          <p class="feature__text">{{ $t(`home.features.items.${feature.id}.description`) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.feature {
  display: grid;
  gap: var(--space-3);
  align-content: start;
}

.feature__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
}

.feature__title { font-size: var(--font-size-lg); }

.feature__text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
