import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.directive('ripple', Ripple);
  nuxtApp.vueApp.directive('tooltip', Tooltip);
});
