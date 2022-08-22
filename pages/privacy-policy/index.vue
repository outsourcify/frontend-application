<template>
  <div class="container">
    <nav class="py-10">
      <AppLogo dark />
    </nav>

    <article class="prose mx-auto py-10 lg:prose-xl">
      <a
        href="#"
        class="mb-10 inline-block text-sm text-gray-500 no-underline"
        @click.prevent="$router.go(-1)"
      >
        <i class="pi pi-arrow-left"></i>
        Back
      </a>

      <h1>Privacy Policy</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, aut
        voluptatem! Magni expedita quam ipsa temporibus esse nulla culpa odio
        id, voluptate animi velit blanditiis, dolore quis minus, ad ut.
      </p>
    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
  auth: false,
});
</script>
