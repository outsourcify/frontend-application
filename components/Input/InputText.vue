<template>
  <div>
    <label
      :for="inputName"
      class="my-2 block text-sm font-semibold uppercase text-gray-700"
    >
      {{ props.label }}{{ props.required ? '*' : '' }}
    </label>
    <PInputText
      :id="inputName"
      v-model.trim="value"
      :autofocus="props.autofocus"
      class="p-inputtext-sm w-full"
      :class="{ 'p-invalid': invalid }"
    />
    <span v-for="(error, index) of props.errors" :key="index">
      <small class="p-error"> {{ error.$message }} </small>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number;
  name?: string;
  label?: string;
  required?: boolean;
  autofocus?: boolean;
  errors?: any[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
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
</script>
