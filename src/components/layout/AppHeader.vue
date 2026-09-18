<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CATEGORIES } from '@/data/plans'
import { CLIENT_AREA_URL } from '@/data/site'
import { useDropdown } from '@/composables/useDropdown'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import BrandLogo from '@/components/layout/BrandLogo.vue'

const route = useRoute()
const {
  isOpen: isPlansOpen,
  rootEl: plansRootEl,
  triggerEl: plansTriggerEl,
  close: closePlans,
  toggle: togglePlans,
} = useDropdown()
const isMobileMenuOpen = ref(false)
const isMobilePlansOpen = ref(false)

const NAV_LINKS = [
  { name: 'company', labelKey: 'nav.company' },
  { name: 'about', labelKey: 'nav.about' },
]

function closeAll() {
  closePlans()
  isMobileMenuOpen.value = false
  isMobilePlansOpen.value = false
}

// Cualquier navegación cierra los menús abiertos.
watch(() => route.fullPath, closeAll)

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <RouterLink :to="{ name: 'home' }" class="header__brand" :aria-label="$t('common.brand')">
        <BrandLogo />
      </RouterLink>

      <nav class="header__nav" :aria-label="$t('nav.mainNavigation')">
        <div ref="plansRootEl" class="dropdown">
          <button
            ref="plansTriggerEl"
            class="nav-link dropdown__trigger"
            type="button"
            :class="{ 'is-active': route.name === 'plans' }"
            :aria-expanded="isPlansOpen"
            aria-haspopup="true"
            @click="togglePlans()"
          >
            {{ $t('nav.plans') }}
            <AppIcon
              name="chevron"
              :size="16"
              class="dropdown__caret"
              :class="{ 'is-open': isPlansOpen }"
            />
          </button>

          <transition name="dropdown">
            <div v-show="isPlansOpen" class="dropdown__panel">
              <p class="dropdown__intro">{{ $t('nav.plansIntro') }}</p>
              <ul class="dropdown__list">
                <li v-for="category in CATEGORIES" :key="category.id">
                  <RouterLink
                    class="dropdown__item"
                    :to="{ name: 'plans', params: { category: category.slug } }"
                  >
                    <span class="dropdown__icon">
                      <AppIcon :name="category.icon" :size="20" />
                    </span>
                    <span>
                      <span class="dropdown__title">{{ $t(`categories.${category.id}.label`) }}</span>
                      <span class="dropdown__desc">{{ $t(`categories.${category.id}.description`) }}</span>
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </transition>
        </div>

        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.name"
          class="nav-link"
          :to="{ name: link.name }"
        >
          {{ $t(link.labelKey) }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <LanguageSwitcher />
        <BaseButton
          :href="CLIENT_AREA_URL"
          external
          variant="secondary"
          size="sm"
          class="header__login"
        >
          <AppIcon name="lock" :size="16" />
          {{ $t('nav.clientAccess') }}
        </BaseButton>

        <button
          class="header__burger"
          type="button"
          :aria-label="isMobileMenuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <AppIcon :name="isMobileMenuOpen ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>

    <!-- Navegación móvil -->
    <transition name="sheet">
      <div v-show="isMobileMenuOpen" class="mobile-nav">
        <nav class="mobile-nav__inner container" :aria-label="$t('nav.mainNavigation')">
          <button
            class="mobile-nav__link mobile-nav__accordion"
            type="button"
            :aria-expanded="isMobilePlansOpen"
            @click="isMobilePlansOpen = !isMobilePlansOpen"
          >
            {{ $t('nav.plans') }}
            <AppIcon
              name="chevron"
              :size="18"
              class="dropdown__caret"
              :class="{ 'is-open': isMobilePlansOpen }"
            />
          </button>

          <ul v-show="isMobilePlansOpen" class="mobile-nav__sublist">
            <li v-for="category in CATEGORIES" :key="category.id">
              <RouterLink
                class="mobile-nav__sublink"
                :to="{ name: 'plans', params: { category: category.slug } }"
              >
                <AppIcon :name="category.icon" :size="18" />
                {{ $t(`categories.${category.id}.label`) }}
              </RouterLink>
            </li>
          </ul>

          <RouterLink
            v-for="link in NAV_LINKS"
            :key="link.name"
            class="mobile-nav__link"
            :to="{ name: link.name }"
          >
            {{ $t(link.labelKey) }}
          </RouterLink>

          <BaseButton :href="CLIENT_AREA_URL" external variant="primary" block class="mobile-nav__cta">
            <AppIcon name="lock" :size="18" />
            {{ $t('nav.clientAccess') }}
          </BaseButton>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background-color: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: var(--border-base);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  min-height: var(--header-height);
}

.header__brand {
  display: flex;
  align-items: center;
  margin-right: auto;
}

/* ---------- Navegación de escritorio ---------- */
.header__nav {
  display: none;
  align-items: center;
  gap: var(--space-2);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  transition: color var(--transition-base), background-color var(--transition-base);
}

.nav-link:hover,
.nav-link.is-active,
.nav-link.router-link-active {
  color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

/* ---------- Desplegable de planes ---------- */
.dropdown { position: relative; }

.dropdown__caret { transition: transform var(--transition-base); }
.dropdown__caret.is-open { transform: rotate(180deg); }

.dropdown__panel {
  position: absolute;
  top: calc(100% + var(--space-3));
  left: 0;
  z-index: var(--z-dropdown);
  width: 340px;
  padding: var(--space-4);
  background-color: var(--color-surface-raised);
  border: var(--border-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.dropdown__intro {
  margin-bottom: var(--space-3);
  padding-inline: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.dropdown__list { display: grid; gap: var(--space-1); }

.dropdown__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base);
}

.dropdown__item:hover { background-color: var(--color-bg-subtle); }

.dropdown__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
}

.dropdown__title {
  display: block;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-md);
}

.dropdown__desc {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-snug);
}

/* ---------- Acciones ---------- */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.header__login { display: none; }

.header__burger {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: var(--border-base);
  border-radius: var(--radius-sm);
  color: var(--color-text);
}

/* ---------- Navegación móvil ---------- */
/* Absoluto respecto al header: el `backdrop-filter` de .header crea bloque
   contenedor y rompería un `position: fixed` aquí dentro. */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100dvh - var(--header-height));
  overflow-y: auto;
  background-color: var(--color-bg);
  border-top: var(--border-base);
}

.mobile-nav__inner {
  display: grid;
  gap: var(--space-1);
  padding-block: var(--space-5);
}

.mobile-nav__link,
.mobile-nav__accordion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-4) var(--space-2);
  border-bottom: var(--border-base);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  text-align: left;
}

.mobile-nav__sublist {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-2) 0 var(--space-3) var(--space-4);
}

.mobile-nav__sublink {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
}

.mobile-nav__sublink:hover,
.mobile-nav__sublink.router-link-active {
  color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.mobile-nav__cta { margin-top: var(--space-5); }

/* ---------- Transiciones ---------- */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.sheet-enter-active,
.sheet-leave-active { transition: opacity var(--transition-base); }
.sheet-enter-from,
.sheet-leave-to { opacity: 0; }

/* ---------- Breakpoint ---------- */
@media (min-width: 900px) {
  .header__nav { display: flex; }
  .header__login { display: inline-flex; }
  .header__burger { display: none; }
  .mobile-nav { display: none !important; }
}
</style>
