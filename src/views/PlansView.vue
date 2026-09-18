<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { categoryBySlug } from '@/data/plans'
import PricingSection from '@/components/sections/PricingSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()
const FAQ_ITEMS = ['portability', 'commitment', 'install', 'change']
const openFaq = ref(FAQ_ITEMS[0])

const category = computed(() => categoryBySlug(route.params.category))

const title = computed(() => ({ key: category.value ? 'plans.page.title' : 'plans.page.allTitle' }))

function toggleFaq(id) {
  openFaq.value = openFaq.value === id ? null : id
}
</script>

<template>
  <div class="view">
    <section class="page-head">
      <div class="container section-head">
        <p class="eyebrow">{{ $t('plans.page.eyebrow') }}</p>
        <h1>
          {{
            category
              ? $t(title.key, { category: $t(`categories.${category.id}.label`).toLowerCase() })
              : $t(title.key)
          }}
        </h1>
        <p class="lead">
          {{ category ? $t(`categories.${category.id}.description`) : $t('plans.page.subtitle') }}
        </p>
      </div>
    </section>

    <PricingSection :locked-category="category?.id ?? null" :show-heading="false" />

    <section class="section">
      <div class="container container--narrow">
        <div class="section-head">
          <h2>{{ $t('plans.page.faqTitle') }}</h2>
        </div>

        <ul class="faq">
          <li v-for="item in FAQ_ITEMS" :key="item" class="faq__item">
            <h3>
              <button
                class="faq__question"
                type="button"
                :aria-expanded="openFaq === item"
                @click="toggleFaq(item)"
              >
                {{ $t(`plans.page.faq.${item}.question`) }}
                <AppIcon name="chevron" :size="18" class="faq__icon" :class="{ 'is-open': openFaq === item }" />
              </button>
            </h3>
            <p v-show="openFaq === item" class="faq__answer">
              {{ $t(`plans.page.faq.${item}.answer`) }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped>
.page-head {
  padding: var(--space-9) 0 var(--space-7);
  background: linear-gradient(180deg, var(--color-brand-50), var(--color-bg));
}

.page-head .section-head { margin-bottom: 0; }

.faq {
  display: grid;
  gap: var(--space-2);
}

.faq__item {
  padding: var(--space-2) var(--space-4);
  border: var(--border-base);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
}

.faq__item h3 { font-size: inherit; font-weight: inherit; }

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-3) 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  text-align: left;
}

.faq__icon { transition: transform var(--transition-base); }
.faq__icon.is-open { transform: rotate(180deg); }

.faq__answer {
  padding-bottom: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
