<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const SERVICES = [
  { id: 'dedicated', icon: 'server' },
  { id: 'fleet', icon: 'mobile' },
  { id: 'cloudPbx', icon: 'headset' },
  { id: 'security', icon: 'shield' },
]

const STATS = ['clients', 'uptime', 'manager']
const FIELDS = [
  { id: 'company', type: 'text', autocomplete: 'organization' },
  { id: 'name', type: 'text', autocomplete: 'name' },
  { id: 'email', type: 'email', autocomplete: 'email' },
  { id: 'phone', type: 'tel', autocomplete: 'tel' },
  { id: 'employees', type: 'number', autocomplete: 'off' },
]
</script>

<template>
  <div class="view">
    <section class="page-head">
      <div class="container section-head">
        <p class="eyebrow">{{ $t('company.eyebrow') }}</p>
        <h1>{{ $t('company.title') }}</h1>
        <p class="lead">{{ $t('company.subtitle') }}</p>
        <div class="page-head__actions">
          <BaseButton href="#company-form">{{ $t('company.cta') }}</BaseButton>
          <BaseButton variant="secondary" href="#company-form">
            <AppIcon name="file" :size="18" />
            {{ $t('company.secondaryCta') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2>{{ $t('company.servicesTitle') }}</h2>
        </div>
        <ul class="grid">
          <li v-for="service in SERVICES" :key="service.id" class="card card--hover service">
            <span class="service__icon"><AppIcon :name="service.icon" :size="22" /></span>
            <h3>{{ $t(`company.services.${service.id}.title`) }}</h3>
            <p class="service__text">{{ $t(`company.services.${service.id}.description`) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--inverse">
      <div class="container">
        <div class="section-head">
          <h2>{{ $t('company.statsTitle') }}</h2>
        </div>
        <dl class="stats">
          <div v-for="stat in STATS" :key="stat" class="stats__item">
            <dt class="stats__value">{{ $t(`company.stats.${stat}.value`) }}</dt>
            <dd class="stats__label">{{ $t(`company.stats.${stat}.label`) }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="company-form" class="section section--subtle">
      <div class="container container--narrow">
        <div class="section-head">
          <h2>{{ $t('company.formTitle') }}</h2>
          <p class="lead">{{ $t('company.formSubtitle') }}</p>
        </div>

        <form class="card form" @submit.prevent>
          <div class="form__grid">
            <label v-for="field in FIELDS" :key="field.id" class="field">
              <span class="field__label">{{ $t(`company.form.${field.id}`) }}</span>
              <input class="field__input" :type="field.type" :autocomplete="field.autocomplete" />
            </label>
          </div>

          <label class="field">
            <span class="field__label">{{ $t('company.form.message') }}</span>
            <textarea class="field__input" rows="4" />
          </label>

          <BaseButton type="submit" block>{{ $t('company.form.submit') }}</BaseButton>
          <p class="form__legal">{{ $t('company.form.legal') }}</p>
        </form>
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

.page-head__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  margin-top: var(--space-2);
}

.service { display: grid; gap: var(--space-3); align-content: start; }

.service__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
}

.service__text { font-size: var(--font-size-sm); color: var(--color-text-muted); }

.stats {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0;
  text-align: center;
}

.stats__value {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-300);
}

.stats__label { margin: 0; color: var(--color-text-inverse-muted); }

.form { display: grid; gap: var(--space-4); }

.form__grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.field { display: grid; gap: var(--space-2); }

.field__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.field__input {
  width: 100%;
  padding: var(--padding-input);
  border: var(--border-base);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.field__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.form__legal {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: center;
}
</style>
