<template>
    <VDialog max-width="542" @after-leave="handleReset">
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
        <template #default="{ isActive }">
            <VCard>
                <VCardTitle class="d-flex justify-space-between align-center">
                    <div class="text-h5 text-medium-emphasis ps-2">
                        Adicionar cooperativa
                    </div>
                    <VBtn
                        icon="mdi-close"
                        variant="text"
                        @click="isActive.value = false"
                    />
                </VCardTitle>
                <VDivider />
                <VCardText>
                    <form ref="form" class="pt-4" @submit.prevent="onSubmit">
                        <VRow class="form-row">
                            <VCol cols="12">
                                <VTextField
                                    v-model="name.value.value"
                                    :error-messages="name.errorMessage.value"
                                    label="Nome fantasia"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12">
                                <VTextField
                                    v-model="companyName.value.value"
                                    :error-messages="
                                        companyName.errorMessage.value
                                    "
                                    label="Razão social"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12" md="6">
                                <VTextField
                                    label="CNPJ"
                                    v-model="document.value.value"
                                    v-maska="'##.###.###/####-##'"
                                    :error-messages="
                                        document.errorMessage.value
                                    "
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12" md="6">
                                <VTextField
                                    label="Telefone"
                                    v-model="phone.value.value"
                                    v-maska="{
                                        mask: [
                                            '(##) ####-####',
                                            '(##) #####-####',
                                        ],
                                    }"
                                    :error-messages="phone.errorMessage.value"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12">
                                <VTextField
                                    v-model="email.value.value"
                                    :error-messages="email.errorMessage.value"
                                    label="E-mail"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12" sm="6" md="4">
                                <VTextField
                                    label="CEP"
                                    v-model="zipcode.value.value"
                                    v-maska="'#####-###'"
                                    :error-messages="zipcode.errorMessage.value"
                                    :loading="loading"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12" sm="6" md="8">
                                <VTextField
                                    v-model="street.value.value"
                                    :error-messages="street.errorMessage.value"
                                    label="Logradouro"
                                    variant="outlined"
                                    density="comfortable"
                                    disabled
                                />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VTextField
                                    v-model="number.value.value"
                                    :error-messages="number.errorMessage.value"
                                    label="Número"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                            <VCol cols="12" md="8">
                                <VTextField
                                    v-model="neighborhood.value.value"
                                    :error-messages="
                                        neighborhood.errorMessage.value
                                    "
                                    label="Bairro"
                                    variant="outlined"
                                    density="comfortable"
                                    disabled
                                />
                            </VCol>
                            <VCol cols="12" sm="6" md="8">
                                <VTextField
                                    v-model="city.value.value"
                                    :error-messages="city.errorMessage.value"
                                    label="Cidade"
                                    variant="outlined"
                                    density="comfortable"
                                    disabled
                                />
                            </VCol>
                            <VCol cols="12" sm="6" md="4">
                                <VTextField
                                    v-model="state.value.value"
                                    :error-messages="state.errorMessage.value"
                                    label="Estado"
                                    variant="outlined"
                                    density="comfortable"
                                    disabled
                                />
                            </VCol>
                            <VCol cols="12">
                                <VTextField
                                    v-model="complement.value.value"
                                    :error-messages="
                                        complement.errorMessage.value
                                    "
                                    label="Complemento (opcional)"
                                    variant="outlined"
                                    density="comfortable"
                                />
                            </VCol>
                        </VRow>
                    </form>
                </VCardText>
                <VDivider />
                <VCardActions class="my-2 d-flex justify-end">
                    <VBtn color="error" @click="isActive.value = false"
                        >Cancelar</VBtn
                    >
                    <VBtn color="teal" @click="requestSubmit">Adicionar</VBtn>
                </VCardActions>
            </VCard>
        </template>
    </VDialog>
</template>

<script setup lang="ts">
    import { ref, watchEffect } from 'vue';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup';
    import axios from 'axios';
    import { vMaska } from 'maska/vue';
    import { zipcodeMask } from '@/utils/mask';
    import type { Cooperative } from '@/types';

    export type LocationResponse = {
        cep: string;
        logradouro: string;
        complemento: string;
        unidade: string;
        bairro: string;
        localidade: string;
        uf: string;
        estado: string;
        regiao: string;
        ibge: string;
        gia: string;
        ddd: string;
        siafi: string;
    };

    const REQUIRED_FIELD = 'Campo obrigatório';

    const loading = ref(false);
    const form = ref<HTMLFormElement>();

    const { handleSubmit, handleReset } = useForm<Cooperative>({
        validateOnMount: false,
        validationSchema: yup.object({
            name: yup.string().required(REQUIRED_FIELD),
            companyName: yup.string().required(REQUIRED_FIELD),
            document: yup.string().required(REQUIRED_FIELD),
            zipcode: yup.string().required(REQUIRED_FIELD),
            street: yup.string().required(REQUIRED_FIELD),
            number: yup.string().required(REQUIRED_FIELD),
            neighborhood: yup.string().required(REQUIRED_FIELD),
            city: yup.string().required(REQUIRED_FIELD),
            state: yup.string().required(REQUIRED_FIELD),
            email: yup
                .string()
                .email('E-mail inválido')
                .required(REQUIRED_FIELD),
            phone: yup.string().required(REQUIRED_FIELD),
            complement: yup.string().optional(),
        }),
    });

    const zipcode = useField<string>('zipcode');
    const name = useField<string>('name');
    const companyName = useField<string>('companyName');
    const document = useField<string>('document');
    const street = useField<string>('street');
    const number = useField<string>('number');
    const neighborhood = useField<string>('neighborhood');
    const city = useField<string>('city');
    const state = useField<string>('state');
    const email = useField<string>('email');
    const phone = useField<string>('phone');
    const complement = useField<string>('complement');

    const onSubmit = handleSubmit((values: Cooperative) => {
        console.log(values);
    });

    const requestSubmit = () => form.value?.requestSubmit();

    function fillAddress(address: LocationResponse) {
        street.handleChange(address.logradouro);
        neighborhood.handleChange(address.bairro);
        city.handleChange(address.localidade);
        state.handleChange(address.uf);
    }

    function resetAddress() {
        street.handleReset();
        neighborhood.handleReset();
        city.handleReset();
        state.handleReset();
    }

    async function getFullAddress(zc: string) {
        loading.value = true;

        try {
            const url = `https://viacep.com.br/ws/${zc}/json`;
            const response = await axios.get<LocationResponse>(url);

            fillAddress(response.data);
        } catch (error) {
            console.error(error);
            resetAddress();
        }

        loading.value = false;
    }

    watchEffect(() => {
        if (zipcodeMask.completed(zipcode.value.value)) {
            getFullAddress(zipcodeMask.unmasked(zipcode.value.value));
        }
    });
</script>

<style>
    .form-row > .v-col-12 {
        padding-top: 0;
        padding-bottom: 0.75rem;
    }
</style>
