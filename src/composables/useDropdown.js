import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Lógica compartida de desplegables: cierra al hacer clic fuera,
 * al pulsar Escape y devuelve el foco al disparador.
 */
export function useDropdown() {
  const isOpen = ref(false)
  const rootEl = ref(null)
  const triggerEl = ref(null)

  function open() {
    isOpen.value = true
  }

  function close({ restoreFocus = false } = {}) {
    if (!isOpen.value) return
    isOpen.value = false
    if (restoreFocus) triggerEl.value?.focus?.()
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  function onPointerDown(event) {
    if (!isOpen.value) return
    const root = rootEl.value?.$el ?? rootEl.value
    if (root && !root.contains(event.target)) close()
  }

  function onKeydown(event) {
    if (event.key === 'Escape') close({ restoreFocus: true })
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeydown)
  })

  return { isOpen, rootEl, triggerEl, open, close, toggle }
}
