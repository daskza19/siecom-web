<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">{{ $t('common.skipToContent') }}</a>
  <AppHeader />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<style scoped>
.page-enter-active,
.page-leave-active { transition: opacity var(--transition-base); }
.page-enter-from,
.page-leave-to { opacity: 0; }
</style>
