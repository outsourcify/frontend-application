<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="flex h-full w-5/12 flex-col justify-between p-10">
      <nav>
        <AppLogo dark />
      </nav>

      <div class="prose mx-auto w-full">
        <h2 class="text-5xl">Multi-Agency DMC CRM</h2>

        <p>
          Our primary ambition is to provide you with a unique experience. Each
          of our trips is tailor-made. To do this, we always start by listening
          to you to understand your expectations and identify your desires
          fully.
        </p>
      </div>

      <div class="prose mx-auto">
        <img src="~/assets/images/travel-4.jpg" alt="Travel" />
      </div>
    </div>

    <div class="flex h-full w-7/12 flex-col justify-center bg-gray-50 p-10">
      <div class="flex h-full items-center">
        <div class="prose prose-sm mx-auto w-full">
          <h1 class="mb-10 text-4xl">Log-in</h1>

          <form @submit.prevent="submitForm(!v$.$invalid)" class="p-fluid">
            <div class="mb-8">
              <div class="p-float-label p-input-icon-right">
                <PInputText
                  id="email"
                  v-model="v$.email.$model"
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                  aria-describedby="email-error"
                  class="p-inputtext-sm"
                />
                <label
                  for="email"
                  :class="{ 'p-error': v$.email.$invalid && submitted }"
                >
                  Email*
                </label>
              </div>

              <span v-if="v$.email.$invalid && submitted">
                <span v-for="(error, index) of v$.email.$errors" :key="index">
                  <small class="p-error"> {{ error.$message }} </small>
                </span>
              </span>
            </div>

            <div class="mb-8">
              <div class="p-float-label">
                <PPassword
                  id="password"
                  v-model="v$.password.$model"
                  class="p-inputtext-sm"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                  toggleMask
                >
                  <template #header>
                    <h6 class="text-xs">Pick a password</h6>
                  </template>
                  <template #footer="sp">
                    {{ sp.level }}
                    <PDivider />
                    <p class="text-xs font-semibold">Suggestions</p>
                    <ul class="mt-2 list-inside list-disc text-xs">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </template>
                </PPassword>
                <label
                  for="password"
                  :class="{ 'p-error': v$.password.$invalid && submitted }"
                >
                  Password*
                </label>
              </div>
              <span v-if="v$.password.$invalid && submitted">
                <span
                  v-for="(error, index) of v$.password.$errors"
                  :key="index"
                >
                  <small class="p-error"> {{ error.$message }} </small>
                </span>
              </span>
            </div>

            <div class="mt-2 flex gap-8">
              <PButton
                type="submit"
                label="Login"
                :icon="loading ? `pi pi-spin pi-spinner` : `pi pi-sign-in`"
                :disabled="loading"
                class="p-button-sm max-w-[10rem]"
              />
              <PButton
                label="Forgot Password"
                class="p-button-sm p-button-link max-w-[10rem]"
              />
            </div>
          </form>
        </div>
      </div>

      <div class="prose prose-sm mx-auto w-full">
        <nav class="flex gap-8 text-xs">
          <NuxtLink :to="{ name: 'privacy-policy' }"> Privacy Policy </NuxtLink>
          <NuxtLink :to="{ name: 'terms-conditions' }">
            Terms & Conditions
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { Credential } from '~~/types/entity/auth';

definePageMeta({
  layout: 'blank',
  auth: false,
});

const formState = reactive<Credential>({
  email: '',
  password: '',
});

const rules = {
  email: { required, email },
  password: { required },
};

const submitted = ref(false);
const loading = ref(false);

const v$ = useVuelidate(rules, formState);
const toast = useToast();
const { $auth } = useNuxtApp();

// submit form login and redirect to dashboard
const submitForm = async (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  loading.value = true;

  try {
    await $auth.login(formState);
    return navigateTo('/');
  } catch (err) {
    const { code } = useCatchError(err);
    toast.add({
      severity: 'error',
      summary: code > 499 ? 'Oops!' : 'Invalid credentials.',
      detail:
        code > 499
          ? 'Something went wrong!'
          : 'Your email or password is incorrect.',
      life: 5000,
    });
  }

  loading.value = false;
};
</script>
