<script setup>
import BrandLogo from './BrandLogo.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const year = new Date().getFullYear()

const COLUMNS = [
  {
    titleKey: 'footer.productsTitle',
    links: [
      { labelKey: 'categories.mobile.label', to: { name: 'plans', params: { category: 'mobil' } } },
      { labelKey: 'categories.internet.label', to: { name: 'plans', params: { category: 'internet' } } },
      { labelKey: 'categories.landline.label', to: { name: 'plans', params: { category: 'fix' } } },
      { labelKey: 'footer.links.tv' },
    ],
  },
  {
    titleKey: 'footer.companyTitle',
    links: [
      { labelKey: 'nav.company', to: { name: 'company' } },
      { labelKey: 'nav.about', to: { name: 'about' } },
      { labelKey: 'footer.links.work' },
      { labelKey: 'footer.links.press' },
    ],
  },
  {
    titleKey: 'footer.supportTitle',
    links: [
      { labelKey: 'nav.clientAccess', to: { name: 'clientAccess' } },
      { labelKey: 'footer.links.help' },
      { labelKey: 'footer.links.status' },
      { labelKey: 'footer.links.contact' },
    ],
  },
  {
    titleKey: 'footer.legalTitle',
    links: [
      { labelKey: 'footer.links.privacy' },
      { labelKey: 'footer.links.terms' },
      { labelKey: 'footer.links.cookies' },
    ],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <BrandLogo inverse />
        <p class="footer__description">{{ $t('footer.description') }}</p>
        <LanguageSwitcher align="start" />
      </div>

      <div class="footer__columns">
        <div v-for="column in COLUMNS" :key="column.titleKey" class="footer__column">
          <h3 class="footer__title">{{ $t(column.titleKey) }}</h3>
          <ul class="footer__links">
            <li v-for="link in column.links" :key="link.labelKey">
              <RouterLink v-if="link.to" :to="link.to" class="footer__link">
                {{ $t(link.labelKey) }}
              </RouterLink>
              <span v-else class="footer__link">{{ $t(link.labelKey) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>{{ $t('footer.rights', { year }) }}</p>
      <p>{{ $t('footer.madeIn') }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: var(--space-9);
  background-color: var(--color-bg-inverse);
  color: var(--color-text-inverse);
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-8);
  padding-bottom: var(--space-8);
}

.footer__brand {
  display: grid;
  gap: var(--space-4);
  justify-items: start;
  max-width: 320px;
}

.footer__description {
  color: var(--color-text-inverse-muted);
  font-size: var(--font-size-sm);
}

.footer__columns {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.footer__title {
  margin-bottom: var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-accent-300);
}

.footer__links { display: grid; gap: var(--space-2); }

.footer__link {
  font-size: var(--font-size-sm);
  color: var(--color-text-inverse-muted);
  transition: color var(--transition-base);
}

a.footer__link:hover { color: var(--color-text-inverse); }

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  justify-content: space-between;
  padding-block: var(--space-5);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: var(--font-size-xs);
  color: var(--color-text-inverse-muted);
}

@media (min-width: 900px) {
  .footer__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: var(--space-9);
  }
}
</style>
