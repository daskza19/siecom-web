/**
 * Catálogo de tarifas.
 * Aquí solo vive el DATO (precio, orden, destacado y parámetros de las features).
 * Los textos se resuelven con las claves i18n: plans.items.<id>.* y plans.features.<key>
 */

export const CATEGORIES = [
  { id: 'mobile', slug: 'mobil', icon: 'mobile' },
  { id: 'internet', slug: 'internet', icon: 'wifi' },
  { id: 'landline', slug: 'fix', icon: 'phone' },
]

export const ANNUAL_DISCOUNT = 15 // % de descuento al pagar anualmente

export const PLANS = [
  {
    id: 'mobileStart',
    category: 'mobile',
    price: 9.95,
    highlighted: false,
    features: [
      { key: 'data', params: { amount: '25 GB' } },
      { key: 'unlimitedCalls' },
      { key: 'roaming' },
      { key: 'esim' },
    ],
  },
  {
    id: 'mobileSmart',
    category: 'mobile',
    price: 14.95,
    highlighted: true,
    features: [
      { key: 'data', params: { amount: '80 GB' } },
      { key: 'unlimitedCalls' },
      { key: 'roaming' },
      { key: 'dataShared' },
      { key: 'esim' },
    ],
  },
  {
    id: 'mobileTotal',
    category: 'mobile',
    price: 22.95,
    highlighted: false,
    features: [
      { key: 'data', params: { amount: '∞' } },
      { key: 'unlimitedCalls' },
      { key: 'roaming' },
      { key: 'dataShared' },
      { key: 'support' },
    ],
  },
  {
    id: 'fiber300',
    category: 'internet',
    price: 24.9,
    highlighted: false,
    features: [
      { key: 'speed', params: { speed: '300 Mb' } },
      { key: 'router' },
      { key: 'install' },
      { key: 'landlineIncluded' },
    ],
  },
  {
    id: 'fiber600',
    category: 'internet',
    price: 29.9,
    highlighted: true,
    features: [
      { key: 'speed', params: { speed: '600 Mb' } },
      { key: 'router' },
      { key: 'install' },
      { key: 'tv' },
      { key: 'landlineIncluded' },
    ],
  },
  {
    id: 'fiber1000',
    category: 'internet',
    price: 36.9,
    highlighted: false,
    features: [
      { key: 'speed', params: { speed: '1 Gb' } },
      { key: 'router' },
      { key: 'ip' },
      { key: 'tv' },
      { key: 'support' },
    ],
  },
  {
    id: 'fixBasic',
    category: 'landline',
    price: 8.9,
    highlighted: false,
    features: [
      { key: 'minutes', params: { amount: '500' } },
      { key: 'landlineIncluded' },
      { key: 'install' },
    ],
  },
  {
    id: 'fixPro',
    category: 'landline',
    price: 17.9,
    highlighted: true,
    features: [
      { key: 'minutes', params: { amount: '1.500' } },
      { key: 'switchboard' },
      { key: 'numbers', params: { amount: '10' } },
      { key: 'install' },
    ],
  },
  {
    id: 'fixBusiness',
    category: 'landline',
    price: 29.9,
    highlighted: false,
    features: [
      { key: 'minutes', params: { amount: '∞' } },
      { key: 'switchboard' },
      { key: 'numbers', params: { amount: '50' } },
      { key: 'lines', params: { amount: '25' } },
      { key: 'support' },
    ],
  },
]

export function plansByCategory(categoryId) {
  return PLANS.filter((plan) => plan.category === categoryId)
}

export function categoryBySlug(slug) {
  return CATEGORIES.find((category) => category.slug === slug)
}
