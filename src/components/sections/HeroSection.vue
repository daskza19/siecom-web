<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const STATS = ['coverage', 'clients', 'support']
</script>

<template>
  <section class="hero">
    <div class="hero__glow" aria-hidden="true" />
    <div class="container hero__inner">
      <div class="hero__content">
        <span class="badge">
          <AppIcon name="spark" :size="14" />
          {{ $t('home.hero.eyebrow') }}
        </span>

        <h1 class="hero__title">
          {{ $t('home.hero.title') }}
          <span class="hero__accent">{{ $t('home.hero.titleAccent') }}</span>
        </h1>

        <p class="hero__subtitle">{{ $t('home.hero.subtitle') }}</p>

        <div class="hero__actions">
          <BaseButton size="lg" href="#pricing">
            {{ $t('home.hero.ctaPrimary') }}
            <AppIcon name="arrow" :size="18" />
          </BaseButton>
          <BaseButton size="lg" variant="secondary" :to="{ name: 'company' }">
            {{ $t('home.hero.ctaSecondary') }}
          </BaseButton>
        </div>

        <p class="hero__note">{{ $t('home.hero.note') }}</p>

        <dl class="hero__stats">
          <div v-for="stat in STATS" :key="stat" class="hero__stat">
            <dt class="hero__stat-value">{{ $t(`home.hero.stats.${stat}.value`) }}</dt>
            <dd class="hero__stat-label">{{ $t(`home.hero.stats.${stat}.label`) }}</dd>
          </div>
        </dl>
      </div>

      <aside class="hero__card" aria-hidden="true">
        <div class="bundle">
          <p class="bundle__title">{{ $t('home.hero.cardTitle') }}</p>
          <p class="bundle__plan">{{ $t('home.hero.cardPlan') }}</p>
          <p class="bundle__price">
            {{ $t('home.hero.cardPrice') }}<span>{{ $t('common.currency') }}{{ $t('common.perMonth') }}</span>
          </p>
          <ul class="bundle__list">
            <li><AppIcon name="wifi" :size="18" /> {{ $t('plans.features.speed', { speed: '600 Mb' }) }}</li>
            <li><AppIcon name="mobile" :size="18" /> {{ $t('plans.features.data', { amount: '∞' }) }}</li>
            <li><AppIcon name="phone" :size="18" /> {{ $t('plans.features.landlineIncluded') }}</li>
          </ul>
          <p class="bundle__footnote">{{ $t('home.hero.cardFootnote') }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: var(--space-9) 0 var(--space-10);
  background: linear-gradient(180deg, var(--color-brand-50) 0%, var(--color-bg) 70%);
}

.hero__glow {
  position: absolute;
  top: -180px;
  right: -140px;
  width: 520px;
  height: 520px;
  border-radius: var(--radius-circle);
  background: radial-gradient(circle, rgba(52, 216, 176, 0.35), transparent 65%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  /* minmax(0, …) evita que las pistas `auto` crezcan con el contenido y desborden. */
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-8);
  align-items: center;
}

.hero__content { display: grid; gap: var(--space-4); justify-items: start; }

.hero__title { max-width: 14ch; }

.hero__accent {
  display: block;
  color: var(--color-primary);
}

.hero__subtitle {
  max-width: 52ch;
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero__note {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  width: 100%;
  margin: var(--space-5) 0 0;
  padding-top: var(--space-5);
  border-top: var(--border-base);
}

.hero__stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.hero__stat-label {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-snug);
}

/* ---------- Tarjeta flotante ---------- */
.hero__card { display: flex; justify-content: center; }

.bundle {
  width: min(100%, 380px);
  padding: var(--padding-card);
  border-radius: var(--radius-xl);
  background: linear-gradient(160deg, var(--color-brand-700), var(--color-brand-900));
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-lg);
}

.bundle__title {
  font-size: var(--font-size-sm);
  color: var(--color-accent-300);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.bundle__plan {
  margin-top: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.bundle__price {
  margin: var(--space-4) 0;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.bundle__price span {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse-muted);
}

.bundle__list {
  display: grid;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.bundle__list li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
}

.bundle__footnote {
  margin-top: var(--space-5);
  font-size: var(--font-size-xs);
  color: var(--color-text-inverse-muted);
}

@media (min-width: 900px) {
  .hero__inner { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); }
  .hero__stats { max-width: 560px; }
}
</style>
