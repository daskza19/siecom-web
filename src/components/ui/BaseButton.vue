<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost | inverse
  size: { type: String, default: 'md' }, // sm | md | lg
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  external: { type: Boolean, default: false }, // abre el enlace en otra pestaña
  block: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return props.external
      ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: props.href }
  }
  return { type: props.type }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--padding-button);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  transition: background-color var(--transition-base), color var(--transition-base),
    border-color var(--transition-base), transform var(--transition-fast), box-shadow var(--transition-base);
}

.btn:active { transform: translateY(1px); }

/* Variantes */
.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: var(--shadow-sm);
}
.btn--primary:hover { background-color: var(--color-primary-hover); }

.btn--secondary {
  background-color: var(--color-surface);
  color: var(--color-primary);
  border-color: var(--color-border-strong);
}
.btn--secondary:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-text);
}
.btn--ghost:hover { background-color: var(--color-neutral-100); }

.btn--inverse {
  background-color: var(--color-neutral-0);
  color: var(--color-brand-800);
}
.btn--inverse:hover { background-color: var(--color-brand-50); }

/* Tamaños */
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
}
.btn--lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-lg);
}

.btn--block { width: 100%; }
</style>
