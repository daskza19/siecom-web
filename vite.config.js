import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** Acepta "siecom-web", "/siecom-web" o "/siecom-web/" y siempre devuelve "/siecom-web/". */
function normalizeBase(value) {
  const trimmed = (value || '').replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

export default defineConfig({
  // En GitHub Pages el sitio cuelga de /<repo>/, así que la CI pasa BASE_PATH.
  // En local y en cualquier hosting en la raíz del dominio se queda en "/".
  base: normalizeBase(process.env.BASE_PATH),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
