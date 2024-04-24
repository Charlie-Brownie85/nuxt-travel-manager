<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';

import { formatDate, formatCurrency } from '~/utils';

type ReadonlyHeaders = VDataTable['$props']['headers'];

export interface Props {
  headers: ReadonlyHeaders,
  items: Array<any>,
  loading: boolean,
  canEditItem?: boolean,
  canDeleteItem?: boolean,
}

const emit = defineEmits(['editItem', 'deleteItem']);

const props = withDefaults(defineProps<Props>(), {
  canEditItem: true,
  canDeleteItem: true,
});

const selectedItem = ref<any>(null);
const showDeleteModal = ref(false);

function editItem(item: any) {
  emit('editItem', item);
}

function deleteItem() {
  emit('deleteItem', selectedItem.value);
  showDeleteModal.value = false;
}

function openDeleteModal(item: any) {
  selectedItem.value = item;
  showDeleteModal.value = true;
}
</script>

<template>
    <v-data-table
    :headers="props.headers"
    :items="props.items"
    :loading="props.loading"
  >
    <template #item.name="{ item }">
      <span class="font-bold text-base">{{ item.name }}</span> 
    </template>
    <template #item.travelName="{ item }">
      <span class="font-bold text-base">{{ item.travelName }}</span> 
    </template>
    <template #item.payment="{ item }">
      <span class="text-base italic">{{ item.payment }}</span> 
    </template>
    <template #item.notes="{ item }">
      <span class="text-base italic">{{ item?.notes }}</span> 
    </template>
    <template #item.customerInfo="{ item }">
      <div class="flex flex-col py-2">
        <span class="text-base">
          {{ `${item.customerInfo.firstName} ${item.customerInfo.lastName}` }}
        </span>
        <span class="text-sm italic">
          {{ item.customerInfo.email }}
        </span>
        <span class="text-sm italic">
          {{ item.customerInfo.phone }}
        </span>
      </div>
    </template>
    <template #item.image="{ item }">
      <div class="py-2">
        <img
          :src="item.image"
          alt="Travel image"
          class="w-16 h-14 object-cover rounded-lg"
        >
      </div>
    </template>
    <template #item.startDate="{ item }">
      <span class="text-sm">{{ formatDate(item.startDate) }}</span> 
    </template>
    <template #item.endDate="{ item }">
      <span class="text-sm">{{ formatDate(item.endDate) }}</span> 
    </template>
    <template #item.price="{ item }">
      <span class="font-bold text-sm">{{ item.price }}{{ formatCurrency(item.currency) }}</span> 
    </template>
    <template #item.rating="{ item }">
      <v-rating
        v-model="item.rating"
        color="warning"
        half-increments
        length="5"
        readonly
        size="20"
      />  
    </template>
    <template #item.actions="{ item }">
      <div class="flex gap-2">
        <button
          v-if="props.canEditItem"
          class="btn btn--secondary--outline"
          type="button"
          @click="editItem(item)"
        >
        <v-icon
          size="small"
        >
          mdi-pencil
        </v-icon>
        <span>
          Edit
        </span>
        </button>
        <button
          v-if="props.canDeleteItem"
          class="btn btn--primary"
          type="button"
          @click="openDeleteModal(item)"
        >
        <v-icon
          size="small"
        >
          mdi-delete
        </v-icon>
        <span>
          Delete
        </span>
        </button>
      </div>
    </template>
  </v-data-table>
  <WeModal v-model="showDeleteModal">
    <template #content>
      <p class="text-base font-bold">Are you sure you want to delete this item?</p>
    </template>
    <template #actions="{ close }">
      <div class="flex gap-2">
        <button
          class="btn btn--secondary--outline"
          type="button"
          @click="close()"
        >
          <span>Cancel</span>
        </button>
        <button
          class="btn btn--primary"
          type="button"
          @click="deleteItem"
        >
          <span>Delete</span>
        </button>
      </div>
    </template>
  </WeModal>
</template>

<style lang="postcss" scoped>
@import url('~/assets/css/buttons.css');
</style>