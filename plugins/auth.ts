import type { Credential, Profile } from '~~/types/entity/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const userToken = useCookie('auth.user_token', {
    maxAge: 7200,
    sameSite: 'lax',
  });

  const profile = ref<Profile>();
  const loggedIn = computed(() => !!userToken.value);

  const login = async (body: Credential) => {
    const { token }: { token: string } = await $fetch(
      `${config.public.apiBase}/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    );

    userToken.value = token;
  };

  const logout = async () => {
    userToken.value = null;
  };

  const getProfile = async () => {
    const result: Profile = await $fetch(
      `${config.public.apiBase}/api/profile`,
      {
        headers: {
          Authorization: `Bearer ${userToken.value}`,
        },
      }
    );

    profile.value = result;
  };

  watch(
    loggedIn,
    (value) => {
      if (value) {
        setTimeout(() => {
          getProfile();
        }, 0);
      }
    },
    { immediate: true }
  );

  addRouteMiddleware(
    'global-auth',
    (to) => {
      let routeName = <string>(to.name || '');
      routeName = routeName.replace(/___(en|th)/, '');

      // redirect to dashboard if already logged in
      if (routeName === 'login' && loggedIn.value === true) {
        return navigateTo('/');
      }

      // disable auth manually in page meta data
      if (to.meta.auth !== false) {
        // redirect to login if not logged in
        if (routeName !== 'login' && loggedIn.value === false) {
          return navigateTo('/login');
        }
      }
    },
    { global: true }
  );

  return {
    provide: {
      auth: {
        loggedIn,
        login,
        logout,
        profile,
      },
    },
  };
});
