<script setup>
import { useId } from 'vue'

defineProps({
  /** Dibuja los arcos al entrar y deja un latido continuo de emisión. */
  animated: { type: Boolean, default: false },
})

/* Dos <linearGradient> con el mismo id colisionan: cada instancia necesita el suyo. */
const gradientId = `brand-mark-${useId()}`
</script>

<template>
  <svg
    class="mark"
    :class="{ 'mark--animated': animated }"
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient :id="gradientId" x1="10" y1="52" x2="50" y2="12" gradientUnits="userSpaceOnUse">
        <stop class="mark__stop mark__stop--from" offset="0" />
        <stop class="mark__stop mark__stop--to" offset="1" />
      </linearGradient>
    </defs>

    <!-- Emisor y tres ondas: es el símbolo del logotipo de SIECOM. -->
    <g :stroke="`url(#${gradientId})`" stroke-width="5" stroke-linecap="round">
      <path class="mark__arc mark__arc--1" d="M14 36A14 14 0 0 1 28 50" />
      <path class="mark__arc mark__arc--2" d="M14 26A24 24 0 0 1 38 50" />
      <path class="mark__arc mark__arc--3" d="M14 16A34 34 0 0 1 48 50" />
    </g>
    <circle class="mark__dot" cx="14" cy="50" r="5.5" :fill="`url(#${gradientId})`" />
  </svg>
</template>

<style scoped>
.mark {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* stop-color no acepta var() como atributo, sí como propiedad CSS. */
.mark__stop--from { stop-color: var(--mark-from, var(--color-primary)); }
.mark__stop--to { stop-color: var(--mark-to, var(--color-cyan-400)); }

/* Longitud de cada cuarto de arco (pi/2 * r), redondeada al alza. */
.mark__arc--1 { --arc-length: 23; --arc-index: 0; }
.mark__arc--2 { --arc-length: 39; --arc-index: 1; }
.mark__arc--3 { --arc-length: 54; --arc-index: 2; }

.mark--animated .mark__arc {
  stroke-dasharray: var(--arc-length);
  stroke-dashoffset: var(--arc-length);
  animation:
    mark-draw 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards,
    /* El latido arranca cuando ya está dibujado y se propaga hacia fuera. */
    mark-emit 3200ms ease-in-out infinite;
  animation-delay:
    calc(160ms + var(--arc-index) * 140ms),
    calc(1100ms + var(--arc-index) * 180ms);
}

.mark--animated .mark__dot {
  transform-box: fill-box;
  transform-origin: center;
  animation: mark-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

@keyframes mark-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes mark-emit {
  0%, 55%, 100% { opacity: 1; }
  25% { opacity: 0.35; }
}

@keyframes mark-pop {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
