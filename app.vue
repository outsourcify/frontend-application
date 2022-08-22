<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- TOAST -->
    <Toast position="bottom-right" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
</script>

<style>
html {
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
