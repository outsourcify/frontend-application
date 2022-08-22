<template>
  <div>
    <label
      :for="inputName"
      class="mb-2 block text-sm font-semibold uppercase text-gray-700"
    >
      {{ props.label }}{{ props.required ? '*' : '' }}
    </label>
    <PRating
      :id="inputName"
      :modelValue="value"
      :stars="props.stars"
      :cancel="false"
      :class="{ 'p-invalid': invalid }"
    />
    <span v-for="(error, index) of props.errors" :key="index">
      <small class="p-error"> {{ error.$message }} </small>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number;
  name?: string;
  label?: string;
  stars?: number;
  required?: boolean;
  errors?: any[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit('update:modelValue', v);
    console.log(v);
  },
});

const inputName = computed(() => {
  return props.name || props.label;
});

const invalid = computed(() => {
  return props.errors && props.errors.length > 0;
});
</script>
