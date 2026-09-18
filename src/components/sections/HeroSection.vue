<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'
import BrandMark from '@/components/layout/BrandMark.vue'
import SignalField from '@/components/ui/SignalField.vue'

const { t } = useI18n()

const phrase = computed(() => t('home.hero.phrase'))
/* Se anima palabra a palabra: el índice alimenta el retardo en CSS. */
const words = computed(() => phrase.value.split(' '))
</script>

<template>
  <section class="hero">
    <div class="hero__field" aria-hidden="true">
      <SignalField />
    </div>
    <div class="hero__inner container">
      <div class="hero__logo">
        <span class="hero__mark"><BrandMark animated /></span>
        <p class="hero__wordmark">{{ $t('common.brand') }}</p>
      </div>

      <!-- El texto va troceado en <span>: el aria-label devuelve la frase entera. -->
      <h1 class="hero__phrase" :aria-label="phrase">
        <span
          v-for="(word, index) in words"
          :key="index"
          class="hero__word"
          :style="{ '--word-index': index }"
          aria-hidden="true"
        >{{ word }}</span>
      </h1>

      <a class="hero__scroll" href="#pricing">
        <span class="hero__scroll-label">{{ $t('home.hero.scroll') }}</span>
        <span class="hero__scroll-icon"><AppIcon name="chevron" :size="20" /></span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  /* El header es sticky y ocupa sitio en el flujo: se descuenta su altura. */
  min-height: calc(100svh - var(--header-height));
  display: grid;
  place-items: center;
  padding: var(--space-10) 0 var(--space-9);
  background:
    radial-gradient(90% 60% at 50% 0%, rgba(52, 94, 232, 0.1), transparent 62%),
    radial-gradient(70% 50% at 50% 100%, rgba(6, 169, 216, 0.08), transparent 70%),
    linear-gradient(180deg, var(--color-brand-50) 0%, var(--color-bg) 72%);
}

/*
 * El grafo se desvanece en el centro: ni un nodo ni una línea pueden cruzar
 * por encima del logotipo, sea cual sea la topología que toque al azar.
 */
.hero__field {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(
    54% 60% at 50% 50%,
    transparent 0%,
    transparent 38%,
    #000 88%
  );
  mask-image: radial-gradient(54% 60% at 50% 50%, transparent 0%, transparent 38%, #000 88%);
}

/* Fundido hacia la sección que viene debajo. */
.hero::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 140px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--color-bg) 100%);
  pointer-events: none;
}

.hero__inner {
  display: grid;
  justify-items: center;
  gap: var(--space-6);
  text-align: center;
}

/* ---------- Logotipo ---------- */
.hero__logo {
  display: grid;
  justify-items: center;
  gap: var(--space-4);
  --mark-from: var(--hero-mark-from);
  --mark-to: var(--hero-mark-to);
}

.hero__mark {
  display: block;
  width: clamp(76px, 12vw, 116px);
  height: clamp(76px, 12vw, 116px);
  filter: drop-shadow(0 8px 24px rgba(52, 94, 232, 0.28));
  animation: hero-rise 900ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.hero__wordmark {
  font-size: clamp(2.5rem, 9vw, 5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  letter-spacing: 0.14em;
  /* El degradado azul->cian es el del logotipo original. */
  background: linear-gradient(100deg, var(--hero-mark-from) 0%, var(--hero-mark-to) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  /* El tracking deja un hueco a la derecha: se compensa para centrar ópticamente. */
  margin-left: 0.14em;
  animation: hero-rise 900ms cubic-bezier(0.16, 1, 0.3, 1) 260ms backwards;
}

/* ---------- Frase ---------- */
.hero__phrase {
  max-width: 18ch;
  font-size: clamp(1.5rem, 3.4vw, 2.4rem);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.hero__word {
  display: inline-block;
  margin-right: 0.28em;
  animation: hero-word 720ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: calc(620ms + var(--word-index) * 90ms);
}

/* ---------- Invitación a bajar ---------- */
.hero__scroll {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  margin-top: var(--space-5);
  color: var(--color-text-muted);
  animation: hero-rise 800ms ease 1500ms backwards;
  transition: color var(--transition-base);
}

.hero__scroll:hover { color: var(--color-primary); }

.hero__scroll-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

.hero__scroll-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-circle);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-xs);
  animation: hero-bob 2400ms ease-in-out infinite;
  transition: border-color var(--transition-base), color var(--transition-base);
}

.hero__scroll:hover .hero__scroll-icon { border-color: var(--color-primary); }

@keyframes hero-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes hero-word {
  from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@keyframes hero-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* El movimiento continuo se retira; las entradas ya las neutraliza base.css. */
@media (prefers-reduced-motion: reduce) {
  .hero__scroll-icon { animation: none; }
}

@media (min-width: 768px) {
  .hero__inner { gap: var(--space-7); }
  .hero__phrase { max-width: 24ch; }
}
</style>
