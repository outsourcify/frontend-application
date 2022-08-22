<template>
  <div>
    <label
      :for="inputName"
      class="mb-2 block text-sm font-semibold uppercase text-gray-700"
    >
      {{ props.label }}{{ props.required ? '*' : '' }}
    </label>
    <PMultiSelect
      v-model="value"
      :options="options"
      optionLabel="label"
      optionValue="value"
      placeholder="Select Hotel Categories"
      class="p-inputtext-sm w-full"
      :class="{ 'p-invalid': invalid }"
      :loading="loading"
      :filter="true"
      :showClear="!props.required"
      :virtualScrollerOptions="virtualScrollerOptions"
    >
    </PMultiSelect>
    <span v-for="(error, index) of props.errors" :key="index">
      <small class="p-error"> {{ error.$message }} </small>
    </span>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import HotelCategoryService from '~~/services/HotelCategoryService';
import { HotelCategory } from '~~/types/entity/hotel-category';

const toast = useToast();

const props = defineProps<{
  modelValue?: object[] | string[];
  name?: string;
  label?: string;
  required?: boolean;
  errors?: any[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: object[] | string[]): void;
}>();

const value = ref(
  _.map(props.modelValue, (item) => {
    return _.isObject(item) ? item['@id'] : item;
  })
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

const hotelCategoryService = new HotelCategoryService();
const {
  data: collection,
  pending: loading,
  error,
} = useLazyAsyncData(
  'hotel_categories.multi_select',
  () => hotelCategoryService.collection({ pagination: false }),
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

const options = computed<HotelCategory[]>(() => {
  if (!collection.value) {
    return [];
  }

  return _.map(collection.value['hydra:member'], (item: HotelCategory) => {
    return {
      label: item.translations?.en?.name,
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
