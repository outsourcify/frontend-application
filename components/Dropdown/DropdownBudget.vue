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
      placeholder="Select a month"
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
    label: '999 to 1250',
    value: '999-1250',
  },
  {
    label: '1250 to 1500',
    value: '1250-1500',
  },
  {
    label: '1500 to 2000',
    value: '1500-2000',
  },
  {
    label: '2000 to 2500',
    value: '2000-2500',
  },
  {
    label: '2500 to 3000',
    value: '2500-3000',
  },
  {
    label: '3000+',
    value: '3000+',
  },
]);
</script>
