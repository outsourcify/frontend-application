<template>
  <form @submit.prevent="submit" class="p-fluid">
    <!-- SLOT  -->
    <slot></slot>

    <!-- BUTTONS -->
    <div class="fixed right-8 top-8 z-10 flex h-10 justify-end gap-4">
      <PButton
        type="submit"
        label="Create"
        :disabled="props.loading"
        :icon="props.loading ? `pi pi-spin pi-spinner` : `pi pi-check`"
        class="p-button-sm p-button-info !w-auto shadow-lg"
      />

      <PButton
        label="Back"
        icon="pi pi-angle-left"
        class="p-button-sm p-button-secondary !w-auto"
        :disabled="props.loading"
        @click="$router.go(-1)"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: 'back'): void;
  (event: 'submit'): void;
}>();

const submit = () => {
  emit('submit');
};
</script>
