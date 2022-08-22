<template>
  <div
    class="relative flex items-center justify-between bg-gray-100 px-5 lg:hidden"
    style="height: 60px"
  >
    <!-- BAR  -->
    <div class="flex" @click="showAppMenu = !showAppMenu">
      <a
        class="text-grey-700 relative mr-3 mt-1 block cursor-pointer overflow-hidden"
      >
        <i class="pi pi-bars text-4xl"> </i>
      </a>
    </div>

    <!-- LOGO  -->
    <AppLogo dark />
  </div>
</template>

<script setup lang="ts">
const showAppMenu = useState('showAppMenu', () => false);
</script>
