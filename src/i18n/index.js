import { createI18n } from 'vue-i18n'
import ca from '@/locales/ca.json'
import es from '@/locales/es.json'
import en from '@/locales/en.json'

export const DEFAULT_LOCALE = 'ca'
export const FALLBACK_LOCALE = 'ca'
export const STORAGE_KEY = 'siecom:locale'

const messages = { ca, es, en }

/** Idiomas disponibles: se derivan de los propios JSON (bloque `meta`). */
export const SUPPORTED_LOCALES = Object.entries(messages).map(([code, dict]) => ({
  code,
  name: dict.meta.name,
  shortName: dict.meta.shortName,
  htmlLang: dict.meta.htmlLang,
}))

function resolveInitialLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  // El idioma por defecto es SIEMPRE el catalán: solo lo sustituye
  // una elección previa y explícita del usuario.
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY)
    if (stored && stored in messages) return stored
  } catch {
    /* almacenamiento no disponible */
  }

  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: resolveInitialLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages,
})

export function setLocale(locale) {
  if (!(locale in messages)) return
  i18n.global.locale.value = locale
  try {
    window.localStorage?.setItem(STORAGE_KEY, locale)
  } catch {
    /* almacenamiento no disponible: seguimos igualmente */
  }
  document.documentElement.setAttribute('lang', messages[locale].meta.htmlLang)
}

// Sincroniza el atributo lang con el idioma inicial.
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', messages[i18n.global.locale.value].meta.htmlLang)
}

export default i18n
