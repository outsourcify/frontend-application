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
      :loading="loading"
      :filter="true"
      :showClear="!props.required"
      :virtualScrollerOptions="virtualScrollerOptions"
    >
    </PDropdown>
    <span v-for="(error, index) of props.errors" :key="index">
      <small class="p-error"> {{ error.$message }} </small>
    </span>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import TransfersTypeService from '~~/services/TransfersTypeService';
import { TransfersType } from '~~/types/entity/transfers-type';

const toast = useToast();

const props = defineProps<{
  modelValue?: object | string;
  name?: string;
  label?: string;
  required?: boolean;
  errors?: any[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: object | string): void;
}>();

const value = ref(
  _.isObject(props.modelValue) ? props.modelValue['@id'] : props.modelValue
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

const transfersTypeService = new TransfersTypeService();
const {
  data: collection,
  pending: loading,
  error,
} = useLazyAsyncData(
  'transfer-type.dropdown',
  () => transfersTypeService.collection({ pagination: false }),
  {
    pick: ['hydra:member', 'hydra:totalItems'],
  }
);

watch(error, (e) => {
  const { summary, detail, severity } = useCatchError(e);
  toast.add({
    summary,
    detail,
    severity,
    life: 5000,
  });
});

const options = computed<TransfersType[]>(() => {
  if (!collection.value) {
    return [];
  }

  return _.map(collection.value['hydra:member'], (item: TransfersType) => {
    return {
      label: `${item.name}`,
      value: item['@id'],
    };
  });
});

const virtualScrollerOptions = computed(() => {
  if (!collection.value) {
    return null;
  }

  if (collection.value['hydra:totalItems'] < 38) {
    return null;
  }

  return {
    itemSize: 38,
  };
});
</script>
