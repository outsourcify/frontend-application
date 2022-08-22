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
      placeholder="Select Free Advice Tags"
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
import TagService from '~~/services/TagService';
import { Tag } from '~~/types/entity/tag';

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

const tagService = new TagService();
const {
  data: collection,
  pending: loading,
  error,
} = useLazyAsyncData(
  'tags.multi_select',
  () => tagService.collection({ pagination: false }),
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

const options = computed<Tag[]>(() => {
  if (!collection.value) {
    return [];
  }

  return _.map(collection.value['hydra:member'], (item: Tag) => {
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
