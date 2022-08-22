<template>
  <div class="relative">
    <!-- TABLE HEADER TOOLS -->
    <PSpeedDial
      v-if="headerTools"
      class="-top-3 -right-3 !z-10"
      direction="left"
      buttonClass="p-button-sm"
      :model="headerTools"
      :tooltipOptions="{ position: 'top' }"
      :disabled="props.loading"
    />

    <div class="card">
      <PDataTable
        :value="props.dataSource"
        :lazy="true"
        :paginator="true"
        :rows="10"
        :rowHover="true"
        v-model:filters="filters"
        :sortField="lazyParams.sortField"
        :sortOrder="lazyParams.sortOrder"
        dataKey="id"
        :totalRecords="props.totalRecords"
        :loading="props.loading"
        filterDisplay="row"
        responsiveLayout="scroll"
        v-model:selection="selectedItems"
        :selectAll="selectAll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        @page="onPage"
        @sort="onSort"
        @filter="onFilter"
        @select-all-change="onSelectAllChange"
        @row-select="onRowSelect"
        @row-unselect="onRowUnselect"
        @row-click="onRowClick"
      >
        <!-- SELECTION -->
        <PColumn :selectionMode="props.selectionMode" headerStyle="width: 3em">
        </PColumn>

        <!-- COLUMNS -->
        <template v-for="column in props.columns">
          <!-- TYPE TEXT -->
          <PColumn
            v-if="column.dataType === 'text'"
            :field="column.field"
            :header="column.header"
            :sortable="column.sortable"
            :showFilterMenu="false"
          >
            <template #body="{ data, field }">
              {{ get(data, field, '-') }}
            </template>

            <template
              v-if="column.filterable === true"
              #filter="{ filterModel, filterCallback }"
            >
              <PInputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter p-inputtext-sm"
                :placeholder="`Search by ${column.header.toLowerCase()}`"
                v-tooltip.bottom.focus="`Hit enter key to filter`"
              />
            </template>
          </PColumn>

          <!-- TYPE NUMERIC -->
          <PColumn
            v-else-if="column.dataType === 'numeric'"
            :field="column.field"
            :header="column.header"
            dataType="numeric"
            :sortable="column.sortable"
            :showFilterMenu="false"
          >
            <template #body="{ data, field }">
              {{ formatNumber(get(data, field, 0)) }}
            </template>
            <template
              v-if="column.filterable === true"
              #filter="{ filterModel, filterCallback }"
            >
              <PInputNumber
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-inputtext-sm"
                :placeholder="`Search by ${column.header.toLowerCase()}`"
                v-tooltip.bottom.focus="`Hit enter key to filter`"
              />
            </template>
          </PColumn>

          <!-- TYPE CURRENCY -->
          <PColumn
            v-else-if="column.dataType === 'currency'"
            :field="column.field"
            :header="column.header"
            dataType="numeric"
            :sortable="column.sortable"
            :showFilterMenu="false"
          >
            <template #body="{ data, field }">
              {{ formatCurrency(get(data, field, 0)) }}
            </template>
            <template
              v-if="column.filterable === true"
              #filter="{ filterModel, filterCallback }"
            >
              <PInputNumber
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-inputtext-sm"
                mode="currency"
                currency="USD"
                locale="en-US"
                :placeholder="`Search by ${column.header.toLowerCase()}`"
                v-tooltip.bottom.focus="`Hit enter key to filter`"
              />
            </template>
          </PColumn>

          <!-- TYPE DATE -->
          <PColumn
            v-else-if="column.dataType === 'date'"
            :field="column.field"
            :header="column.header"
            dataType="date"
            :sortable="column.sortable"
            :showFilterMenu="false"
          >
            <template #body="{ data, field }">
              <span v-if="get(data, field)">
                {{ formatDate(get(data, field)) }}
              </span>
              <span v-else> - </span>
            </template>
            <template
              v-if="column.filterable === true"
              #filter="{ filterModel, filterCallback }"
            >
              <PCalendar
                v-model="filterModel.value"
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
                class="p-inputtext-sm"
                :manualInput="false"
                @blur="filterCallback()"
              />
            </template>
          </PColumn>

          <!-- TYPE BOOLEAN -->
          <PColumn
            v-else-if="column.dataType === 'boolean'"
            :field="column.field"
            :header="column.header"
            dataType="boolean"
            bodyClass="text-center"
            :sortable="column.sortable"
            :showFilterMenu="false"
          >
            <template #body="{ data, field }">
              <i
                class="pi"
                :class="{
                  'pi-check-circle text-lime-700': get(data, field),
                  'pi-times-circle text-red-700': !get(data, field),
                }"
              ></i>
            </template>
            <template
              v-if="column.filterable === true"
              #filter="{ filterModel, filterCallback }"
            >
              <PTriStateCheckbox
                v-model="filterModel.value"
                @change="filterCallback()"
              />
            </template>
          </PColumn>

          <!-- TYPE IMAGE -->
          <PColumn
            v-else-if="column.dataType === 'image'"
            :field="column.field"
            :header="column.header"
            :sortable="column.sortable"
            :showFilterMenu="false"
          >
            <template #body="{ data, field }">
              <div
                class="relative aspect-4/3 w-20 overflow-hidden rounded-md shadow-lg"
              >
                <img
                  v-if="get(data, field)"
                  :src="get(data, field)"
                  alt="Image"
                  class="absolute h-full w-full object-cover"
                />
                <img
                  v-else
                  src="~~/assets/images/travel-3.jpg"
                  alt="Image"
                  class="absolute h-full w-full object-cover"
                />
              </div>
            </template>
          </PColumn>

          <!-- TYPE TAG -->
          <PColumn
            v-else-if="column.dataType === 'tag'"
            :field="column.field"
            :header="column.header"
          >
            <template #body="{ data, field }">
              <PChip
                v-if="get(data, field)"
                class="custom-chip whitespace-nowrap capitalize"
                :class="toParam(get(data, field, ''))"
              >
                {{ (get(data, field) || '').toLowerCase() }}
              </PChip>
              <span v-else> - </span>
            </template>
          </PColumn>

          <!-- TYPE RATING -->
          <PColumn
            v-else-if="column.dataType === 'rating'"
            :field="column.field"
            :header="column.header"
          >
            <template #body="{ data, field }">
              <PRating
                :modelValue="get(data, field, 0)"
                :readonly="true"
                :stars="5"
                :cancel="false"
              />
            </template>
          </PColumn>

          <!-- Add support for other types here -->
        </template>

        <template #empty>
          <p class="text-center text-sm text-gray-500">No records found.</p>
        </template>

        <!--
          OTHER SLOTS
          - in case if you want to bind specific things for PDataTable component
          - always leave this dynamic slot at last to override or receive all custom slot from parent
          - more info https://www.primefaces.org/primevue/datatable
        -->
        <template v-for="(index, name) in $slots" v-slot:[name]="slotProps">
          <slot :name="name" v-bind="slotProps"></slot>
        </template>
      </PDataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import type { TableColumn } from '~~/types/utils/datatable';
import _ from 'lodash';

const props = defineProps<{
  columns: TableColumn[];
  dataSource: object[];
  totalRecords?: number;
  filters?: object;
  headerTools?: object[];
  loading?: boolean;
  selectionMode?: 'single' | 'multiple';
}>();

const emit = defineEmits<{
  (event: 'change', params): void;
  (event: 'delete', id: number): void;
  (event: 'row-click', e: any): void;
}>();

// Lodash - Gets the value at path of object.
const get = _.get;

const preparePrimeVueTableFilters = () => {
  const filters = {};
  const matchModes = {
    text: FilterMatchMode.CONTAINS,
    numeric: FilterMatchMode.EQUALS,
    currency: FilterMatchMode.EQUALS,
    date: FilterMatchMode.DATE_IS,
    boolean: FilterMatchMode.EQUALS,

    // Add support for other types here
  };

  props.columns.forEach((column) => {
    if (column.filterable === true) {
      const value = _.get(props.filters, column.field, null);

      filters[column.field] = {
        value,
        matchMode: matchModes[column.dataType],
      };
    }
  });

  return filters;
};

const preparePrimeVueTableSort = () => {
  const sort: { sortField: string; sortOrder: number } = {
    sortField: null,
    sortOrder: null,
  };

  // TODO: get locale from current language
  const locale = 'en';

  for (const key in props.filters) {
    if (Object.prototype.hasOwnProperty.call(props.filters, key)) {
      const value = props.filters[key];
      const matched = key.match(/order\[(.*)\]/i);

      if (matched) {
        sort.sortField = (matched[1] || '').replace(
          'translations.',
          `translations.${locale}.`
        );
        sort.sortOrder = value === 'asc' ? 1 : -1;
        break;
      }
    }
  }

  return sort;
};

const filters = ref(preparePrimeVueTableFilters());

const lazyParams = reactive({
  ...preparePrimeVueTableSort(),
  filters: filters.value,
  page: 0,
});

const prepareApiPlatformFilters = () => {
  const { page, filters, sortField, sortOrder } = lazyParams;

  const searchParams = _.transform(filters, (result, value, key) => {
    const k = _.replace(key, /.(en|fr)./, '.');
    result[k] = value.value;
  });

  const orderKey = `order[${_.replace(sortField, /.(en|fr)./, '.')}]`;
  const orderValue =
    sortOrder === 1 ? 'asc' : sortOrder === -1 ? 'desc' : undefined;

  return _.omitBy(
    {
      ...searchParams,
      [orderKey]: orderValue,
      page: (page || 0) + 1,
    },
    _.isNil
  );
};

const onPage = ({ page }) => {
  lazyParams.page = page;
  emit('change', prepareApiPlatformFilters());
};

const onSort = ({ sortField, sortOrder }) => {
  lazyParams.sortField = sortField;
  lazyParams.sortOrder = sortOrder;
  emit('change', prepareApiPlatformFilters());
};

const onFilter = () => {
  lazyParams.filters = filters.value;
  emit('change', prepareApiPlatformFilters());
};

const selectedItems = ref();
const selectAll = ref(false);

const onSelectAllChange = (event) => {
  if (event.checked) {
    selectAll.value = true;
    selectedItems.value = props.dataSource || [];
  } else {
    selectAll.value = false;
    selectedItems.value = [];
  }
};

const onRowSelect = () => {
  selectAll.value = selectedItems.value.length === props.dataSource;
};

const onRowUnselect = () => {
  selectAll.value = false;
};

const onRowClick = ({ originalEvent, data, index }) => {
  emit('row-click', { originalEvent, data: _.cloneDeep(data), index });
};

const toParam = (str) => {
  return _.replace(str, / /g, '-').toLowerCase();
};

const formatDate = (d: Date) => {
  return d.toLocaleDateString();
};

const formatNumber = (n: number = 0) => {
  return n.toLocaleString();
};

const formatCurrency = (n: number = 0) => {
  return n.toLocaleString(null, {
    style: 'currency',
    currency: 'USD',
  });
};
</script>

<style lang="postcss" scoped>
.custom-chip {
  @apply text-gray-50;

  &.published,
  &.active,
  &.finished,
  &.enable,
  &.answered {
    @apply bg-green-500;
  }

  &.deposit-paid,
  &.fully-paid,
  &.created-customer-itinerary {
    @apply bg-blue-700;
  }

  &.draft,
  &.in-process,
  &.archived,
  &.prepare-journal {
    @apply bg-gray-600;
  }

  &.pending,
  &.waiting-balance,
  &.setup,
  &.to-answer {
    @apply bg-orange-500;
  }

  &.unpublished,
  &.not-active,
  &.cancelled,
  &.disable,
  &.incomplete {
    @apply bg-red-600;
  }

  &.hotel {
    @apply bg-stone-600;
  }
  &.hotel-resort {
    @apply bg-amber-500;
  }
  &.villa {
    @apply bg-lime-500;
  }
  &.guest-house {
    @apply bg-violet-700;
  }
  &.lodge {
    @apply bg-cyan-500;
  }
}
</style>
