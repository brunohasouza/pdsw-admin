<template>
    <VDialog max-width="500">
        <template #activator="{ props: activatorProps }">
            <VBtn
                v-bind="activatorProps"
                size="small"
                variant="tonal"
                color="primary"
                class="text-none"
                text="Detalhes"
            />
        </template>
        <template #default="{ isActive }">
            <VCard title="Detalhes da cooperativa">
                <VList>
                    <VListItem lines="two">
                        <VListItemSubtitle>Nome fantasia</VListItemSubtitle>
                        <VListItemTitle>{{ name }}</VListItemTitle>
                    </VListItem>
                    <VListItem lines="two">
                        <VListItemSubtitle>Razão Social</VListItemSubtitle>
                        <VListItemTitle>{{ companyName }}</VListItemTitle>
                    </VListItem>
                    <VListItem lines="two">
                        <VListItemSubtitle>CNPJ</VListItemSubtitle>
                        <VListItemTitle>{{
                            documentMask.masked(document)
                        }}</VListItemTitle>
                    </VListItem>
                    <VListItem lines="two">
                        <VListItemSubtitle>Endereço</VListItemSubtitle>
                        <VListItemTitle>{{ address }}</VListItemTitle>
                        <VListItemTitle>{{ location }}</VListItemTitle>
                    </VListItem>
                    <VListItem lines="two">
                        <VListItemSubtitle>E-mail</VListItemSubtitle>
                        <VListItemTitle>{{ email }}</VListItemTitle>
                    </VListItem>
                    <VListItem lines="two">
                        <VListItemSubtitle>Telefone</VListItemSubtitle>
                        <VListItemTitle>{{
                            phoneMask.masked(phone)
                        }}</VListItemTitle>
                    </VListItem>
                </VList>
                <VCardActions>
                    <VBtn
                        text="Fechar"
                        variant="tonal"
                        color="error"
                        @click="isActive.value = false"
                    />
                </VCardActions>
            </VCard>
        </template>
    </VDialog>
</template>

<script setup lang="ts">
    import type { Cooperative } from '@/types';
    import { documentMask, phoneMask } from '@/utils/mask';
    import { computed } from 'vue';

    const props = defineProps<Cooperative>();

    const address = computed(
        () =>
            `${props.street}, ${props.number}${props.complement ? `, ${props.complement}` : ''}`,
    );

    const location = computed(
        () =>
            `${props.neighborhood} - ${props.city}/${props.state} - ${props.zipcode}`,
    );
</script>
