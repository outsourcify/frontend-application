<template>
  <div class="mb-8">
    <ul
      class="align-items-center mb-4 flex list-none p-0 text-xs text-gray-500"
      v-if="props.breadcrumbs"
    >
      <li v-for="(item, index) in props.breadcrumbs">
        <a class="text-xs">
          {{ item.label }}
        </a>
        <span class="px-2" v-if="index < breadcrumbs.length - 1">
          <i class="pi pi-angle-right"></i>
        </span>
      </li>
    </ul>

    <h1 class="mb-2 text-3xl font-bold" v-if="title">
      {{ title }}
    </h1>

    <p class="text-gray-500" v-if="subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~~/types/utils/breadcrumb';

const props = defineProps<{
  title?: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}>();
</script>
