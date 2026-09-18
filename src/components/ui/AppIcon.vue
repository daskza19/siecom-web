<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

/* Iconos de trazo 24x24 en un único sitio: evita dependencias externas. */
const PATHS = {
  mobile: ['M7 2.5h10a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V4A1.5 1.5 0 0 1 7 2.5Z', 'M10.5 18.5h3'],
  wifi: ['M2.5 9a15 15 0 0 1 19 0', 'M5.8 12.6a10 10 0 0 1 12.4 0', 'M9 16.1a5 5 0 0 1 6 0', 'M12 19.5h.01'],
  phone: ['M6.4 3.5h3l1.6 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2Z'],
  check: ['M4.5 12.5l5 5 10-11'],
  chevron: ['M6 9.5l6 6 6-6'],
  arrow: ['M4.5 12h15', 'M13.5 6l6 6-6 6'],
  globe: ['M12 2.6a9.4 9.4 0 1 0 0 18.8 9.4 9.4 0 0 0 0-18.8Z', 'M2.8 12h18.4', 'M12 2.6c2.4 2.6 3.6 5.8 3.6 9.4s-1.2 6.8-3.6 9.4c-2.4-2.6-3.6-5.8-3.6-9.4S9.6 5.2 12 2.6Z'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  shield: ['M12 2.8 4.5 6v6c0 4.6 3.1 7.9 7.5 9.2 4.4-1.3 7.5-4.6 7.5-9.2V6Z', 'M9 12l2.2 2.2L15.5 10'],
  clock: ['M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6Z', 'M12 7.5V12l3 1.8'],
  spark: ['M12 3l2.1 5.4L19.5 10l-5.4 1.6L12 17l-2.1-5.4L4.5 10l5.4-1.6Z', 'M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z'],
  sliders: ['M5 4.5v6', 'M5 14v5.5', 'M12 4.5v3', 'M12 11v8.5', 'M19 4.5v9', 'M19 17v2.5', 'M3 12h4', 'M10 9h4', 'M17 15h4'],
  building: ['M4.5 20.5V5.2a1.4 1.4 0 0 1 1-1.3l7-2a1.4 1.4 0 0 1 1.8 1.3v17.3', 'M14.3 9.5h3.8a1.4 1.4 0 0 1 1.4 1.4v9.6', 'M3 20.5h18', 'M8 8h2.5', 'M8 12h2.5', 'M8 16h2.5'],
  users: ['M15.5 20v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.2V20', 'M9.2 11.3a3.6 3.6 0 1 0 0-7.3 3.6 3.6 0 0 0 0 7.3Z', 'M21 20v-1.8a3.6 3.6 0 0 0-2.7-3.5', 'M15.3 4.2a3.6 3.6 0 0 1 0 7'],
  server: ['M4.5 4.5h15v5h-15z', 'M4.5 14.5h15v5h-15z', 'M8 7h.01', 'M8 17h.01'],
  lock: ['M6.5 10.5h11v9h-11z', 'M8.8 10.5V7.8a3.2 3.2 0 0 1 6.4 0v2.7'],
  file: ['M14 3.2H7.5A1.5 1.5 0 0 0 6 4.7v14.6a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7.4Z', 'M14 3.2v4.2h4', 'M9 13h6', 'M9 16.5h4'],
  chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M3 20h18'],
  heart: ['M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.8a4.1 4.1 0 0 1 7.5 2.8c0 5-7.5 9.4-7.5 9.4Z'],
  headset: ['M4.5 14v-2a7.5 7.5 0 0 1 15 0v2', 'M4.5 13.5h2v5h-2a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5Z', 'M17.5 13.5h2a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-2Z', 'M19.5 18.5v.5a2.5 2.5 0 0 1-2.5 2.5H13'],
}

const paths = computed(() => PATHS[props.name] ?? [])
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, index) in paths" :key="index" :d="d" />
  </svg>
</template>

<style scoped>
.icon {
  flex: none;
}
</style>
