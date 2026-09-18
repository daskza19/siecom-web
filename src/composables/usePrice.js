import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/** Formateo de precios según el idioma activo (coma o punto decimal). */
export function usePrice() {
  const { locale } = useI18n()

  const formatter = computed(
    () =>
      new Intl.NumberFormat(locale.value, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  )

  function formatPrice(value) {
    return formatter.value.format(value)
  }

  function applyDiscount(value, percent) {
    return value * (1 - percent / 100)
  }

  return { formatPrice, applyDiscount }
}
