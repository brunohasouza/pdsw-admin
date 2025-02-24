<template>
    <VContainer>
        <VCard title="Cooperativas" class="pb-3" flat>
            <template #text>
                <VTextField
                    v-model="search"
                    label="Pesquisar"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    single-line
                />
            </template>
            <VDataTable
                :headers="headers"
                :items="items"
                :search="search"
                hide-default-footer
            >
                <template #item.document="{ item }">{{
                    documentMask.masked(item.document)
                }}</template>
                <template #item.actions="{ item }">
                    <CooperativeDetails v-bind="item" />
                </template>
            </VDataTable>
        </VCard>
    </VContainer>
    <CooperativeCreate />
</template>

<script setup lang="ts">
    import { faker } from '@faker-js/faker';
    import { ref } from 'vue';
    import type { Cooperative } from '@/types';
    import CooperativeDetails from '@/components/CooperativeDetails.vue';
    import { documentMask } from '@/utils/mask';
    import CooperativeCreate from '@/components/CooperativeCreate.vue';

    const search = ref('');

    const headers = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Nome fantasia' },
        { key: 'document', title: 'CNPJ' },
        { key: 'actions', title: 'Ações', sortable: false },
    ];

    const createCooperative = (): Cooperative => ({
        id: faker.string.numeric(4),
        document: faker.string.numeric(14),
        name: faker.company.name(),
        companyName: faker.company.name(),
        zipcode: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        neighborhood: faker.location.city(),
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        email: faker.internet.email(),
        phone: faker.string.numeric(11),
    });

    const items = faker.helpers.uniqueArray(
        createCooperative,
        faker.number.int({ min: 10, max: 20 }),
    );
</script>
