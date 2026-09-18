<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const VALUES = [
  { id: 'transparency', icon: 'shield' },
  { id: 'proximity', icon: 'heart' },
  { id: 'commitment', icon: 'chart' },
]

const TIMELINE = ['y2009', 'y2014', 'y2019', 'y2024']
</script>

<template>
  <div class="view">
    <section class="page-head">
      <div class="container section-head">
        <p class="eyebrow">{{ $t('about.eyebrow') }}</p>
        <h1>{{ $t('about.title') }}</h1>
        <p class="lead">{{ $t('about.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow stack stack--lg">
        <h2>{{ $t('about.storyTitle') }}</h2>
        <p class="lead">{{ $t('about.story') }}</p>
      </div>
    </section>

    <section class="section section--subtle">
      <div class="container">
        <div class="section-head">
          <h2>{{ $t('about.valuesTitle') }}</h2>
        </div>
        <ul class="grid">
          <li v-for="value in VALUES" :key="value.id" class="card card--hover value">
            <span class="value__icon"><AppIcon :name="value.icon" :size="22" /></span>
            <h3>{{ $t(`about.values.${value.id}.title`) }}</h3>
            <p class="value__text">{{ $t(`about.values.${value.id}.description`) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <div class="section-head">
          <h2>{{ $t('about.timelineTitle') }}</h2>
        </div>
        <ol class="timeline">
          <li v-for="milestone in TIMELINE" :key="milestone" class="timeline__item">
            <span class="timeline__year">{{ $t(`about.timeline.${milestone}.year`) }}</span>
            <div>
              <h3 class="timeline__title">{{ $t(`about.timeline.${milestone}.title`) }}</h3>
              <p class="timeline__text">{{ $t(`about.timeline.${milestone}.description`) }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--inverse">
      <div class="container section-head">
        <h2>{{ $t('about.teamTitle') }}</h2>
        <p class="lead">{{ $t('about.teamSubtitle') }}</p>
        <div class="team__cta">
          <BaseButton variant="inverse" :to="{ name: 'company' }">{{ $t('about.cta') }}</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head {
  padding: var(--space-9) 0 var(--space-7);
  background: linear-gradient(180deg, var(--color-brand-50), var(--color-bg));
}

.page-head .section-head { margin-bottom: 0; }

.value { display: grid; gap: var(--space-3); align-content: start; }

.value__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  background-color: var(--color-accent-soft);
  color: var(--color-accent-600);
}

.value__text { font-size: var(--font-size-sm); color: var(--color-text-muted); }

.timeline {
  display: grid;
  gap: var(--space-5);
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-border);
}

.timeline__item {
  display: grid;
  gap: var(--space-2);
  position: relative;
  padding-left: var(--space-5);
}

.timeline__item::before {
  content: '';
  position: absolute;
  left: calc(var(--space-4) * -1 - 5px);
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: var(--radius-circle);
  background-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-soft);
}

.timeline__year {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-primary);
}

.timeline__title { font-size: var(--font-size-lg); }

.timeline__text {
  margin-top: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.team__cta { display: flex; justify-content: center; margin-top: var(--space-2); }
</style>
