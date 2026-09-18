<script setup>
import { computed } from 'vue'
import { ANNUAL_DISCOUNT } from '@/data/plans'
import { usePrice } from '@/composables/usePrice'
import AppIcon from './AppIcon.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  plan: { type: Object, required: true },
  billing: { type: String, default: 'monthly' }, // monthly | annual
})

const { formatPrice, applyDiscount } = usePrice()

const effectivePrice = computed(() =>
  props.billing === 'annual' ? applyDiscount(props.plan.price, ANNUAL_DISCOUNT) : props.plan.price,
)

const showsDiscount = computed(() => props.billing === 'annual')
</script>

<template>
  <article class="plan card card--hover" :class="{ 'plan--highlighted': plan.highlighted }">
    <span v-if="plan.highlighted" class="badge badge--accent plan__badge">
      <AppIcon name="spark" :size="14" />
      {{ $t('home.pricing.popular') }}
    </span>

    <header class="plan__head">
      <h3 class="plan__name">{{ $t(`plans.items.${plan.id}.name`) }}</h3>
      <p class="plan__tagline">{{ $t(`plans.items.${plan.id}.tagline`) }}</p>
    </header>

    <p class="plan__price">
      <del v-if="showsDiscount" class="plan__price-old">
        {{ formatPrice(plan.price) }}{{ $t('common.currency') }}
      </del>
      <span class="plan__price-value">
        {{ formatPrice(effectivePrice) }}<span class="plan__currency">{{ $t('common.currency') }}</span>
      </span>
      <span class="plan__period">{{ $t('common.perMonth') }}</span>
    </p>
    <p class="plan__vat">{{ $t('common.vatIncluded') }}</p>

    <p class="plan__includes">{{ $t('home.pricing.includes') }}</p>
    <ul class="plan__features">
      <li v-for="feature in plan.features" :key="feature.key" class="plan__feature">
        <AppIcon name="check" :size="18" class="plan__check" />
        <span>{{ $t(`plans.features.${feature.key}`, feature.params || {}) }}</span>
      </li>
    </ul>

    <BaseButton
      class="plan__cta"
      :variant="plan.highlighted ? 'primary' : 'secondary'"
      block
      :to="{ name: 'clientAccess' }"
    >
      {{ $t('home.pricing.cta') }}
    </BaseButton>

    <p class="plan__note">
      <AppIcon name="shield" :size="14" />
      {{ $t('home.pricing.noCommitment') }} · {{ $t('home.pricing.setupFee') }}
    </p>
  </article>
</template>

<style scoped>
.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.plan--highlighted {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.plan__badge {
  position: absolute;
  top: calc(var(--space-4) * -1);
  left: var(--padding-card);
}

.plan__name { font-size: var(--font-size-xl); }

.plan__tagline {
  margin-top: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-snug);
}

.plan__price {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.plan__price-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1;
}

.plan__currency {
  font-size: var(--font-size-xl);
  margin-left: 2px;
}

.plan__price-old {
  order: -1;
  width: 100%;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.plan__period {
  font-size: var(--font-size-md);
  color: var(--color-text-muted);
}

.plan__vat {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.plan__includes {
  margin-top: var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.plan__features {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.plan__feature {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-snug);
}

.plan__check {
  margin-top: 2px;
  color: var(--color-accent);
}

.plan__cta { margin-top: auto; }

.plan__note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
