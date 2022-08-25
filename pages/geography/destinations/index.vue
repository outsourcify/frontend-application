<template>
  <div>
    <PageHeader :breadcrumbs="breadcrumbs" title="Manage Destinations"> </PageHeader>

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
        Total {{ collection ? collection['hydra:totalItems'] : 0 }} Destinations
      </template>
    </DataTable>
    <Report/>

    <FormDialog
      header="Add Destination"
      v-model:visible="formVisible"
      :loading="formLoading"
      @hide="resetForm"
      @submit="submitForm(!v$.$invalid)"
      :withMap="true"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="google-map-container grid-cols-1 gap-2">
          <p class="subHead-map mb-4"><b>SEARCH A LOCATION ON THE MAP BY NAME</b></p>
          <div class="posRe mb-3">
            <PInputText
              class="posRe p-inputtext-sm w-full"
              :placeholder="'Enter a location'"
            />
            <i class="posAb pi pi-map"></i>
          </div>
          <img src="../../../assets/images/map.jpg" class="google-map" alt="google-map"/>
        </div>

        <div class="inputForm grid-cols-1 gap-2">
          <div class="imgMock-container d-flex justify-center align-items-center">
            <img src="../../../assets/images/imgMock.jpg" alt="" width="80"/>
            <input type="file" id="img" name="img" accept="image/*">
          </div>
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

            <DropdownRegion
              v-model="formState.country"
              name="region"
              label="Region"
              required
              :errors="v$.country.$errors"
            />
          </div>
        </div>

        
      </div>
    </FormDialog>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import DestinationsService from '~~/services/DestinationService';
import type { Breadcrumb } from '~~/types/utils/breadcrumb';
import type { TableColumn } from '~~/types/utils/datatable';
import { createDestination } from '~~/types/entity/destination';

const toast = useToast();
const breadcrumbs = reactive<Breadcrumb[]>([
  { label: 'Settings' },
  { label: 'Destinations' },
]);

const columns = reactive<TableColumn[]>([
  {
    field: 'flag',
    header: 'Flag',
    dataType: 'image',
    filterable: true,
    sortable: false,
  },
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
  {
    field: 'region.name',
    header: 'Region',
    dataType: 'text',
    filterable: true,
    sortable: true,
  },
  { field: '', header: '', dataType: 'delete', filterable: false },
]);
const filters = useState('destinations.filters', () => ({}));
const destinationService = new DestinationsService();

const formLoading = ref(false);
const formVisible = ref(false);
const formState = ref(createDestination());
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
} = useLazyAsyncData('destination', () => destinationService.collection(filters.value), {
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
    await destinationService[method](formState.value);
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
  formState.value = createDestination();
  v$.value.$reset();
};
</script>

<style scoped>
  .posRe{
    position: relative;
  }
  .posAb{
    position: absolute;
  }
  .posRe.p-inputtext{
    top: calc(50% - 19px);
  }
  .posAb.pi{
    right: 6px;
    top: calc(50% - 7px);
  }
  .google-map-container{
    height: 500px;
  }
  .google-map{
    height: 100%;
    object-fit: cover;
  }
  .subHead-map{
    font-size: .8em;
  }
  .imgMock-container{
    position: relative;
    height: 120px;
    width: 100%;
  }
  .imgMock-container img{
    position: relative;
    padding: 25px;
    border-radius: 10px;
    height: 100%;
    width: auto;
    box-shadow: 0 0 10px -5px rgba(0, 0, 0, .3);
  }
  .imgMock-container input{
    position: absolute;
    opacity: 0;
    width: 120px;
    height: 120px;
    cursor: pointer;
  }
  .d-flex{
    display: flex;
  }
  .justify-center{
    justify-content: center;
  }
  .align-items-center{
    align-items: center;
  }
</style>