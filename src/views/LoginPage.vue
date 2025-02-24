<template>
    <VContainer class="d-flex align-center justify-center" height="100vh">
        <VCard
            width="100%"
            max-width="25rem"
            subtitle="Painel Administrativo"
            title="Login"
            :loading="loading"
        >
            <VForm class="px-4 pb-4" @submit.prevent="onSubmit">
                <VTextField
                    v-model="email.value.value"
                    label="E-mail"
                    variant="outlined"
                    class="mb-3"
                    :error-messages="email.errorMessage.value"
                    :disabled="loading"
                />
                <VTextField
                    v-model="password.value.value"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    class="mb-3"
                    :error-messages="password.errorMessage.value"
                    :disabled="loading"
                />
                <VBtn
                    block
                    size="large"
                    color="teal"
                    type="submit"
                    :loading="loading"
                    >Entrar</VBtn
                >
            </VForm>
        </VCard>
    </VContainer>
</template>

<script setup lang="ts">
    import { useField, useForm } from 'vee-validate';
    import { ref } from 'vue';
    import * as yup from 'yup';

    export type LoginData = {
        email: string;
        password: string;
    };

    const REQUIRED_FIELD = 'Campo obrigatório';

    const loading = ref(false);

    const { handleSubmit } = useForm<LoginData>({
        validationSchema: yup.object({
            email: yup
                .string()
                .email('E-mail inválido')
                .required(REQUIRED_FIELD),
            password: yup.string().required(REQUIRED_FIELD),
        }),
    });

    const email = useField('email');
    const password = useField('password');

    const onSubmit = handleSubmit((values) => {
        loading.value = true;
    });
</script>

<style scoped></style>
