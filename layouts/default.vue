<template>
  <div class="relative flex min-h-screen lg:static">
    <!-- MENUS -->
    <AppMenu />

    <div class="relative flex min-h-screen flex-auto flex-col lg:ml-[300px]">
      <!-- HEADER MOBILE -->
      <AppHeader />

      <!-- PAGE -->
      <div class="flex flex-auto flex-col bg-gray-100 p-5">
        <div class="flex-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
