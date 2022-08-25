<template>
  <PDialog
    :header="props.header"
    v-model:visible="containerVisible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="props.withMap ? 'width: 900px' : 'width: 450px'"
    :maximizable="props.maximizable"
    :modal="true"
  >

    <form @submit.prevent="submit" class="p-fluid">
      <!-- SLOT  -->
      <slot></slot>

      <!-- BUTTONS -->
      <div class="mt-8 flex justify-end gap-8">
        <PButton
          label="Cancel"
          icon="pi pi-times"
          class="p-button-sm p-button-text !w-auto"
          :disabled="props.loading"
          @click="containerVisible = false"
        />
        <PButton
          type="submit"
          label="Submit"
          :disabled="props.loading"
          :icon="props.loading ? `pi pi-spin pi-spinner` : `pi pi-check`"
          class="p-button-sm !w-auto"
        />
      </div>
    </form>
  </PDialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  header?: string;
  visible?: boolean;
  loading?: boolean;
  maximizable?: boolean;
  withMap?: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'hide'): void;
  (event: 'submit'): void;
}>();

const containerVisible = computed({
  get() {
    return props.visible;
  },
  set(v) {
    emit('update:visible', v);

    if (v === false) {
      emit('hide');
    }
  },
});

const submit = () => {
  emit('submit');
};
</script>
