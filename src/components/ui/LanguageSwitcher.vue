<script setup>
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, setLocale } from '@/i18n'
import { useDropdown } from '@/composables/useDropdown'
import AppIcon from './AppIcon.vue'

defineProps({
  align: { type: String, default: 'end' }, // start | end
})

const { locale, t } = useI18n()
const { isOpen, rootEl, triggerEl, close, toggle } = useDropdown()

function pick(code) {
  setLocale(code)
  close({ restoreFocus: true })
}
</script>

<template>
  <div ref="rootEl" class="lang">
    <button
      ref="triggerEl"
      class="lang__trigger"
      type="button"
      :aria-label="$t('nav.selectLanguage')"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <AppIcon name="globe" :size="18" />
      <span class="lang__code">{{ $t('meta.shortName') }}</span>
      <AppIcon name="chevron" :size="16" class="lang__caret" :class="{ 'is-open': isOpen }" />
    </button>

    <ul
      v-show="isOpen"
      class="lang__list"
      :class="`lang__list--${align}`"
      role="listbox"
      :aria-label="t('nav.language')"
    >
      <li v-for="option in SUPPORTED_LOCALES" :key="option.code">
        <button
          class="lang__option"
          type="button"
          role="option"
          :aria-selected="locale === option.code"
          @click="pick(option.code)"
        >
          <span>{{ option.name }}</span>
          <AppIcon v-if="locale === option.code" name="check" :size="16" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
}

.lang__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: var(--border-base);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  background-color: var(--color-surface);
  transition: border-color var(--transition-base), background-color var(--transition-base);
}

.lang__trigger:hover {
  border-color: var(--color-border-strong);
  background-color: var(--color-bg-subtle);
}

.lang__code {
  font-weight: var(--font-weight-semibold);
}

.lang__caret {
  transition: transform var(--transition-base);
}
.lang__caret.is-open { transform: rotate(180deg); }

.lang__list {
  position: absolute;
  top: calc(100% + var(--space-2));
  z-index: var(--z-dropdown);
  min-width: 180px;
  padding: var(--space-2);
  background-color: var(--color-surface-raised);
  border: var(--border-base);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.lang__list--end { right: 0; }
.lang__list--start { left: 0; }

.lang__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  text-align: left;
}

.lang__option:hover { background-color: var(--color-bg-subtle); }
.lang__option[aria-selected='true'] {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}
</style>
