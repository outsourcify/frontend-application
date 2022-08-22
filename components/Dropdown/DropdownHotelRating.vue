<template>
  <div>
    <label
      :for="inputName"
      class="mb-2 block text-sm font-semibold uppercase text-gray-700"
    >
      {{ props.label }}{{ props.required ? '*' : '' }}
    </label>
    <PDropdown
      v-model="value"
      :options="options"
      optionLabel="label"
      optionValue="value"
      placeholder="Select a Rating"
      class="p-inputtext-sm w-full"
      :class="{ 'p-invalid': invalid }"
      :filter="true"
      :showClear="!props.required"
    >
    </PDropdown>
    <span v-for="(error, index) of props.errors" :key="index">
      <small class="p-error"> {{ error.$message }} </small>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
  name?: string;
  label?: string;
  required?: boolean;
  errors?: any[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const value = ref();

watch(
  () => props.modelValue,
  (v) => {
    value.value = v;
  },
  {
    immediate: true,
  }
);

watch(value, (v) => {
  emit('update:modelValue', v);
});

const inputName = computed(() => {
  return props.name || props.label;
});

const invalid = computed(() => {
  return props.errors && props.errors.length > 0;
});

const options = ref([
  {
    label: '5 Stars',
    value: '5',
  },
  {
    label: '4.5 Stars',
    value: '4.5',
  },
  {
    label: '4 Stars',
    value: '4',
  },
  {
    label: '3.5 Stars',
    value: '3.5',
  },
  {
    label: '3 Stars',
    value: '3',
  },
  {
    label: '2.5 Stars',
    value: '2.5',
  },
  {
    label: '2 Stars',
    value: '2',
  },
  {
    label: '1.5 Stars',
    value: '1',
  },
]);
</script>
