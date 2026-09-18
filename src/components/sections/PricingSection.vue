<script setup>
import { computed, ref, watch } from 'vue'
import { ANNUAL_DISCOUNT, CATEGORIES, PLANS } from '@/data/plans'
import AppIcon from '@/components/ui/AppIcon.vue'
import PriceCard from '@/components/ui/PriceCard.vue'

const props = defineProps({
  // Si se fija una categoría el selector desaparece (páginas de plan concreto).
  lockedCategory: { type: String, default: null },
  showHeading: { type: Boolean, default: true },
})

const activeCategory = ref(props.lockedCategory ?? CATEGORIES[0].id)
const billing = ref('monthly')

watch(
  () => props.lockedCategory,
  (value) => {
    if (value) activeCategory.value = value
  },
)

const visiblePlans = computed(() => PLANS.filter((plan) => plan.category === activeCategory.value))
</script>

<template>
  <section id="pricing" class="section section--subtle">
    <div class="container">
      <div v-if="showHeading" class="section-head">
        <p class="eyebrow">{{ $t('home.pricing.eyebrow') }}</p>
        <h2>{{ $t('home.pricing.title') }}</h2>
        <p class="lead">{{ $t('home.pricing.subtitle') }}</p>
      </div>

      <div class="pricing__controls">
        <div
          v-if="!lockedCategory"
          class="tabs"
          role="tablist"
          :aria-label="$t('nav.plans')"
        >
          <button
            v-for="category in CATEGORIES"
            :key="category.id"
            class="tabs__tab"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category.id"
            :class="{ 'is-active': activeCategory === category.id }"
            @click="activeCategory = category.id"
          >
            <AppIcon :name="category.icon" :size="18" />
            {{ $t(`categories.${category.id}.short`) }}
          </button>
        </div>

        <div class="switch">
          <button
            class="switch__option"
            type="button"
            :class="{ 'is-active': billing === 'monthly' }"
            :aria-pressed="billing === 'monthly'"
            @click="billing = 'monthly'"
          >
            {{ $t('home.pricing.billingMonthly') }}
          </button>
          <button
            class="switch__option"
            type="button"
            :class="{ 'is-active': billing === 'annual' }"
            :aria-pressed="billing === 'annual'"
            @click="billing = 'annual'"
          >
            {{ $t('home.pricing.billingAnnual') }}
            <span class="switch__saving">{{ $t('home.pricing.billingSaving', { percent: ANNUAL_DISCOUNT }) }}</span>
          </button>
        </div>
      </div>

      <div class="grid pricing__grid">
        <PriceCard v-for="plan in visiblePlans" :key="plan.id" :plan="plan" :billing="billing" />
      </div>

      <p class="pricing__helper">
        {{ $t('home.pricing.helper', { vat: $t('common.vatIncluded') }) }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.pricing__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.tabs,
.switch {
  display: inline-flex;
  gap: var(--space-1);
  padding: var(--space-1);
  background-color: var(--color-surface);
  border: var(--border-base);
  border-radius: var(--radius-pill);
}

.tabs { flex-wrap: wrap; justify-content: center; }

.tabs__tab,
.switch__option {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  transition: background-color var(--transition-base), color var(--transition-base);
}

.tabs__tab:hover,
.switch__option:hover { color: var(--color-text); }

.tabs__tab.is-active,
.switch__option.is-active {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.switch__saving {
  padding: 2px var(--space-2);
  border-radius: var(--radius-pill);
  background-color: var(--color-accent-soft);
  color: var(--color-accent-600);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.pricing__grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: stretch;
}

.pricing__helper {
  margin-top: var(--space-6);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

@media (max-width: 560px) {
  .switch { width: 100%; justify-content: center; }
  .switch__option { flex: 1; justify-content: center; }
  .switch__saving { display: none; }
}
</style>
