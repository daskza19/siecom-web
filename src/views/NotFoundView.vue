<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="view">
    <section class="section not-found">
      <div class="container container--narrow stack stack--lg">
        <p class="eyebrow">404</p>
        <h1>{{ $t('notFound.title') }}</h1>
        <p class="lead">{{ $t('notFound.subtitle') }}</p>
        <div>
          <BaseButton :to="{ name: 'home' }">{{ $t('notFound.cta') }}</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.not-found {
  display: grid;
  place-items: center;
  min-height: 60vh;
  text-align: center;
}

.not-found .stack { justify-items: center; }
</style>
