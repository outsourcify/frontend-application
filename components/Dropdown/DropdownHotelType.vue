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
      placeholder="Select a Type"
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

const value = ref(props.modelValue);

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
    label: 'Hotel',
    value: 'hotel',
  },
  {
    label: 'Guest House',
    value: 'guest-house',
  },
  {
    label: 'Villa',
    value: 'villa',
  },
  {
    label: 'Lodge',
    value: 'lodge',
  },
  {
    label: 'Resort',
    value: 'resort',
  },
  {
    label: 'Home Stay',
    value: 'home-stay',
  },
  {
    label: 'Retreat',
    value: 'retreat',
  },
  {
    label: 'Hostel',
    value: 'hostel',
  },
]);
</script>
