<script setup>
/**
 * Grafo animado del hero.
 *
 * No es una nube de partículas genérica: reproduce la topología real de la red.
 *   - Unos pocos *nodos emisores* (torres / puntos de presencia), grandes.
 *   - Cada abonado cuelga de su emisor más cercano, como un acceso radio o fibra.
 *   - Los emisores se encadenan entre sí formando la troncal.
 *   - Cada cierto tiempo un emisor lanza una onda; al alcanzar a un abonado,
 *     este se ilumina y devuelve un pulso por su enlace. La animación es
 *     causal: primero la onda, después la respuesta.
 *
 * Todo va deliberadamente lento: es un fondo, no una demo.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasEl = ref(null)

let ctx = null
let frame = 0
let resizeObserver = null
let intersectionObserver = null

let width = 0
let height = 0
let builtWidth = 0
let builtHeight = 0

let hubs = []
let leaves = []
let links = []
let pulses = []
let waves = []

let time = 0
let lastStamp = 0
let waveTimer = 2
let pulseTimer = 1.5

let isOnScreen = true
let isPageVisible = true
let reducedMotion = false

/* Paralaje del puntero: desplaza el campo entero unos pocos píxeles. */
const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false }

const PARALLAX = 26

/* Radios base en píxeles CSS, pensados para el ancho de referencia (1280). */
const HUB_RADIUS = 80
const LEAF_RADIUS = 40
const PULSE_RADIUS = 8

/* En una pantalla estrecha estos radios taparían media página. */
let scale = 1

const random = (min, max) => min + Math.random() * (max - min)
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const distance = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by)

let colors = { node: '52, 94, 232', hub: '6, 169, 216', link: '90, 131, 250' }

/** Los colores del grafo salen de los tokens: una terna "r, g, b" por rol. */
function readColors(el) {
  const styles = getComputedStyle(el)
  const get = (name, fallback) => styles.getPropertyValue(name).trim() || fallback
  return {
    node: get('--hero-graph-node', colors.node),
    hub: get('--hero-graph-hub', colors.hub),
    link: get('--hero-graph-link', colors.link),
  }
}

function makeNode(x, y, isHub) {
  return {
    x,
    y,
    anchorX: x,
    anchorY: y,
    isHub,
    energy: 0,
    // Periodos de 20 a 60 segundos: la deriva se intuye, no se sigue.
    drift: random(0.02, 0.05),
    phase: random(0, Math.PI * 2),
    amplitude: (isHub ? random(10, 18) : random(18, 34)) * scale,
  }
}

/** El centro queda despejado: ahí va el logotipo. */
function isInClearZone(x, y) {
  const rx = Math.min(width * 0.32, 400)
  const ry = Math.min(height * 0.36, 250)
  const dx = (x - width / 2) / rx
  const dy = (y - height / 2) / ry
  return dx * dx + dy * dy < 1
}

function buildGraph() {
  hubs = []
  leaves = []
  links = []
  pulses = []
  waves = []

  scale = clamp(width / 1280, 0.42, 1)
  const hubCount = width < 720 ? 2 : 3

  for (let i = 0; i < hubCount; i += 1) {
    // Columnas con desvío: reparte los emisores sin que se note la retícula.
    const column = (i + 0.5) / hubCount
    let x = 0
    let y = 0
    let guard = 0
    // La columna central caería sobre el logotipo: se reintenta hasta salir de ahí.
    do {
      x = clamp(width * (column + random(-0.06, 0.06)), 70, width - 70)
      y = clamp(height * random(0.14, 0.86), 70, height - 70)
      guard += 1
    } while (isInClearZone(x, y) && guard < 40)
    hubs.push(makeNode(x, y, true))
  }

  // Troncal: encadena los emisores de izquierda a derecha.
  const backbone = [...hubs].sort((a, b) => a.anchorX - b.anchorX)
  for (let i = 1; i < backbone.length; i += 1) {
    links.push({ from: backbone[i - 1], to: backbone[i], trunk: true })
  }

  /*
   * Muy pocos abonados y repartidos en anillo alrededor de su emisor: con
   * nodos tan grandes, un muestreo aleatorio sobre todo el lienzo los amontona
   * en un lado y deja el otro vacío.
   */
  const perHub = clamp(Math.round((width * height) / 260000 / hubCount), 2, 3)
  const minReach = (HUB_RADIUS + LEAF_RADIUS + 140) * scale
  const maxReach = Math.max(width, height) * 0.4
  const margin = 110 * scale
  const minGap = (LEAF_RADIUS * 2 + 160) * scale

  for (const hub of hubs) {
    let placed = 0
    let attempts = 0

    while (placed < perHub && attempts < 80) {
      attempts += 1
      const angle = random(0, Math.PI * 2)
      const reach = random(minReach, maxReach)
      const x = hub.anchorX + Math.cos(angle) * reach
      const y = hub.anchorY + Math.sin(angle) * reach

      // Fuera del lienzo se vería medio nodo cortado contra el borde.
      if (x < margin || x > width - margin || y < margin || y > height - margin) continue
      if (isInClearZone(x, y)) continue

      const crowded = [...hubs, ...leaves].some(
        (node) => distance(x, y, node.anchorX, node.anchorY) < minGap,
      )
      if (crowded) continue

      const leaf = makeNode(x, y, false)
      leaf.hub = hub
      leaf.reach = reach
      const link = { from: leaf, to: hub, trunk: false }
      leaf.link = link
      leaves.push(leaf)
      links.push(link)
      placed += 1
    }
  }

  builtWidth = width
  builtHeight = height
}

function spawnPulse(link, toHub) {
  if (pulses.length > 12) return
  pulses.push({
    link,
    progress: 0,
    toHub,
    // Entre 8 y 14 segundos de recorrido: el pulso se pasea, no corre.
    speed: random(0.07, 0.12),
  })
}

function emitWave() {
  const hub = hubs[Math.floor(Math.random() * hubs.length)]
  if (!hub) return
  waves.push({ hub, radius: 0, previous: 0, max: Math.max(width, height) * 0.5 })
  hub.energy = 1
}

function update(dt) {
  time += dt

  for (const node of [...hubs, ...leaves]) {
    node.x = node.anchorX + Math.cos(time * node.drift * 6 + node.phase) * node.amplitude
    node.y = node.anchorY + Math.sin(time * node.drift * 5 + node.phase) * node.amplitude * 0.7
    // Encendido largo: el nodo tarda varios segundos en volver a apagarse.
    node.energy *= Math.pow(0.45, dt)
  }

  waveTimer -= dt
  if (waveTimer <= 0) {
    emitWave()
    waveTimer = random(4.5, 8)
  }

  pulseTimer -= dt
  if (pulseTimer <= 0 && links.length) {
    const link = links[Math.floor(Math.random() * links.length)]
    spawnPulse(link, Math.random() > 0.45)
    pulseTimer = random(1.8, 3.6)
  }

  for (let i = waves.length - 1; i >= 0; i -= 1) {
    const wave = waves[i]
    wave.previous = wave.radius
    wave.radius += 80 * dt
    if (wave.radius > wave.max) {
      waves.splice(i, 1)
      continue
    }
    // La onda "alcanza" a los abonados de ese emisor: se encienden y contestan.
    for (const leaf of leaves) {
      if (leaf.hub !== wave.hub) continue
      if (leaf.reach > wave.previous && leaf.reach <= wave.radius) {
        leaf.energy = 1
        spawnPulse(leaf.link, true)
      }
    }
  }

  for (let i = pulses.length - 1; i >= 0; i -= 1) {
    const pulse = pulses[i]
    pulse.progress += pulse.speed * dt
    if (pulse.progress >= 1) {
      const arrival = pulse.toHub ? pulse.link.to : pulse.link.from
      arrival.energy = Math.min(1, arrival.energy + 0.8)
      pulses.splice(i, 1)
    }
  }

  const ease = Math.min(1, dt * 1.4)
  if (pointer.active) {
    pointer.x += (pointer.tx - pointer.x) * ease
    pointer.y += (pointer.ty - pointer.y) * ease
  } else {
    pointer.x *= Math.pow(0.5, dt)
    pointer.y *= Math.pow(0.5, dt)
  }
}

/** Disco con caída suave: da volumen al nodo sin recortes duros. */
function glow(x, y, radius, rgb, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
  gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`)
  gradient.addColorStop(0.5, `rgba(${rgb}, ${alpha * 0.3})`)
  gradient.addColorStop(1, `rgba(${rgb}, 0)`)
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function disc(x, y, radius, rgb, alpha) {
  ctx.fillStyle = `rgba(${rgb}, ${alpha})`
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.translate(pointer.x * PARALLAX, pointer.y * PARALLAX)
  ctx.lineCap = 'round'

  for (const link of links) {
    const energy = Math.max(link.from.energy, link.to.energy)
    ctx.strokeStyle = `rgba(${link.trunk ? colors.hub : colors.link}, ${
      (link.trunk ? 0.3 : 0.18) + energy * 0.35
    })`
    ctx.lineWidth = (link.trunk ? 7 : 4.5) * scale
    ctx.beginPath()
    ctx.moveTo(link.from.x, link.from.y)
    ctx.lineTo(link.to.x, link.to.y)
    ctx.stroke()
  }

  for (const wave of waves) {
    const fade = 1 - wave.radius / wave.max
    ctx.strokeStyle = `rgba(${colors.hub}, ${0.34 * fade * fade})`
    ctx.lineWidth = 4 * scale
    ctx.beginPath()
    ctx.arc(wave.hub.x, wave.hub.y, wave.radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  for (const pulse of pulses) {
    const { from, to } = pulse.link
    const t = pulse.toHub ? pulse.progress : 1 - pulse.progress
    const x = from.x + (to.x - from.x) * t
    const y = from.y + (to.y - from.y) * t
    const radius = PULSE_RADIUS * scale
    glow(x, y, radius * 2.6, colors.hub, 0.26)
    disc(x, y, radius, colors.node, 0.55)
  }

  for (const leaf of leaves) {
    // Alfas bajas: a este tamaño un disco opaco sería una mancha.
    const radius = (LEAF_RADIUS + leaf.energy * 14) * scale
    glow(leaf.x, leaf.y, radius * 2.2, colors.node, 0.12 + leaf.energy * 0.14)
    disc(leaf.x, leaf.y, radius, colors.node, 0.16 + leaf.energy * 0.22)
  }

  for (const hub of hubs) {
    const radius = (HUB_RADIUS + hub.energy * 20) * scale
    glow(hub.x, hub.y, radius * 2.2, colors.hub, 0.14 + hub.energy * 0.16)
    disc(hub.x, hub.y, radius, colors.hub, 0.2 + hub.energy * 0.22)
  }

  ctx.restore()
}

function loop(stamp) {
  frame = requestAnimationFrame(loop)
  // Un salto largo (pestaña en segundo plano) dispararía toda la simulación.
  const dt = clamp((stamp - lastStamp) / 1000, 0, 0.05)
  lastStamp = stamp
  update(dt)
  draw()
}

function play() {
  if (reducedMotion || frame || !ctx) return
  if (!isOnScreen || !isPageVisible) return
  lastStamp = performance.now()
  frame = requestAnimationFrame(loop)
}

function pause() {
  cancelAnimationFrame(frame)
  frame = 0
}

function resize() {
  const el = canvasEl.value
  if (!el || !ctx) return
  const rect = el.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  width = rect.width
  height = rect.height
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(width * dpr)
  el.height = Math.round(height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // La barra del navegador móvil cambia la altura constantemente: rehacer el
  // grafo en cada píxel lo haría parpadear.
  const changed =
    Math.abs(width - builtWidth) > 80 || Math.abs(height - builtHeight) > 140 || !links.length
  if (changed) buildGraph()
  if (reducedMotion) {
    update(0)
    draw()
  }
}

function handlePointerMove(event) {
  pointer.active = true
  pointer.tx = (event.clientX / window.innerWidth) * 2 - 1
  pointer.ty = (event.clientY / window.innerHeight) * 2 - 1
}

function handlePointerLeave() {
  pointer.active = false
  pointer.tx = 0
  pointer.ty = 0
}

function handleVisibility() {
  isPageVisible = !document.hidden
  if (isPageVisible) play()
  else pause()
}

onMounted(() => {
  const el = canvasEl.value
  ctx = el.getContext('2d')
  colors = readColors(el)
  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  resize()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)

  intersectionObserver = new IntersectionObserver((entries) => {
    isOnScreen = entries[0]?.isIntersecting ?? true
    if (isOnScreen) play()
    else pause()
  })
  intersectionObserver.observe(el)

  document.addEventListener('visibilitychange', handleVisibility)

  if (!reducedMotion) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave)
    // Arranque escalonado: la red "despierta" mientras entra el logotipo.
    setTimeout(emitWave, 600)
    setTimeout(emitWave, 2200)
    play()
  } else {
    update(0)
    draw()
  }
})

onBeforeUnmount(() => {
  pause()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibility)
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerleave', handlePointerLeave)
})
</script>

<template>
  <canvas ref="canvasEl" class="field" aria-hidden="true" />
</template>

<style scoped>
.field {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
