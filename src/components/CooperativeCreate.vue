<template>
    <VDialog max-width="500">
        <template #activator="{ props: activatorProps }">
            <VFab
                v-bind="activatorProps"
                icon="mdi-plus"
                location="bottom right"
                size="x-large"
                color="teal"
                app
            />
        </template>
        <template #default>
            <VCard title="Adicionar nova cooperativa">
                <VForm>
                    <VTextField
                        label="CNPJ"
                        v-maska="'##.###.###/####-##'"
                        variant="outlined"
                        density="comfortable"
                    />
                    <VTextField
                        label="Nome fantasia"
                        variant="outlined"
                        density="comfortable"
                    />
                    <VTextField
                        label="Razão social"
                        variant="outlined"
                        density="comfortable"
                    />
                    <VTextField
                        label="E-mail"
                        variant="outlined"
                        density="comfortable"
                    />
                    <VTextField
                        label="Telefone"
                        v-maska="{
                            mask: ['(##) ####-####', '(##) #####-####'],
                        }"
                        variant="outlined"
                        density="comfortable"
                    />
                    <VTextField
                        label="CEP"
                        v-maska="'#####-###'"
                        variant="outlined"
                        density="comfortable"
                    />
                </VForm>
                <VCardActions>
                    <VBtn text="Fechar" variant="flat" color="error" />
                    <VBtn text="Adicionar" variant="flat" color="teal" />
                </VCardActions>
            </VCard>
        </template>
    </VDialog>
</template>

<script setup lang="ts">
    import { vMaska } from 'maska/vue';
</script>
