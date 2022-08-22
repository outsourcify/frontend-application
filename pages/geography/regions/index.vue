<template>
  <div>
    <PageHeader :breadcrumbs="breadcrumbs" title="Manage Regions"> </PageHeader>

    <DataTable
      :columns="columns"
      :dataSource="collection ? collection['hydra:member'] : []"
      :totalRecords="collection ? collection['hydra:totalItems'] : 0"
      :filters="filters"
      :loading="loading"
      :selectionMode="null"
      :headerTools="tableHeaderTools"
      @change="onChange"
      @row-click="onRowClick"
    >
      <template #header>
        Total {{ collection ? collection['hydra:totalItems'] : 0 }} Regions
      </template>
    </DataTable>

    <FormDialog
      header="Add Region"
      v-model:visible="formVisible"
      :loading="formLoading"
      @hide="resetForm"
      @submit="submitForm(!v$.$invalid)"
    >
      <div class="grid grid-cols-1 gap-6">
        <InputText
          v-model="formState.code"
          name="code"
          label="Code"
          required
          autofocus
          :errors="v$.code.$errors"
        />

        <InputSwitch v-model="formState.active" name="active" label="Active" />

        <template v-for="locale in ['en', 'fr']">
          <InputText
            v-if="v$.translations && v$.translations[locale]"
            v-model="formState.translations[locale].name"
            name="name"
            :label="`Name (${locale})`"
            required
            :errors="v$.translations[locale]['name']['$errors']"
          />
        </template>

        <DropdownCountry
          v-model="formState.country"
          name="country"
          label="Country"
          required
          :errors="v$.country.$errors"
        />
      </div>
    </FormDialog>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import RegionService from '~~/services/RegionService';
import type { Breadcrumb } from '~~/types/utils/breadcrumb';
import type { TableColumn } from '~~/types/utils/datatable';
import { createRegion } from '~~/types/entity/region';

const toast = useToast();
const breadcrumbs = reactive<Breadcrumb[]>([
  { label: 'Settings' },
  { label: 'Regions' },
]);

const columns = reactive<TableColumn[]>([
  {
    field: 'code',
    header: 'Code',
    dataType: 'text',
    filterable: true,
    sortable: true,
  },
  {
    field: 'translations.en.name',
    header: 'Name',
    dataType: 'text',
    filterable: true,
    sortable: true,
  },
  { field: 'active', header: 'Active', dataType: 'boolean', filterable: true },
]);
const filters = useState('regions.filters', () => ({}));
const regionService = new RegionService();

const formLoading = ref(false);
const formVisible = ref(false);
const formState = ref(createRegion());
const rules = {
  code: { required },
  translations: {
    en: {
      name: { required },
    },
    fr: {
      name: { required },
    },
  },
  country: { required },
};
const v$ = useVuelidate(rules, formState);

const {
  data: collection,
  pending: loading,
  error,
  refresh,
} = useLazyAsyncData('regions', () => regionService.collection(filters.value), {
  watch: [filters],
  pick: ['hydra:member', 'hydra:totalItems'],
});

watch(error, (e) => {
  const { summary, detail, severity } = useCatchError(e);
  toast.add({
    summary,
    detail,
    severity,
    life: 5000,
  });
});

const onChange = (value) => {
  // will trigger watch when filters change
  filters.value = value;
};

const onRowClick = ({ data }) => {
  formState.value = data;
  formState.value.country = data.country ? data.country['@id'] : undefined;
  formVisible.value = true;
};

const tableHeaderTools = ref([
  {
    label: 'Add',
    icon: 'pi pi-pencil',
    command: () => {
      formVisible.value = true;
    },
  },
]);

const submitForm = async (isFormValid) => {
  if (!isFormValid) {
    v$.value.$touch();
    return;
  }
  formLoading.value = true;

  const method = !!formState.value.id ? 'put' : 'post';

  try {
    await regionService[method](formState.value);
    formVisible.value = false;
    resetForm();
    refresh();
  } catch (e) {
    const { summary, detail, severity } = useCatchError(e);
    toast.add({
      summary,
      detail,
      severity,
      life: 5000,
    });
  }
  formLoading.value = false;
};

const resetForm = () => {
  formVisible.value = false;
  formLoading.value = false;
  formState.value = createRegion();
  v$.value.$reset();
};
</script>
