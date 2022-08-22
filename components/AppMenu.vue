<template>
  <div
    id="app-menu"
    class="absolute left-0 top-0 z-20 h-screen w-full flex-shrink-0 shadow-sm md:w-auto lg:fixed"
    :class="{ 'show-app-menu': showAppMenu }"
  >
    <div class="flex">
      <!-- MENU ICON -->
      <div
        class="flex h-screen flex-shrink-0 select-none flex-col bg-black"
        style="width: 72px"
      >
        <div
          class="flex flex-shrink-0 items-center justify-center"
          style="height: 60px"
        >
          <AppLogo />
        </div>

        <div class="mt-3 overflow-y-auto">
          <ul class="m-0 list-none py-3 pl-2 pr-0">
            <li
              class="mb-2"
              v-for="menuItem in menuItems"
              :key="menuItem.key"
              v-tooltip="menuItem.title"
            >
              <NuxtLink
                v-ripple
                :to="menuItem.to"
                class="p-ripple relative flex cursor-pointer items-center justify-center overflow-hidden py-3 pl-0 pr-2 transition-colors hover:bg-indigo-50 hover:text-indigo-900"
                :class="{
                  'text-white': menuActive && menuActive.key !== menuItem.key,
                  'bg-white text-indigo-900':
                    menuActive && menuActive.key === menuItem.key,
                }"
                style="
                  border-top-left-radius: 30px;
                  border-bottom-left-radius: 30px;
                "
              >
                <i class="text-xl" :class="menuItem.icon"> </i>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="mt-auto">
          <!-- TODO: On click open profile dialog -->
          <a
            v-ripple
            v-tooltip="'Profile'"
            class="p-ripple relative m-3 flex cursor-pointer items-center justify-center overflow-hidden rounded p-2 transition-colors hover:bg-gray-600"
          >
            <PAvatar
              shape="circle"
              :label="profile ? profile.firstName.slice(0, 1) : ``"
            />
          </a>

          <hr class="border-top-1 mx-2 mb-3 border-gray-600" />

          <a
            v-ripple
            v-tooltip="'Sign out'"
            @click="onClickSignOut"
            class="p-ripple relative m-3 flex cursor-pointer items-center justify-center overflow-hidden rounded p-2 text-gray-100 transition-colors hover:bg-gray-600 hover:text-white"
          >
            <i class="pi pi-sign-out"> </i>
          </a>
        </div>
      </div>

      <!-- MENU PANEL -->
      <div
        class="flex-grow-1 flex h-screen flex-shrink-0 flex-col overflow-y-auto bg-white px-5 py-6 md:flex-grow-0"
        style="width: 228px"
      >
        <!-- CLOSE BUTTON - MOBILE -->
        <div class="flex justify-end lg:hidden">
          <PButton
            @click="showAppMenu = false"
            icon="pi pi-times"
            class="p-button-rounded p-button-text"
          />
        </div>

        <!-- PANEL -->
        <div class="flex-auto rounded">
          <div class="mb-5 flex items-center gap-2">
            <PAvatar
              image="https://media-cdn.tripadvisor.com/media/photo-l/17/42/7d/61/caption.jpg"
              class="flex-shrink-0"
            />
            <h2 class="text-base font-semibold text-amber-500 line-clamp-2">
              Test Agency
            </h2>
          </div>

          <PDivider />

          <div class="mb-5 px-3 text-2xl font-bold text-indigo-900">
            {{ menuActive.title }}
          </div>

          <ul class="m-0 list-none p-0">
            <li v-for="child in menuActive.children || []" :key="child.key">
              <NuxtLink
                v-ripple
                :to="child.to"
                class="p-ripple align-items-start mb-3 flex rounded-2xl p-3 hover:bg-indigo-50"
                :class="{
                  'bg-indigo-100':
                    childMenuActive && childMenuActive.key === child.key,
                }"
              >
                <i class="mr-3 mt-1" :class="child.icon"> </i>
                <div class="flex flex-col">
                  <span class="font-semibold">{{ child.title }}</span>
                  <p class="mt-1 mb-0 text-xs text-gray-500">
                    {{ child.caption }}
                  </p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const menu = useMenu();
const menuItems = reactive(menu);
const { $auth } = useNuxtApp();
const profile = ref($auth.profile);

const getRouteName = () => {
  const routeName = <string>(route.name || '');
  return routeName.replace(/___(en|th)/, '').replace(/-(create|id)/, '');
};

const menuActive = computed(() => {
  const routeName = getRouteName();
  const item = menuItems.find(({ relatedKeys, children }) => {
    const matchSelf = relatedKeys?.includes(routeName);
    const matchChild = children?.some((child) => {
      return child.relatedKeys?.includes(routeName);
    });
    return matchSelf || matchChild;
  });
  return item || menuItems[0];
});

const childMenuActive = computed(() => {
  const routeName = getRouteName();
  const children = menuActive.value?.children || [];
  const item = children.find(({ relatedKeys }) =>
    relatedKeys?.includes(routeName)
  );
  return item;
});

const onClickSignOut = () => {
  $auth.logout();
  return navigateTo('/login');
};

const showAppMenu = useState('showAppMenu');

watch(
  () => route.name,
  () => {
    showAppMenu.value = false;
  }
);
</script>

<style lang="postcss">
#app-menu {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.2s ease;

  &.show-app-menu {
    opacity: 1;
    transform: translateX(0);
  }

  @screen lg {
    opacity: 1;
    transition: 0s;
    transform: none;
  }
}
</style>
