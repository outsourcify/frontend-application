<template>
  <NuxtLink
    :to="{ name: 'index' }"
    class="font-mono text-3xl font-black transition-colors hover:text-indigo-900"
    :class="{
      'text-white': !props.dark,
      'text-black': props.dark,
    }"
  >
    AG
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  dark?: boolean;
}>();
const visible = ref(false);
</script>
