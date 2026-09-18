# Siecom Web

Web estática de una operadora de telefonía móvil, fibra y fijo. Vue 3 + Vite, sin backend.

## Arranque

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run preview  # sirve dist/ en local
```

## Estructura

```
src/
├─ assets/styles/
│  ├─ tokens.css      ← variables globales: colores, paddings, radios, tipografía…
│  ├─ base.css        ← reset y estilos de elementos
│  ├─ utilities.css   ← clases reutilizables (.container, .section, .card, .grid…)
│  └─ main.css        ← importa las tres anteriores
├─ locales/           ← ca.json · es.json · en.json (TODOS los textos de la web)
├─ i18n/index.js      ← configuración de vue-i18n, idioma por defecto y persistencia
├─ data/plans.js      ← catálogo de tarifas (solo datos: precio, orden, destacado)
├─ composables/       ← useDropdown (desplegables), usePrice (formato de precios)
├─ components/
│  ├─ layout/         ← AppHeader (navbar + dropdown), AppFooter, BrandLogo
│  ├─ ui/             ← BaseButton, PriceCard, LanguageSwitcher, AppIcon
│  └─ sections/       ← Hero, Pricing, Features, Cta
├─ views/             ← Home, Plans, Company, About, ClientAccess, NotFound
└─ router/index.js
```

## Textos e idiomas

Ningún texto está escrito en los componentes: todos salen de `src/locales/*.json`
mediante claves (`$t('home.hero.title')`). Los tres ficheros tienen exactamente las
mismas claves.

- Idioma por defecto: **catalán**. Solo lo sustituye una elección previa del usuario,
  que se guarda en `localStorage` con la clave `siecom:locale`.
- Interpolación de valores: `"plans.features.data": "{amount} de dades a 5G"` →
  `$t('plans.features.data', { amount: '80 GB' })`.

Para añadir un idioma: crea `src/locales/<código>.json` copiando `ca.json`, tradúcelo
y añádelo al objeto `messages` de `src/i18n/index.js`. El selector de idioma se
construye solo a partir del bloque `meta` de cada JSON.

## Estilos

Todo lo genérico vive en `src/assets/styles/tokens.css`. Cambiar el color de marca,
el redondeo de las tarjetas o el aire entre secciones es tocar una variable:

```css
--color-primary: var(--color-brand-600);
--radius-lg: 18px;
--padding-section: var(--space-10) 0;
--padding-card: var(--space-6);
--container-max: 1200px;
```

Los componentes solo usan esas variables, nunca valores literales. Algunos tokens
(`--padding-section`, `--container-padding`, `--header-height`) ya cambian de valor a
partir de 768 px, así que el ajuste responsive del espaciado también es un único sitio.

## Tarifas

`src/data/plans.js` contiene el catálogo: id, categoría, precio, si es destacado y las
features con sus parámetros. Los nombres y descripciones se resuelven por convención
con las claves `plans.items.<id>.name` / `.tagline` y `plans.features.<key>`.
`ANNUAL_DISCOUNT` controla el descuento del pago anual.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Home (hero + cuotas + ventajas + CTA) |
| `/plans/:category?` | Tarifas (`mobil`, `internet`, `fix`, o todas) |
| `/empresa` | Siecom Empresa |
| `/sobre-nosaltres` | Sobre nosotros |
| `/acces-client` | Acceso cliente |

Al ser rutas con `history` API, el hosting debe redirigir cualquier ruta a
`index.html` (fallback SPA). En GitHub Pages eso se resuelve con el `404.html` que
genera el script `postbuild`.

## Deploy (GitHub Pages)

Cada push a `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que instala, construye y publica `dist/`. También se puede lanzar a mano desde la
pestaña **Actions** (`workflow_dispatch`).

**Requisito previo, una sola vez:** en *Settings → Pages*, poner **Source: GitHub Actions**.
Sin eso el workflow falla al desplegar.

Dos detalles de los que se encarga la configuración:

- **Subcarpeta.** El sitio se sirve en `https://daskza19.github.io/siecom-web/`, así que
  la build necesita ese prefijo. El workflow lo pasa en `BASE_PATH` a partir del propio
  repositorio (aguanta un rename) y `vite.config.js` lo normaliza. Sin `BASE_PATH`, la
  build local sigue apuntando a `/`.
- **Rutas profundas.** GitHub Pages no tiene fallback de servidor, de modo que
  `npm run build` copia `index.html` a `404.html`. Al entrar directo en
  `/siecom-web/plans/fix`, Pages sirve ese `404.html` y el router pinta la página
  correcta. La página se ve bien, aunque la respuesta lleva estado HTTP 404: es
  inherente a alojar una SPA con history API en Pages.
