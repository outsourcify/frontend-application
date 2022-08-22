<template>
  <div>
    <label
      :for="inputName"
      class="mb-2 ml-2 mt-4 block text-sm font-semibold uppercase text-gray-700"
    >
      {{ props.label }}{{ props.required ? '*' : '' }}
    </label>
    <PEditor
      :id="inputName"
      v-model.trim="value"
      class="p-inputtext-sm w-full"
      editorStyle="height: 120px"
      :class="{ 'p-invalid': invalid }"
      :autoResize="true"
    />
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
</script>
